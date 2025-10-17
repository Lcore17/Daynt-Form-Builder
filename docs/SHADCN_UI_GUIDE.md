# 🎨 shadcn/ui Integration Guide

## Overview

This project showcases **shadcn/ui** - a modern component system that provides beautifully designed, accessible, and customizable components built with Radix UI and Tailwind CSS.

## Why shadcn/ui?

Unlike traditional component libraries, shadcn/ui:
- ✅ **Owns Your Code** - Components live in your project, not `node_modules`
- ✅ **Full Customization** - Modify any component to fit your needs
- ✅ **No Runtime Overhead** - Only ships what you use
- ✅ **Accessibility First** - Built on Radix UI with ARIA support
- ✅ **TypeScript Native** - Full type safety out of the box
- ✅ **Dark Mode Ready** - All components support theming
- ✅ **Tailwind Powered** - Use utility classes for customization

## Project Configuration

### components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### lib/utils.ts - cn() Utility
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This utility combines:
- **clsx** - Conditional className construction
- **tailwind-merge** - Intelligent Tailwind class merging

## Components Used

### 1. Button Component
**File:** `components/ui/button.tsx`

**Variants:**
- `default` - Primary button with solid background
- `destructive` - Red for delete/danger actions
- `outline` - Border with transparent background
- `secondary` - Muted secondary actions
- `ghost` - No background, hover effect only
- `link` - Styled as underlined link

**Sizes:**
- `default` - Standard button
- `sm` - Small button
- `lg` - Large button
- `icon` - Square icon-only button

**Usage Example:**
```typescript
import { Button } from "@/components/ui/button"

// Primary button
<Button>Save Form</Button>

// Outline button
<Button variant="outline">Cancel</Button>

// Destructive button with icon
<Button variant="destructive" size="sm">
  <Trash2 className="mr-2 h-4 w-4" />
  Delete
</Button>

// Icon-only button
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

**Where Used in Project:**
- Landing page CTAs
- Form builder save/cancel buttons
- Dashboard action buttons
- Delete confirmations
- Navigation elements

---

### 2. Card Component
**File:** `components/ui/card.tsx`

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Top section
- `CardTitle` - Title text
- `CardDescription` - Subtitle text
- `CardContent` - Main content
- `CardFooter` - Bottom section

**Usage Example:**
```typescript
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Customer Feedback Survey</CardTitle>
    <CardDescription>Created 2 hours ago</CardDescription>
  </CardHeader>
  <CardContent>
    <p>5 responses • 3 fields</p>
  </CardContent>
  <CardFooter>
    <Button>View Responses</Button>
  </CardFooter>
</Card>
```

**Where Used in Project:**
- Dashboard form cards
- Analytics stat cards
- Response viewer cards
- Template selector cards
- Settings panels

---

### 3. Input Component
**File:** `components/ui/input.tsx`

**Props:**
- All standard HTML input attributes
- `type` - text, email, password, number, etc.
- `disabled` - Disabled state
- `className` - Additional classes

**Usage Example:**
```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="john@example.com"
  />
</div>
```

**Where Used in Project:**
- Login/register forms
- Form builder field editor
- Advanced settings inputs
- Search fields
- Text field inputs

---

### 4. Dialog Component
**File:** `components/ui/dialog.tsx`

**Sub-components:**
- `Dialog` - Root component
- `DialogTrigger` - Button that opens dialog
- `DialogContent` - Modal content container
- `DialogHeader` - Header section
- `DialogTitle` - Title text
- `DialogDescription` - Description text
- `DialogFooter` - Footer with actions

**Usage Example:**
```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Template Selector</Button>
  </DialogTrigger>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>Choose a Template</DialogTitle>
      <DialogDescription>
        Start with a professional template or create from scratch
      </DialogDescription>
    </DialogHeader>
    {/* Template grid */}
  </DialogContent>
</Dialog>
```

**Where Used in Project:**
- Template selector modal
- Delete confirmation dialogs
- Form settings modals
- Help/info modals

---

### 5. Select Component
**File:** `components/ui/select.tsx`

**Sub-components:**
- `Select` - Root component
- `SelectTrigger` - Button that opens dropdown
- `SelectContent` - Dropdown container
- `SelectItem` - Individual option
- `SelectValue` - Selected value display

**Usage Example:**
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select value={language} onValueChange={setLanguage}>
  <SelectTrigger>
    <SelectValue placeholder="Select language" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="en">English</SelectItem>
    <SelectItem value="es">Spanish</SelectItem>
    <SelectItem value="fr">French</SelectItem>
  </SelectContent>
</Select>
```

**Where Used in Project:**
- Language selector
- Field type selector
- Form selector in responses page
- Dropdown options in settings

---

### 6. Switch Component
**File:** `components/ui/switch.tsx`

**Props:**
- `checked` - Boolean state
- `onCheckedChange` - Callback function
- `disabled` - Disabled state

**Usage Example:**
```typescript
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch 
    id="captcha" 
    checked={enableCaptcha}
    onCheckedChange={setEnableCaptcha}
  />
  <Label htmlFor="captcha">Enable CAPTCHA</Label>
</div>
```

**Where Used in Project:**
- CAPTCHA toggle
- Public/private toggle
- Required field toggle
- Feature enable/disable switches

---

### 7. Badge Component
**File:** `components/ui/badge.tsx`

**Variants:**
- `default` - Primary badge
- `secondary` - Muted badge
- `destructive` - Error/warning badge
- `outline` - Outlined badge

