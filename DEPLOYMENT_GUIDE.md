# Deployment Guide

This guide will help you deploy the Daynt Form Builder to production. We'll deploy:
- **Backend (API)** → Render
- **Frontend (Web)** → Vercel

---

## Prerequisites

- GitHub account with your code pushed
- Render account (for backend)
- Vercel account (for frontend)
- PostgreSQL database (recommended for production)

---

// ...existing code...

## Part 2: Deploy Frontend (Web) to Vercel

### Step 1: Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and continue with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click "Add New" → "Project"
2. Import `Lcore17/Daynt-Form-Builder`
3. Click "Import"

### Step 3: Configure Build Settings
Vercel will auto-detect Next.js, but configure:

**Framework Preset:** Next.js

**Root Directory:** 
```
apps/web
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
.next
```

**Install Command:**
```
npm install
```

### Step 4: Set Environment Variables
In the "Environment Variables" section, add:

**Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:**
```
https://your-app.up.railway.app
```
(Use the Railway API URL you copied earlier)

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Copy your Vercel URL (looks like: `https://your-app.vercel.app`)

### Step 6: Update Backend CORS
1. Go back to Railway
2. Update the `FRONTEND_ORIGIN` variable with your Vercel URL:
```
FRONTEND_ORIGIN=https://your-app.vercel.app
```
3. Redeploy the backend service

---

## Alternative: Deploy Backend to Render

### Step 1: Sign up for Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository: `Lcore17/Daynt-Form-Builder`
3. Click "Connect"

### Step 3: Configure Service
**Name:** `daynt-form-api` (or your choice)

**Region:** Choose closest to your users

**Branch:** `main`

**Root Directory:**
```
apps/api
```

**Runtime:** `Node`

**Build Command:**
```
npm install --omit=dev && npm run prisma:deploy && npm run build
```

**Start Command:**
```
npm run start:prod
```

### Step 4: Add PostgreSQL Database
1. Click "New" → "PostgreSQL"
2. Create database
3. Copy the "Internal Database URL"

### Step 5: Set Environment Variables
Add these in the "Environment" section:

```bash
DATABASE_URL=<your-render-postgres-url>
JWT_SECRET=your-super-secret-jwt-key-minimum-64-characters-long-random-string
FRONTEND_ORIGIN=https://your-app.vercel.app
NODE_ENV=production
```

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for deployment
3. Copy your service URL (e.g., `https://daynt-form-api.onrender.com`)

---

## Part 3: Post-Deployment Setup

### 1. Create Admin Account
Visit your frontend: `https://your-app.vercel.app`
1. Click "Register"
2. Create your admin account
3. Login with your credentials

### 2. Test the Application
1. **Create a form** in the builder
2. **Preview the form** using the public link
3. **Submit a response**
4. **Check responses** in the dashboard

### 3. Monitor Logs
// ...existing code...
- **Render:** Dashboard → Your Service → Logs
- **Vercel:** Project → Deployments → View Function Logs

---

## Environment Variables Reference

### Backend (API)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | ✅ Yes | Secret for JWT tokens (64+ chars) | `your-random-64-char-string` |
| `FRONTEND_ORIGIN` | ✅ Yes | Frontend URL for CORS | `https://your-app.vercel.app` |
| `PORT` | No | Server port | `4000` |
| `NODE_ENV` | No | Environment | `production` |

### Frontend (Web)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Backend API URL | `https://your-api.railway.app` |

---

## Troubleshooting

// ...existing code...

### Frontend Issues

**API calls fail (Network Error):**
```bash
# Verify NEXT_PUBLIC_API_URL is set correctly
# Check if backend is running at that URL
# Try visiting: https://your-api-url/api/docs
```

**Build fails:**
```bash
# Verify Root Directory is set to: apps/web
# Check build logs for missing dependencies
```

### Database Issues

**Migration errors:**
```bash
# Run manually: npm run prisma:deploy
# Or update build command to include it
```

**Connection timeout:**
```bash
# Check DATABASE_URL format
# Ensure database is running
# Verify network access between service and database
```

---

// ...existing code...

---

## Performance Optimization

### Backend
1. **Enable caching** for static assets
2. **Use connection pooling** for database
3. **Add rate limiting** (already configured with Throttler)
4. **Monitor memory usage** in Render dashboard

### Frontend
1. **Enable Vercel Analytics** (free tier available)
2. **Optimize images** with Next.js Image component
3. **Enable ISR** (Incremental Static Regeneration) for form pages
4. **Use Vercel Edge Functions** for better performance

### Database
1. **Add indexes** to frequently queried fields
2. **Enable connection pooling** (Prisma Data Proxy or PgBouncer)
3. **Regular backups** (automated on Render)

---

## Security Checklist

- ✅ Use strong JWT_SECRET (64+ characters)
- ✅ Enable HTTPS (automatic on Railway/Render/Vercel)
- ✅ Set proper CORS origin (no wildcards in production)
- ✅ Use environment variables for all secrets
- ✅ Enable rate limiting (already configured)
- ✅ Regular dependency updates
- ✅ Database backups enabled
- ✅ Monitor error logs regularly

---

## Scaling Considerations

### When to Scale Up
- Response time > 500ms consistently
- Memory usage > 80%
- CPU usage > 80%
- Database connections maxed out

### Scaling Options

**Render:**
- Upgrade instance type (Starter → Standard → Pro)
- Add autoscaling rules
- Enable regional deployments

**Vercel:**
- Automatically scales (serverless)
- Upgrade plan for higher limits
- Add Edge Middleware for better performance

---

## Cost Estimates

### Free Tier (Good for testing/demos)
- **Render:** Free tier available (spins down after inactivity)
- **Vercel:** Free (100GB bandwidth, unlimited deployments)

### Production Tier
- **Render:** ~$7-25/month (Starter plan)
- **Vercel:** Free or Pro ($20/month for teams)
- **Total:** ~$7-45/month for small to medium traffic

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Configure environment variables
4. ✅ Test the application
5. 🔄 Set up custom domain (optional)
6. 🔄 Enable monitoring and alerts
7. 🔄 Set up CI/CD for automatic deployments
8. 🔄 Configure backup strategy

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs (Railway/Render/Vercel dashboards)
3. Verify all environment variables are set correctly
4. Test the API independently at `/api/docs`
5. Create an issue on GitHub if problems persist

---

**🎉 Congratulations!** Your Dynamic Form Builder is now live and accessible from anywhere!
