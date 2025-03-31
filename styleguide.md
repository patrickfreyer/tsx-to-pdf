# Modern UI Style Guide

## 🎨 Color System

### Primary Colors
- **Violet (Intelligence/AI)**
  - Main: `violet-600`
  - Light: `violet-50`
  - Dark: `violet-900`
  - Gradient: `from-white to-violet-50/40`

- **Blue (Integration/Connection)**
  - Main: `blue-600`
  - Light: `blue-50`
  - Dark: `blue-900`
  - Gradient: `from-white to-blue-50/40`

- **Emerald (Processing/Server)**
  - Main: `emerald-600`
  - Light: `emerald-50`
  - Dark: `emerald-900`
  - Gradient: `from-white to-emerald-50/40`

- **Amber (External/APIs)**
  - Main: `amber-600`
  - Light: `amber-50`
  - Dark: `amber-900`
  - Gradient: `from-white to-amber-50/40`

### Neutral Colors
- Text Primary: `text-gray-800`
- Text Secondary: `text-gray-600`
- Text Tertiary: `text-gray-500`
- Borders: `border-gray-100`
- Background: `bg-white`

## 📐 Layout Components

### Container
```css
bg-white rounded-lg p-6 shadow-lg max-w-5xl mx-auto
```

### Section
```css
bg-white/50 rounded-lg p-5 mb-5 border shadow-sm
```

### Card
```css
bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow
```

## 📝 Typography

### Headings
- H1: `text-4xl font-bold text-gray-800`
- H2: `text-2xl font-bold text-gray-800`
- H3: `text-lg font-semibold text-gray-800`
- Section Title: `text-lg font-bold flex items-center gap-2`

### Body Text
- Primary: `text-gray-600`
- Secondary: `text-gray-500`
- Small: `text-sm text-gray-600`
- Tiny: `text-xs text-gray-500`

### Accent Text
```css
text-{color}-600 font-medium
```

## 🎯 Interactive Elements

### Buttons
```css
px-4 py-2 rounded-lg font-medium transition-all
hover:shadow-md active:transform active:scale-95
```

### Icons
- Size: `size={20}` (large), `size={16}` (medium), `size={14}` (small)
- Color: `text-{color}-600`
- Background: `bg-{color}-50`

### Badges
```css
text-xs px-3 py-1 rounded-full bg-{color}-50 text-gray-700
```

## 🖼️ Visual Elements

### Circles
```css
rounded-full flex items-center justify-center
{size} {background-color}
```
Sizes:
- Large: `w-14 h-14`
- Medium: `w-10 h-10`
- Small: `w-8 h-8`

### Gradients
```css
bg-gradient-to-b from-white to-{color}-50/40
```

### Shadows
- Subtle: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`

## 🎭 States & Transitions

### Hover States
```css
hover:shadow-md
hover:text-{color}-700
transition-all duration-200
```

### Active States
```css
active:transform
active:scale-95
```

## 📱 Responsive Design

### Breakpoints
- Mobile First: Default styles
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)
- Wide: `xl:` (1280px)

### Grid Layouts
```css
grid md:grid-cols-2 lg:grid-cols-4 gap-5
```

## 🔍 Accessibility

NONE

### Text Contrast
- Use `text-gray-800` for primary content
- Use `text-gray-600` for secondary content
- Use `text-gray-500` for tertiary content

## 🎪 Animation

NONE