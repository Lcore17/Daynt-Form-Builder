# 🎨 Daynt Forms - Frontend (Next.js + shadcn/ui)

> **Modern Next.js 14 application built with shadcn/ui, featuring real-time form builder, analytics, and dark mode**

## 🎯 Overview

This is the frontend application for Daynt Forms, showcasing **shadcn/ui** components:
- Interactive form builder with live preview
- 6 professional form templates
- Visual analytics with charts
- Dark mode with system preference detection
- Responsive design (mobile-first)
- Real-time form updates
- Advanced settings panel
- Export capabilities (CSV/JSON)
- **16 shadcn/ui components** integrated throughout

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript 5** - Full type safety
- **Tailwind CSS 3** - Utility-first styling

### UI Components (shadcn/ui)
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible primitives
- **class-variance-authority** - Component variants
- **clsx + tailwind-merge** - Efficient className management

### Additional Libraries
- **next-themes** - Dark mode support
- **Lucide React** - 472+ icons
- **SWR** - Data fetching and caching
- **Recharts** - Chart visualizations

## 🎨 shadcn/ui Components Included

This project includes **16 shadcn/ui components**:

| Component | File | Usage |
|-----------|------|-------|
| Button | `components/ui/button.tsx` | CTAs, form actions, navigation |
| Card | `components/ui/card.tsx` | Content containers |
| Input | `components/ui/input.tsx` | Text input fields |
| Label | `components/ui/label.tsx` | Form labels |
| Select | `components/ui/select.tsx` | Dropdown selects |
| Dialog | `components/ui/dialog.tsx` | Modal dialogs |
| Badge | `components/ui/badge.tsx` | Status indicators |
| Textarea | `components/ui/textarea.tsx` | Multi-line inputs |
| Checkbox | `components/ui/checkbox.tsx` | Checkbox inputs |
| Radio Group | `components/ui/radio-group.tsx` | Radio buttons |
| Switch | `components/ui/switch.tsx` | Toggle switches |
| Separator | `components/ui/separator.tsx` | Visual dividers |
| Dropdown Menu | `components/ui/dropdown-menu.tsx` | Context menus |
| Tooltip | `components/ui/tooltip.tsx` | Hover tooltips |
| Tabs | `components/ui/tabs.tsx` | Tabbed interfaces |
| Alert | `components/ui/alert.tsx` | Alert messages |

**All components are:**
- ✅ Fully accessible (WCAG AA compliant)
- ✅ Dark mode compatible
- ✅ Customizable with Tailwind
- ✅ TypeScript enabled
- ✅ Responsive by default

## 📁 Project Structure