**Usage Example:**
```typescript
import { Badge } from "@/components/ui/badge"

<div className="flex gap-2">
  <Badge>Public</Badge>
  <Badge variant="secondary">5 responses</Badge>
  <Badge variant="outline">Draft</Badge>
</div>
```

**Where Used in Project:**
- Form status indicators
- Field type labels
- Response count badges
- New feature badges

---

### 8. Tabs Component
**File:** `components/ui/tabs.tsx`

**Sub-components:**
- `Tabs` - Root component
- `TabsList` - Tab button container
- `TabsTrigger` - Individual tab button
- `TabsContent` - Content for each tab

**Usage Example:**
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="list">
  <TabsList>
    <TabsTrigger value="list">List View</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="list">
    {/* Response list */}
  </TabsContent>
  <TabsContent value="analytics">
    {/* Analytics charts */}
  </TabsContent>
</Tabs>
```

**Where Used in Project:**
- Response viewer (List/Analytics toggle)
- Settings sections
- Form builder tabs
- Multi-step forms

---

### 9. Alert Component
**File:** `components/ui/alert.tsx`

**Variants:**
- `default` - Info alert
- `destructive` - Error alert

**Sub-components:**
- `Alert` - Container
- `AlertTitle` - Title
- `AlertDescription` - Description

**Usage Example:**
```typescript
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to save form. Please try again.
  </AlertDescription>
</Alert>
```

**Where Used in Project:**
- Form validation errors
- API error messages
- Success notifications
- Warning messages

---

### 10. Dropdown Menu Component
**File:** `components/ui/dropdown-menu.tsx`

**Sub-components:**
- `DropdownMenu` - Root
- `DropdownMenuTrigger` - Button
- `DropdownMenuContent` - Menu container
- `DropdownMenuItem` - Menu item
- `DropdownMenuSeparator` - Divider
- `DropdownMenuLabel` - Section label

**Usage Example:**
```typescript
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={handleEdit}>
      Edit Form
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleCopy}>
      Copy Link
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Where Used in Project:**
- Form actions menu (Edit, Delete, Copy)
- User menu
- Context menus
- More options buttons

---

## Theme Configuration

### Dark Mode Support

All shadcn/ui components support dark mode through CSS variables:

**globals.css:**
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... more variables */
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    /* ... more variables */
  }
}
```

**Components automatically adapt:**
```typescript
// No special dark mode code needed!
<Button>Click me</Button>
// Works in light and dark mode automatically
```

---

## Customization Examples

### Custom Button Variant
```typescript
// components/ui/button.tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        // Add custom variant
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
      },
    },
  }
)

// Usage
<Button variant="gradient">Gradient Button</Button>
```

### Custom Card Style
```typescript
<Card className="border-2 border-purple-500 shadow-lg">
  <CardContent>
    Custom styled card!
  </CardContent>
</Card>
```

---

## Adding New Components

To add more shadcn/ui components:

```bash
# Navigate to frontend
cd apps/web

# Add component
npx shadcn@latest add [component-name]

# Example: Add accordion
npx shadcn@latest add accordion
```

**Available components:**
- accordion, alert-dialog, aspect-ratio
- avatar, calendar, collapsible
- command, context-menu, form
- hover-card, menubar, navigation-menu
- popover, progress, radio-group
- scroll-area, sheet, skeleton
- slider, sonner, table
- toast, toggle, toggle-group
- and more!

---

## Best Practices

### 1. Use cn() for Conditional Classes
```typescript
import { cn } from "@/lib/utils"

<Button 
  className={cn(
    "w-full",
    isLoading && "opacity-50 cursor-not-allowed"
  )}
>
  Submit
</Button>
```

### 2. Compose Components
```typescript
const FormField = () => (
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter name" />
    <p className="text-sm text-muted-foreground">
      This is a help text
    </p>
  </div>
)
```

### 3. Use Variants for Consistency
```typescript
// Don't manually style
<Button className="bg-red-500 hover:bg-red-600">Delete</Button>

// Use variant
<Button variant="destructive">Delete</Button>
```

### 4. Leverage TypeScript
```typescript
import { ButtonProps } from "@/components/ui/button"

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean
}
```

---

## Accessibility Features

All shadcn/ui components include:

- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Screen Reader Support** - Proper ARIA labels
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Color Contrast** - WCAG AA compliant colors
- ✅ **Semantic HTML** - Proper HTML elements

**Example:** Dialog component
- Traps focus inside modal
- Closes on Escape key
- Returns focus to trigger on close
- Has proper aria-labelledby and aria-describedby

---

## Resources

- **Official Docs:** https://ui.shadcn.com
- **Component Examples:** https://ui.shadcn.com/examples
- **Radix UI Docs:** https://www.radix-ui.com
- **Tailwind CSS:** https://tailwindcss.com
- **GitHub:** https://github.com/shadcn-ui/ui

---

## Summary

**shadcn/ui in This Project:**
- ✅ 16 components installed and configured
- ✅ Full TypeScript support
- ✅ Dark mode throughout
- ✅ Customized with Tailwind
- ✅ Accessible and responsive
- ✅ Ready for extension

**Next Steps:**
1. Explore component files in `components/ui/`
2. Customize variants in each component
3. Add more components as needed
4. Build custom compositions

---

**Built with ❤️ using shadcn/ui, Radix UI, and Tailwind CSS**
