# 🚀 Deploy to Render + Vercel (Railway Alternative)

**Complete step-by-step guide to deploy your Daynt Form Builder publicly**

**Time Required:** 20-25 minutes  
**Cost:** FREE (with limitations) or ~$7/month for production

---

## 📋 What You'll Need

- ✅ Your GitHub repository: `Lcore17/Daynt-Form-Builder` (already done!)
- ✅ [Render account](https://render.com) (free - sign up with GitHub)
- ✅ [Vercel account](https://vercel.com) (free - sign up with GitHub)
- ✅ 20 minutes of your time

---

## 🎯 PART 1: Deploy Backend API to Render (12 minutes)

### Step 1: Sign Up for Render

1. Go to **https://render.com**
2. Click **"Get Started"**
3. Click **"Sign In with GitHub"**
4. Authorize Render to access your repositories

### Step 2: Create PostgreSQL Database (3 mins)

1. From Render Dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Fill in details:
   - **Name:** `daynt-form-db`
   - **Database:** `formbuilder` (or leave default)
   - **User:** `daynt_user` (or leave default)
   - **Region:** Choose closest to your users
   - **Plan:** **Free** (for testing) or **Starter** ($7/month for production)

4. Click **"Create Database"**
5. Wait 2-3 minutes for provisioning
6. **IMPORTANT:** Once created, go to database details:
   - Find **"Internal Database URL"**
   - Click **"Copy"** and save it somewhere (Notepad)
   - Example: `postgresql://daynt_user:password@dpg-xxxxx-a.oregon-postgres.render.com/formbuilder_xxxx`

### Step 3: Create Web Service for API (5 mins)

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect to GitHub"** (if not already)
3. Find and select: **`Lcore17/Daynt-Form-Builder`**
4. Click **"Connect"**

5. **Configure the service:**

   **Name:**
   ```
   daynt-form-api
   ```

   **Region:**
   ```
   Oregon (US West)
   ```
   Choose same region as your database!

   **Branch:**
   ```
   main
   ```

   **Root Directory:**
   ```
   apps/api
   ```
   ⚠️ This is critical! Your backend is in this subfolder.

   **Runtime:**
   ```
   Node
   ```

   **Build Command:**
   ```
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```

   **Start Command:**
   ```
   npm run start:prod
   ```

   **Plan:**
   ```
   Free
   ```
   (or Starter $7/month for production - no sleep)

### Step 4: Add Environment Variables (4 mins)

Scroll down to **"Environment Variables"** section:

Click **"Add Environment Variable"** for each of these:

#### 1. DATABASE_URL
**Key:**
```
DATABASE_URL
```
**Value:**
```
<paste-the-internal-database-url-you-copied-earlier>
```
Example: `postgresql://daynt_user:pass@dpg-xxxxx.render.com/formbuilder_xxxx`

#### 2. JWT_SECRET
**Key:**
```
JWT_SECRET
```
**Value:** Generate a secure 64-character random string:
```
your-super-secure-jwt-secret-at-least-64-characters-long-random-string-here-change-this
```

💡 **Generate a secure one:**
- Option 1: Use https://randomkeygen.com/ (CodeIgniter Encryption Keys)
- Option 2: Run in PowerShell:
  ```powershell
  -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
  ```

#### 3. FRONTEND_ORIGIN
**Key:**
```
FRONTEND_ORIGIN
```
**Value:** (We'll update this after deploying frontend)
```
https://your-app-name.vercel.app
```
For now, use a placeholder like: `https://daynt-forms.vercel.app`

#### 4. NODE_ENV
**Key:**
```
NODE_ENV
```
**Value:**
```
production
```
 
💡 Do NOT set a PORT value on Render. Render automatically provides a dynamic PORT via environment variable and your app already listens to it with `process.env.PORT`.

### Step 5: Deploy Backend

1. Click **"Create Web Service"** at the bottom
2. Render will start building your app
3. Watch the logs - this takes **3-5 minutes**
4. Look for: `✅ Build successful` and `✅ Deploy live`

5. **Copy Your API URL:**
   - At the top, you'll see something like: `https://daynt-form-api.onrender.com`
   - **Copy this URL** - you'll need it for frontend!

### Step 6: Test Your API

Visit your API URL + `/api/docs`:
```
https://daynt-form-api.onrender.com/api/docs
```

You should see the Swagger API documentation! 🎉

---

## 🌐 PART 2: Deploy Frontend to Vercel (8 minutes)

### Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### Step 2: Import Your Project (2 mins)

1. Click **"Add New..."** → **"Project"**
2. Find **`Lcore17/Daynt-Form-Builder`** in the list
3. Click **"Import"**

### Step 3: Configure Project Settings (3 mins)

Vercel will auto-detect Next.js, but you need to configure:

**Framework Preset:**
```
Next.js
```
(Should be auto-selected)

**Root Directory:**
Click **"Edit"** next to Root Directory:
```
apps/web
```
⚠️ Critical! Your frontend is in this subfolder.

**Build Command:**
```
npm run build
```
(Should be pre-filled)

**Output Directory:**
```
.next
```
(Should be pre-filled)

**Install Command:**
```
npm install
```
(Should be pre-filled)

### Step 4: Add Environment Variable (1 min)

Expand **"Environment Variables"** section:

**Key:**
```
NEXT_PUBLIC_API_BASE
```

**Value:** (Use your Render API URL from Part 1 + `/api`)
```
https://daynt-form-api.onrender.com/api
```
⚠️ Must include `/api` at the end, no trailing slash!

### Step 5: Deploy Frontend (2 mins)

1. Click **"Deploy"**
2. Vercel will build your app (takes 2-3 minutes)
3. Wait for: **"🎉 Congratulations! Your project has been deployed"**

4. **Copy Your Frontend URL:**
   ```
   https://daynt-form-builder.vercel.app
   ```
   (or similar - shown on success screen)

---

## 🔄 PART 3: Connect Frontend & Backend (3 minutes)

### Step 1: Update Backend CORS

1. Go back to **Render Dashboard**
2. Click on your **`daynt-form-api`** service
3. Go to **"Environment"** tab
4. Find **`FRONTEND_ORIGIN`** variable
5. Click **"Edit"**
6. Update to your actual Vercel URL:
   ```
   https://daynt-form-builder.vercel.app
   ```
   ⚠️ Use your exact URL - no trailing slash!

7. Click **"Save Changes"**
8. Render will automatically **redeploy** (takes 1-2 minutes)

---

## ✅ PART 4: Test Your Live Application (5 minutes)

### 1. Visit Your Frontend

Open your Vercel URL in a browser:
```
https://daynt-form-builder.vercel.app
```

### 2. Create an Account

1. Click **"Register"** or **"Get Started"**
2. Fill in:
   - Name: `Your Name`
   - Email: `your.email@example.com`
   - Password: `securepassword123`
3. Click **"Register"**

### 3. Test Form Creation

1. Click **"+ New Form"**
2. Select a template (e.g., "Customer Feedback")
3. Customize fields if desired
4. Click **"Save Form"**
5. Toggle **"Public"** switch
6. Click **"Copy Link"**

### 4. Test Public Form

1. Open the copied link in a **new incognito window**
2. Fill out the form
3. Submit it
4. Go back to your dashboard
5. Click **"Responses"** → You should see the submission! 🎉

---

## 🎉 SUCCESS! Your App is Now Live!

Your application is now publicly accessible at:

- **🌐 Frontend (Public URL):** `https://your-app.vercel.app`
- **🔧 Backend API:** `https://your-api.onrender.com`
- **📚 API Documentation:** `https://your-api.onrender.com/api/docs`

---

## 📝 Important Notes & Limitations

### Free Tier Limitations

**Render Free Tier:**
- ⏰ **Spins down after 15 minutes of inactivity**
- 🐌 **First request after sleep takes 30-60 seconds to wake up**
- 💾 **750 hours/month** (enough for demos/testing)
- 🔄 **Best for:** Portfolios, demos, testing

**Vercel Free Tier:**
- ✅ **Always on** - no spin down!
- 📊 **100GB bandwidth/month**
- 🚀 **Unlimited deployments**
- ⚡ **Perfect for** most use cases

### Upgrade to Paid (Recommended for Production)

**Render Starter ($7/month):**
- ✅ No spin down (always on)
- ✅ Faster builds
- ✅ More resources
- ✅ Great for production

**When to upgrade:**
- You have real users
- Forms need instant loading
- You can't wait 30-60 seconds for wake up

---

## 🔒 Security Checklist

Before sharing publicly:

- ✅ **JWT_SECRET** is strong and random (64+ characters)
- ✅ **FRONTEND_ORIGIN** matches your exact Vercel URL
- ✅ **DATABASE_URL** uses PostgreSQL (not SQLite)
- ✅ Test registration/login works
- ✅ Test form submission works
- ✅ Check Render logs for errors

---

## 🆘 Troubleshooting

### Problem: "API calls failing" or "Network Error"

**Solution:**
1. Check `NEXT_PUBLIC_API_BASE` in Vercel matches your Render URL exactly (with `/api`)
2. Visit `https://your-api.onrender.com/api/docs` - if it loads, API is working
3. Check Render logs for errors: Dashboard → Service → Logs
4. Wait 60 seconds if on free tier (wake from sleep)

### Problem: "Not Found" on `/api/health` or `/api/docs`

**Likely cause:** The service is not listening on the port Render assigned, often because a static PORT was set.

**Solution:**
1. Go to Render → Your Service → Environment → remove any `PORT` variable you added.
2. Save to trigger redeploy.
3. Ensure the app uses `process.env.PORT` (this project already does).
4. After deploy, check logs for route mappings like `Mapped {/api/health, GET}`.
5. Retry `https://<your-service>.onrender.com/api/health`.

### Problem: "CORS Error" in browser console

**Solution:**
1. Go to Render → Environment → `FRONTEND_ORIGIN`
2. Make sure it matches your Vercel URL exactly
3. **No trailing slash!** ❌ `https://app.vercel.app/` ✅ `https://app.vercel.app`
4. Redeploy after changing

### Problem: "Database connection error"

**Solution:**
1. Check `DATABASE_URL` is set in Render environment
2. Make sure PostgreSQL database is running (check Render dashboard)
3. Verify connection string format is correct

### Problem: "Build failed" on Render

**Solution:**
1. Verify **Root Directory** is set to `apps/api`
2. Check build command includes: `npm install && npx prisma generate`
3. Look at build logs for specific error message
4. Make sure all dependencies are in `apps/api/package.json`

### Problem: "Build failed" on Vercel

**Solution:**
1. Verify **Root Directory** is set to `apps/web`
2. Check that `NEXT_PUBLIC_API_BASE` is set
3. Look at deployment logs for specific errors
4. Try redeploying from Vercel dashboard

### Problem: Forms spin down/slow to load

**Solution:**
This is expected on Render free tier. Options:
1. **Upgrade to Render Starter** ($7/month) - no spin down
2. **Ping your API** every 10 minutes to keep it awake
3. **Accept the limitation** for demo purposes

---

## 📊 Monitoring Your App

### Check Render Logs
1. Go to Render Dashboard
2. Click your `daynt-form-api` service
3. Go to **"Logs"** tab
4. Monitor for errors or issues

### Check Vercel Deployments
1. Go to Vercel Dashboard
2. Click your project
3. Go to **"Deployments"** tab
4. Click on latest deployment → **"View Function Logs"**

---

## 🚀 Next Steps (Optional)

### 1. Add Custom Domain (Optional)

**For Frontend (Vercel):**
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. Vercel → Your Project → Settings → Domains
3. Add your domain (e.g., `daynt-forms.com`)
4. Follow DNS instructions
5. Update `FRONTEND_ORIGIN` in Render to new domain

**For Backend (Render):**
1. Render → Service → Settings → Custom Domain
2. Add subdomain (e.g., `api.daynt-forms.com`)
3. Follow DNS instructions
4. Update `NEXT_PUBLIC_API_BASE` in Vercel

### 2. Set Up Automatic Deployments

Already configured! 🎉
- Push to `main` branch → Render auto-deploys backend
- Push to `main` branch → Vercel auto-deploys frontend

### 3. Monitor Uptime

Free monitoring services:
- **UptimeRobot** (https://uptimerobot.com)
- **Pingdom** (https://www.pingdom.com)
- Set up alerts for downtime

### 4. Add Analytics

**Vercel Analytics:**
1. Vercel Dashboard → Your Project → Analytics
2. Enable for free

**Google Analytics:**
1. Get GA4 tracking ID
2. Add to `apps/web/.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Redeploy

---

## 💰 Cost Summary

### Free Tier (Perfect for demos/portfolios)
- **Render:** Free with 750 hours/month (spins down)
- **Vercel:** Free with 100GB bandwidth
- **PostgreSQL:** Free with limitations
- **Total:** $0/month

### Paid Tier (Recommended for production)
- **Render Starter:** $7/month (no spin down)
- **Vercel:** Free (or Pro $20/month for teams)
- **PostgreSQL:** Included with Render plan
- **Total:** ~$7-27/month

---

## 📞 Support & Resources

### Documentation
- 📖 **Full Feature Guide:** `ADVANCED_FEATURES.md`
- 🎯 **Demo Guide:** `DEMO_GUIDE.md`
- 📱 **Responsive Design:** `RESPONSIVE_SUMMARY.md`

### Platform Docs
- 🔧 **Render Docs:** https://render.com/docs
- 🌐 **Vercel Docs:** https://vercel.com/docs
- 🗃️ **Prisma Deployment:** https://www.prisma.io/docs/guides/deployment

### Issues?
- Check troubleshooting section above
- Review Render/Vercel logs
- Check GitHub issues
- Email: nikhiltandel280-2@gmail.com

---

## ✅ Deployment Checklist

Print this or keep it open:

### Backend (Render)
- [ ] PostgreSQL database created
- [ ] Web service created with correct root directory (`apps/api`)
- [ ] Environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET` (64+ characters)
  - [ ] `FRONTEND_ORIGIN` (your Vercel URL)
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=4000`
- [ ] Build successful
- [ ] API docs accessible at `/api/docs`

### Frontend (Vercel)
- [ ] Project imported from GitHub
- [ ] Root directory set to `apps/web`
- [ ] Environment variable set:
  - [ ] `NEXT_PUBLIC_API_BASE` (your Render URL + `/api`)
- [ ] Build successful
- [ ] Site accessible

### Testing
- [ ] Can register new account
- [ ] Can login
- [ ] Can create form
- [ ] Can toggle form public
- [ ] Can submit form (incognito window)
- [ ] Can view responses

### Post-Deploy
- [ ] Updated `FRONTEND_ORIGIN` with actual Vercel URL
- [ ] Tested in different browsers
- [ ] Tested on mobile device
- [ ] Monitored logs for errors

---

## 🎊 Congratulations!

Your **Daynt Form Builder** is now live and accessible from anywhere in the world!

Share your live URLs:
- **Frontend:** `https://your-app.vercel.app`
- **API Docs:** `https://your-api.onrender.com/api/docs`

**Time to show it off on:**
- Portfolio website
- LinkedIn projects
- GitHub README
- Resume/CV

---

**Built with ❤️ | Deployed with Render + Vercel**