```
apps/web/
├── app/
│   ├── (auth)/              # Auth route group
│   │   ├── login/           # Login page
│   │   └── register/        # Register page
│   ├── builder/             # Form builder
│   │   └── page.tsx
│   ├── dashboard/           # Dashboard with analytics
│   │   └── page.tsx
│   ├── responses/           # Response viewer
│   │   └── page.tsx
│   ├── privacy/             # Privacy policy
│   │   └── page.tsx
│   ├── terms/               # Terms of service
│   │   └── page.tsx
│   ├── form/                # Public form view
│   │   └── [publicId]/
│   │       └── page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── navbar.tsx                     # Main navigation
│   ├── theme-toggle.tsx               # Dark mode switcher
│   ├── live-form-preview.tsx          # Live preview component
│   ├── form-analytics.tsx             # Dashboard analytics
│   ├── template-selector.tsx          # Template modal
│   ├── advanced-settings.tsx          # Settings panel
│   └── response-visualization.tsx     # Response charts
├── lib/
│   ├── templates.ts         # Form templates
│   ├── fetcher.ts           # SWR fetcher
│   └── utils.ts             # Helper functions
├── public/                  # Static assets
├── .env.local               # Environment variables
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind config
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Backend API running on port 4000

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### Run Development Server

```bash
npm run dev
```

Application starts at: **http://localhost:3000**

## 🎨 Key Features

### 1. Landing Page
- Modern hero section with gradients
- Feature showcase
- Demo credentials for quick access
- Responsive design
- Dark mode support

### 2. Authentication
- Login page with demo auto-fill
- Register page with validation
- Secure JWT cookie-based auth
- Protected routes
- Automatic redirects

### 3. Dashboard
- Analytics cards (forms, responses, averages)
- Form list with search
- Quick actions (Edit, Responses, Copy Link, Delete)
- Empty states
- Responsive grid layout

### 4. Form Builder ⭐
**Split-screen interface:**

**Left Panel:**
- Template selector (6 templates)
- Field type palette (7 types)
- Field editor with validation
- Advanced settings panel (9 options)
- Drag-to-reorder fields

**Right Panel:**
- Live form preview
- Real-time updates
- Mobile/desktop view
- Interactive test mode

**Header:**
- Form title editor
- Save button
- Public/private toggle
- Copy link
- Back button

### 5. Template System
**6 Professional Templates:**
1. **Customer Feedback** - Rating, satisfaction, comments
2. **Event Registration** - Name, email, ticket type, preferences
3. **Survey** - Multiple questions with varied types
4. **Contact Form** - Standard contact fields
5. **Job Application** - Personal info, resume, experience
6. **RSVP** - Event attendance tracking

### 6. Advanced Settings
**9 Configuration Options:**
- Custom brand color (hex picker)
- Logo upload (database ready)
- Form scheduling (start/end dates)
- Submission limits (max responses)
- Thank you message (custom text)
- Redirect URL (after submission)
- Language selection (9 languages)
- Webhook URL (integrations)
- CAPTCHA toggle (spam protection)

### 7. Response Viewer
**Two Modes:**

**List View:**
- All submissions as cards
- Timestamp display
- Individual response details
- Pagination

**Analytics View:**
- Summary stats (4 cards)
- Bar charts for multiple choice
- Statistics for number fields
- Completion rate visualization

**Export Options:**
- CSV download (Excel-ready)
- JSON download (developer-friendly)

### 8. Dark Mode
- System preference detection
- Manual toggle in header
- Smooth transitions
- Persists on reload
- Consistent across all pages

## 🎯 Pages Overview

### `/` - Landing Page
- Hero section with CTA
- Feature highlights
- Demo credentials display
- Footer with links

### `/login` - Login Page
- Email/password form
- Demo auto-fill button
- Register link
- Error handling

### `/register` - Register Page
- Name, email, password fields
- Real-time validation
- Login link
- Success redirect

### `/dashboard` - Dashboard
- Analytics cards
- Form management
- Search functionality
- Quick actions

### `/builder` - Form Builder
- Template selector (on new form)
- Split-screen interface
- Live preview
- Advanced settings

### `/responses` - Response Viewer
- List/analytics toggle
- Charts and visualizations
- Export buttons
- Form selector dropdown

### `/form/[publicId]` - Public Form
- Clean form display
- Field validation
- File upload support
- Submit handling
- Thank you message

### `/privacy` - Privacy Policy
- Professional content
- Contact information
- GDPR compliance

### `/terms` - Terms of Service
- Legal terms
- Usage guidelines
- Contact information

## 🎨 Styling & Theming

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...},
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
    },
  },
}
```

### Dark Mode Implementation
```typescript
// Using next-themes
import { ThemeProvider } from 'next-themes'

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

### Custom Gradients
```css
/* globals.css */
.gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

## 📊 Data Fetching

### Using SWR
```typescript
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

function Dashboard() {
  const { data, error, isLoading } = useSWR('/api/forms', fetcher)
  
  if (isLoading) return <Loading />
  if (error) return <Error />
  
  return <FormList forms={data} />
}
```

### Fetcher Configuration
```typescript
// lib/fetcher.ts
export const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: 'include', // Include cookies
  }).then((r) => r.json())
```

## 🔧 Component Examples

