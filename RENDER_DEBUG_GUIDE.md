# 🚨 Render API Debugging Guide

## Current Issue

Your Render API at `https://daynt-form-api.onrender.com` is returning **404 Not Found** for all endpoints, including:
- `/api/docs` (Swagger documentation)
- `/api/health` (Health check)

This means the API is either:
1. ❌ Not deployed at all
2. ❌ Failed to build/start
3. ❌ Crashed after starting
4. ❌ Using the wrong service URL

---

## 🔍 Step 1: Check Render Dashboard

### 1.1 Verify Service Status

1. Go to **https://render.com/dashboard**
2. Find your API service (should be named `daynt-form-api` or similar)
3. Check the status indicator:
   - 🟢 **Live** - Service is running (but still returning 404)
   - 🟡 **Building** - Currently deploying
   - 🔴 **Failed** - Build/deploy failed
   - ⚪ **Suspended** - Free tier spun down

### 1.2 Check the Service URL

1. In your Render service, look for the **URL** at the top
2. It should be something like:
   ```
   https://daynt-form-api.onrender.com
   ```
3. **Copy this exact URL** - make sure it matches what you're using

---

## 🔍 Step 2: Check Build & Deploy Logs

### 2.1 View Recent Logs

1. In Render Dashboard → Click your API service
2. Click **"Logs"** tab
3. Scroll to the most recent deployment
4. Look for errors or warnings

### 2.2 Common Issues in Logs

**✅ Success indicators:**
```
==> Build successful
==> Starting service with 'npm run start:prod'
Nest application successfully started
API listening on :10000 (CORS origin: ...)
Mapped {/api/health, GET}
Mapped {/api/auth/login, POST}
Mapped {/api/docs, GET}
```

**❌ Failure indicators:**
```
Error: Cannot find module '@prisma/client'
Error: DATABASE_URL environment variable not set
Error: Build failed
Cannot connect to database
Module not found
Syntax error
```

### 2.3 Check for Port Binding

Your `main.ts` should be using `process.env.PORT`:
```typescript
const port = Number(process.env.PORT) || 4000;
await app.listen(port);
```

Render automatically provides the `PORT` environment variable. **Do NOT** set a manual PORT in Render environment variables.

---

## 🔍 Step 3: Verify Environment Variables

Go to Render → Your Service → Environment → Check these are set:

### Required Variables:

```env
DATABASE_URL = postgresql://user:pass@host/db
NODE_ENV = production
JWT_SECRET = <64+ character random string>
FRONTEND_ORIGIN = https://daynt-form-builder-web.vercel.app
```

### Optional Variables:

```env
COOKIE_NAME = auth
```

### ❌ Variables to REMOVE:

```env
PORT = 4000  ❌ Delete this! Render sets it automatically
```

---

## 🔍 Step 4: Verify Build Configuration

In Render service settings, check:

### Build Settings:

| Setting | Expected Value |
|---------|---------------|
| **Root Directory** | `apps/api` |
| **Build Command** | `npm install && npx prisma generate && npx prisma migrate deploy && npm run build` |
| **Start Command** | `npm run start:prod` |
| **Runtime** | Node |
| **Node Version** | 18.x or 20.x (check your `.nvmrc` or default) |

---

## 🔧 Common Fixes

### Fix 1: Database Connection Failed

**Error in logs:**
```
Error: Can't reach database server
PrismaClientInitializationError
```

**Solution:**
1. Check `DATABASE_URL` is set correctly
2. Make sure PostgreSQL database is running (check Render dashboard)
3. Verify connection string format:
   ```
   postgresql://username:password@hostname:port/database
   ```
4. Use the **Internal Database URL** from Render PostgreSQL (not External)

### Fix 2: Prisma Client Not Generated

**Error in logs:**
```
Cannot find module '@prisma/client'
Error: @prisma/client did not initialize yet
```

**Solution:**
1. Update Build Command to include:
   ```bash
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```
2. Redeploy

### Fix 3: Build Failed - Missing Dependencies

**Error in logs:**
```
npm ERR! missing: @nestjs/core@^10.4.8
Module not found: @nestjs/platform-express
```

