# 🚀 Quick Deploy Checklist

**Fastest way to get your app online in ~15 minutes**

---

## 📋 Pre-Deploy Checklist

- [ ] Code pushed to GitHub: `Lcore17/Daynt-Form-Builder`
- [ ] Railway account (or Render)
- [ ] Vercel account
- [ ] PostgreSQL ready (Railway provides this)

---

## 🔧 Step 1: Deploy Backend (5 mins)

### Railway (Recommended)

1. **Create Project**
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub → Select your repo

2. **Add Database**
   - New → Database → PostgreSQL
   - Copy `DATABASE_URL` (automatically linked)

3. **Configure API Service**
   - Click on your service → Settings
   
   **Root Directory:**
   ```
   apps/api
   ```
   
   **Build Command:**
   ```
   npm install --omit=dev && npm run prisma:deploy && npm run build
   ```
   
   **Start Command:**
   ```
   npm run start:prod
   ```

4. **Set Variables**
   - Go to Variables tab
   
   ```bash
   DATABASE_URL=<auto-filled-by-railway>
   JWT_SECRET=your-64-char-random-secret-string
   FRONTEND_ORIGIN=https://your-app.vercel.app
   NODE_ENV=production
   ```
   
   **Generate JWT_SECRET:**
   ```powershell
   [Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

5. **Deploy & Copy URL**
   - Wait for deployment
   - Copy your Railway URL: `https://xxxx.up.railway.app`
   - Test: Visit `https://xxxx.up.railway.app/api/docs`

---

## 🌐 Step 2: Deploy Frontend (5 mins)

### Vercel

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - New Project → Import `Lcore17/Daynt-Form-Builder`

2. **Configure**
   **Root Directory:**
   ```
   apps/web
   ```
   
   **Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
   ```
   (Use the Railway URL from Step 1)

3. **Deploy**
   - Click Deploy
   - Wait for build
   - Copy Vercel URL: `https://your-app.vercel.app`

---

## 🔄 Step 3: Connect Frontend & Backend (2 mins)

1. **Go back to Railway**
   - Update `FRONTEND_ORIGIN` variable:
   ```
   FRONTEND_ORIGIN=https://your-app.vercel.app
   ```
   (Use the Vercel URL from Step 2)

2. **Redeploy Backend**
   - Trigger redeploy in Railway
   - Wait ~1 minute

---

## ✅ Step 4: Test Everything (3 mins)

1. **Visit Frontend:** `https://your-app.vercel.app`
2. **Register an Account**
3. **Create a Form**
4. **Submit a Response**
5. **Check Dashboard**

---

## 🎉 Done!

Your app is now live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-app.up.railway.app`
- **API Docs:** `https://your-app.up.railway.app/api/docs`

---

## 🆘 Quick Fixes

**CORS Error?**
- Check `FRONTEND_ORIGIN` matches your Vercel URL exactly
- No trailing slash!

**API Not Responding?**
- Visit `/api/docs` to check if backend is up
- Check Railway logs for errors

**Build Failed?**
- Verify Root Directory: `apps/api` (backend) or `apps/web` (frontend)
- Check environment variables are set

**Database Error?**
- Verify `DATABASE_URL` is set
- Make sure PostgreSQL is running on Railway

---

## 📝 Environment Variables Summary

### Backend (Railway)
```bash
DATABASE_URL=<from-railway-postgres>
JWT_SECRET=<64-char-random-string>
FRONTEND_ORIGIN=https://your-app.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

---

## 📚 Need More Details?

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Alternative deployment options (Render)
- Troubleshooting guide
- Performance optimization
- Security checklist
- Scaling strategies

---

**Total Time: ~15 minutes** ⏱️