### Template Selector
```typescript
<TemplateSelector
  onSelect={(templateId, templateData) => {
    setTitle(templateData.title)
    setDescription(templateData.description)
    setFields(templateData.fields)
  }}
  onClose={() => setShowTemplates(false)}
/>
```

### Advanced Settings
```typescript
<AdvancedSettings
  settings={advancedSettings}
  onChange={(newSettings) => setAdvancedSettings(newSettings)}
/>
```

### Response Visualization
```typescript
<ResponseVisualization
  responses={submissions}
  fields={formData?.fields || []}
/>
```

## 🚀 Production Build

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Vercel Features:**
- Automatic deployments on git push
- Preview deployments for PRs
- Edge network for fast loading
- Built-in analytics

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Deploy to Other Platforms
- **AWS Amplify**: Connect GitHub, auto-deploy
- **DigitalOcean App Platform**: Select Next.js preset
- **Railway**: Auto-detects Next.js
- **Cloudflare Pages**: Build command: `npm run build`

## 🎭 Component Library

### Reusable Components

**Navbar**
- Logo and branding
- Navigation links
- User menu
- Theme toggle

**Theme Toggle**
- Sun/moon icons
- Smooth transitions
- System preference

**Live Preview**
- Real-time updates
- Responsive view
- Interactive elements

**Analytics Cards**
- Gradient backgrounds
- Icon display
- Metric display
- Loading states

**Template Cards**
- Image/icon
- Title & description
- Hover effects
- Click handling

## 📱 Responsive Breakpoints

```css
/* Mobile First */
.container {
  @apply px-4;           /* Mobile: base */
  @apply sm:px-6;        /* Small: 640px+ */
  @apply md:px-8;        /* Medium: 768px+ */
  @apply lg:px-12;       /* Large: 1024px+ */
  @apply xl:px-16;       /* Extra Large: 1280px+ */
}
```

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎨 Design System

### Colors
- **Primary**: Purple/Blue gradient
- **Secondary**: Pink/Red gradient
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red
- **Info**: Blue

### Typography
- **Headings**: Bold, gradient text
- **Body**: Regular, readable
- **Code**: Monospace font

### Spacing
- Consistent padding/margin
- 4px base unit
- Tailwind spacing scale

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register new account
- [ ] Login with credentials
- [ ] Login with demo credentials
- [ ] Logout
- [ ] Protected route redirect

**Form Builder:**
- [ ] Create blank form
- [ ] Select template
- [ ] Add fields
- [ ] Edit fields
- [ ] Reorder fields
- [ ] Delete fields
- [ ] Change advanced settings
- [ ] Save form
- [ ] Preview updates in real-time

**Dashboard:**
- [ ] View all forms
- [ ] Search forms
- [ ] Copy public link
- [ ] Edit form
- [ ] View responses
- [ ] Delete form

**Responses:**
- [ ] View submissions
- [ ] Toggle analytics
- [ ] Export CSV
- [ ] Export JSON
- [ ] View charts

**Dark Mode:**
- [ ] Toggle theme
- [ ] Theme persists
- [ ] System preference works
- [ ] All pages support dark mode

## 🐛 Troubleshooting

### API Connection Issues
Check `NEXT_PUBLIC_API_URL` in `.env.local`

### Authentication Not Working
Ensure backend is running and CORS is configured

### Dark Mode Not Persisting
Check `next-themes` provider is wrapping app

### Build Errors
```bash
rm -rf .next
npm run build
```

## 📖 Documentation

- **Main README**: [../../README.md](../../README.md)
- **Advanced Features**: [../../docs/ADVANCED_FEATURES.md](../../docs/ADVANCED_FEATURES.md)
- **Presentation Guide**: [../../docs/PROJECT_PRESENTATION.md](../../docs/PROJECT_PRESENTATION.md)

## 🤝 Contributing

See main [README.md](../../README.md) for contribution guidelines.

## 📄 License

MIT License - See [LICENSE](../../LICENSE)

---

**Part of Daynt Forms**
Built with ❤️ using Next.js 14 and Tailwind CSS
