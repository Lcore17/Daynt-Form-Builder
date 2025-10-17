# 🎯 Demo Credentials Guide

## Quick Access

### Login Page
![Demo Banner](demo-banner-preview.png)

The login page now features a **beautiful demo credentials banner** at the top:

```
┌─────────────────────────────────────────────┐
│  ✨  Try Demo Account                       │
│      Click below to auto-fill demo          │
│      credentials                            │
│                                             │
│      📧 demo@formapp.dev                    │
│      🔑 password123                         │
│                                             │
│  [  Load Demo Credentials  ]                │
└─────────────────────────────────────────────┘
```

### Features:
1. **One-Click Auto-Fill**: Click the button to instantly fill both fields
2. **Visual Feedback**: Toast notification confirms credentials loaded
3. **Always Visible**: Positioned prominently at the top
4. **Responsive**: Adapts beautifully to mobile screens

## Landing Page

The homepage also displays demo credentials:

```
┌─────────────────────────────────────────────┐
│  ✨ Try Demo Account                        │
│  Use these credentials to explore the       │
│  platform                                   │
│                                             │
│  📧 demo@formapp.dev                        │
│  🔑 password123                             │
└─────────────────────────────────────────────┘
```

## How to Use

### Method 1: Auto-Load (Recommended)
1. Go to http://localhost:3000/login
2. Click "Load Demo Credentials" button
3. Click "Sign In"
4. ✅ You're in!

### Method 2: Manual Entry
1. Email: `demo@formapp.dev`
2. Password: `password123`
3. Click "Sign In"

### Method 3: From Landing Page
1. Go to http://localhost:3000
2. See credentials in demo section
3. Click "View Demo" or "Sign In"
4. Enter credentials manually or use auto-load

## What You'll See After Login

1. **Dashboard**: Overview of all your forms
2. **Analytics**: Total forms, submissions, averages
3. **Form Management**: Create, edit, delete forms
4. **Live Preview**: See forms update in real-time
5. **Export Data**: Download responses as CSV/JSON

## Design Details

### Colors
- Banner Background: Blue gradient (600 → 700)
- Text: White with blue-50 for descriptions
- Icons: White Sparkles, Mail, Lock icons
- Button: White background with blue text

### Responsive Behavior
- **Mobile (< 640px)**: 
  - Stacked layout
  - Larger touch targets
  - Full-width button
  
- **Desktop (≥ 640px)**:
  - Spacious layout
  - Proper padding
  - Hover effects

## Styling Classes Used

```tsx
// Demo Banner Container
className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 sm:p-5 shadow-lg"

// Icon Card
className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"

// Credentials Display
className="bg-white/20 backdrop-blur rounded-lg p-2.5 sm:p-3 font-mono"

// Load Button
className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 sm:py-2.5 px-4 rounded-lg"
```

## Accessibility

- ✅ High contrast ratios (WCAG AA compliant)
- ✅ Keyboard navigation supported
- ✅ Screen reader friendly
- ✅ Touch-friendly (44px minimum tap target)
- ✅ Clear visual hierarchy

## Tips

1. **Demo Data**: The demo account has pre-seeded forms
2. **No Limits**: Create as many forms as you want
3. **Full Features**: All functionality available
4. **Safe Testing**: Changes won't affect other users
5. **Reset Anytime**: Logout and login again for fresh state

## Quick Links

- Landing: http://localhost:3000
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard
- Form Builder: http://localhost:3000/builder

## Troubleshooting

### Auto-Load Not Working?
- Refresh the page
- Clear browser cache
- Check console for errors

### Can't Login?
- Verify backend is running on :4000
- Check credentials are exactly: `demo@formapp.dev` / `password123`
- No spaces or typos

### Button Not Responding?
- Ensure JavaScript is enabled
- Check browser console
- Try manual entry as fallback

---

**Enjoy exploring Daynt Forms! ✨**