**Solution:**
1. Check `apps/api/package.json` has all dependencies listed
2. Try clearing cache: Render → Service → Settings → "Clear Build Cache"
3. Redeploy

### Fix 4: App Crashed After Starting

**Error in logs:**
```
Service exited with code 1
UnhandledPromiseRejectionWarning
```

**Solution:**
1. Check for uncaught errors in logs
2. Verify JWT_SECRET is set
3. Check FRONTEND_ORIGIN doesn't have trailing slash
4. Test database connection

### Fix 5: Free Tier Spin Down

If on Render Free tier:
- Service spins down after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- During wake-up, you'll get 404 or timeout

**Solution:**
- Wait 60 seconds and try again
- Or upgrade to Starter plan ($7/month) for always-on

---

## 🧪 Testing the API Directly

### Test 1: Health Check

```powershell
curl.exe https://daynt-form-api.onrender.com/api/health
```

**Expected:**
```json
{"status":"ok"}
```

### Test 2: Swagger Docs

Open in browser:
```
https://daynt-form-api.onrender.com/api/docs
```

**Expected:**
- Swagger UI page loads
- Shows all API endpoints

### Test 3: Auth Login (Should Fail with 401)

```powershell
curl.exe -X POST https://daynt-form-api.onrender.com/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@test.com\",\"password\":\"wrong\"}'
```

**Expected:**
```json
{"statusCode":401,"message":"Invalid credentials"}
```

---

## 🔄 Step 5: Redeploy from Scratch

If nothing works, try a fresh deployment:

### Option A: Manual Redeploy

1. Render Dashboard → Your Service
2. Click **"Manual Deploy"** → **"Clear build cache & deploy"**
3. Wait 3-5 minutes
4. Check logs for errors

### Option B: Trigger from Git

1. Make a small change to trigger rebuild:
   ```powershell
   cd apps/api
   echo "# Trigger rebuild" >> README.md
   git add README.md
   git commit -m "trigger: redeploy API"
   git push origin main
   ```
2. Render will auto-deploy
3. Watch the logs

---

## 📊 Checklist: Is Your API Working?

Run through this checklist:

- [ ] Render service shows 🟢 **Live** status
- [ ] Logs show "Nest application successfully started"
- [ ] Logs show "API listening on :XXXXX"
- [ ] Logs show route mappings (e.g., "Mapped {/api/health, GET}")
- [ ] DATABASE_URL is set correctly
- [ ] JWT_SECRET is set (64+ characters)
- [ ] FRONTEND_ORIGIN is set (no trailing slash)
- [ ] NO manual PORT variable is set
- [ ] Root Directory is `apps/api`
- [ ] Build command includes `prisma generate`
- [ ] Start command is `npm run start:prod`
- [ ] `https://your-api.onrender.com/api/health` returns `{"status":"ok"}`
- [ ] `https://your-api.onrender.com/api/docs` shows Swagger UI

---

## 🆘 Still Not Working?

### Get Detailed Logs

1. Render → Service → Logs
2. Copy the last 100 lines
3. Look for the first error message
4. Check what happened right before the error

### Common Root Causes:

1. **Database not running** - Check Render PostgreSQL service
2. **Wrong DATABASE_URL** - Must be Internal URL from Render
3. **Missing environment variables** - JWT_SECRET, NODE_ENV, etc.
4. **Prisma not generated** - Build command missing `npx prisma generate`
5. **Port not binding** - Manual PORT variable set (should be removed)
6. **Free tier sleeping** - Wait 60 seconds for wake-up

---

## 💡 Next Steps After API is Working

Once you see `{"status":"ok"}` at `/api/health`:

1. ✅ Test login via Vercel frontend
2. ✅ Check browser DevTools for cookie being set
3. ✅ Verify CORS headers allow your Vercel domain
4. ✅ Test form creation and submissions

---

## 🔗 Quick Links

- **Render Dashboard:** https://render.com/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your API (Expected):** https://daynt-form-api.onrender.com/api/docs
- **Your Frontend:** https://daynt-form-builder-web.vercel.app

---

**Last Updated:** October 18, 2025
