# 🔧 Vercel Auth Fix Guide

## ❌ Current Problem

Your Vercel deployment is still using the old environment variable value:
```
NEXT_PUBLIC_API_BASE = https://daynt-form-api.onrender.com/api
```

This causes the frontend to make **cross-origin requests** to Render, which triggers third-party cookie blocking in modern browsers, breaking authentication.

---

## ✅ The Solution

We've added a **rewrite rule** in `next.config.js` that proxies API requests through your Vercel domain:

```
Your Site (Vercel)              Your API (Render)
─────────────────              ──────────────────
/api/auth/login    ──────►    https://daynt-form-api.onrender.com/api/auth/login
```

This makes cookies **first-party** (same origin), which fixes the auth issue!

---

## 📋 Step-by-Step Fix

### Step 1: Update Vercel Environment Variable

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Click on your project: **`daynt-form-builder-web`** (or similar)
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Find the variable: **`NEXT_PUBLIC_API_BASE`**

6. **Edit it:**
   - Click the **⋯** (three dots) next to it
   - Click **Edit**
   - Change the value from:
     ```
     https://daynt-form-api.onrender.com/api
     ```
     To:
     ```
     /api
     ```
   - Make sure it's enabled for **Production**, **Preview**, and **Development**
   - Click **Save**

### Step 2: Redeploy Your App

**Option A: Trigger from Vercel Dashboard**
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **⋯** (three dots) in the top right
4. Click **Redeploy**
5. ⚠️ **IMPORTANT:** Uncheck **"Use existing Build Cache"**
6. Click **Redeploy**

**Option B: Push a new commit** (Vercel will auto-deploy)
```powershell
# Add a small change to trigger rebuild
git commit --allow-empty -m "trigger: redeploy with updated env"
git push origin main
```

### Step 3: Wait for Deployment

- Wait 2-3 minutes for the build to complete
- Watch the build logs in Vercel Dashboard

### Step 4: Verify the Fix

1. Visit your Vercel site: `https://daynt-form-builder-web.vercel.app`
2. Go to `/test-env` page to check the environment
3. You should now see:
   ```
   API_BASE from code: /api
   NEXT_PUBLIC_API_BASE from env: /api
   ✅ Environment Variable Correct!
   ```

4. **Test Login:**
   - Go to `/login`
   - Enter demo credentials:
     - Email: `demo@formapp.dev`
     - Password: `password123`
   - Click "Sign In"
   - You should be redirected to `/dashboard` ✅

---

## 🔍 How to Debug (If Still Not Working)

### Check Browser DevTools

1. Open your Vercel site
2. Press **F12** (or right-click → Inspect)
3. Go to **Network** tab
4. Try to login
5. Look for the `/api/auth/login` request:

**✅ Good Signs:**
- Request URL shows: `https://daynt-form-builder-web.vercel.app/api/auth/login`
- Response Headers include: `Set-Cookie: auth=...`
- Cookie has: `Secure; SameSite=None` or `SameSite=Lax`
- Status: 200 or 401 (not CORS error)

**❌ Bad Signs:**
- Request URL still shows: `https://daynt-form-api.onrender.com/...`
- Error: "CORS policy" or "Network Error"
- No `Set-Cookie` header in response
- Status: (failed) or ERR_FAILED

### Check Vercel Build Logs

1. Go to Vercel Dashboard → Deployments
2. Click on the latest deployment
3. Scroll to **Build Logs**
4. Look for:
   ```
   Creating an optimized production build...
   - Environments: .env
   ```
5. Verify the environment variable is picked up

### Still Failing?

If you see the full URL (`https://daynt-form-api.onrender.com/api`) in the test page:

**Reason:** The build is using cached environment variables.

**Solution:**
1. Delete the environment variable in Vercel
2. Re-add it with value `/api`
3. Redeploy **without cache** (uncheck "Use existing Build Cache")

---

## 🎯 Expected Final State

### Vercel Environment Variables:
```
NEXT_PUBLIC_API_BASE = /api
```

### Render Environment Variables:
```
FRONTEND_ORIGIN = https://daynt-form-builder-web.vercel.app
NODE_ENV = production
JWT_SECRET = <your-64-character-secret>
DATABASE_URL = <your-postgres-url>
```

### Test Results:
- ✅ `/test-env` shows API_BASE = `/api`
- ✅ Login works without errors
- ✅ Dashboard loads after login
- ✅ Forms CRUD operations work
- ✅ Cookies are set and sent properly

---

## 📞 Need Help?

### Common Issues

**Q: I updated the env var but it still shows the old value**
- A: Clear Vercel build cache and redeploy without cache

**Q: Login works but dashboard says "Not authenticated"**
- A: Check Render `FRONTEND_ORIGIN` matches your Vercel URL exactly (no trailing slash)

**Q: I get "Network Error" or "Failed to fetch"**
- A: Make sure Render API is up and running: https://daynt-form-api.onrender.com/api/docs
- If on free tier, wait 60 seconds for it to wake up

**Q: Cookies not being sent with requests**
- A: Verify the rewrite is working - check Network tab, requests should go to `/api/*` not `https://daynt-form-api.onrender.com/*`

### Files Changed

The recent changes to fix this issue:
- ✅ `apps/web/next.config.js` - Added rewrite rule
- ✅ `apps/web/app/test-env/page.tsx` - Updated to check for `/api`

### Commit Info
```
Commit: f43a145
Message: fix: Add API rewrite to Next.js config for same-origin cookie support
```

---

## ✨ Why This Fix Works

**Before (Broken):**
```
Browser → https://daynt-form-builder-web.vercel.app
          ↓
          Fetch https://daynt-form-api.onrender.com/api/auth/login
          ↓
          🔴 Cross-origin request
          🔴 Cookie blocked as third-party
          🔴 Auth fails
```

**After (Fixed):**
```
Browser → https://daynt-form-builder-web.vercel.app
          ↓
          Fetch /api/auth/login (same origin)
          ↓
          Vercel rewrite → https://daynt-form-api.onrender.com/api/auth/login
          ↓
          ✅ Same-origin request (from browser's perspective)
          ✅ Cookie set as first-party
          ✅ Auth works!
```

The rewrite happens **server-side** (in Vercel's edge network), so the browser never knows it's a cross-origin request. Cookies work perfectly! 🎉

---

**Last Updated:** October 18, 2025
