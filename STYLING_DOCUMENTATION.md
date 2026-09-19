# Styling & Accessibility Documentation

## Overview
This document outlines the styling approach, CSS concepts, semantic HTML practices, and accessibility considerations implemented in the portfolio.

---

## Semantic HTML Structure

### Semantic Elements Used
- `<header>` - Navigation and branding at top
- `<nav>` - Navigation links with proper ARIA labels
- `<main>` - Primary content area (implicit on pages)
- `<section>` - Major content sections (About, Skills, Experience, etc.)
- `<article>` - Blog posts and major content blocks
- `<footer>` - Site footer with copyright
- `<h1>`, `<h2>`, `<h3>` - Proper heading hierarchy (never skip levels)
- `<ul>`, `<li>` - Lists for related items (skills, experience, testimonials)

**Why it matters:** Screen readers use semantic HTML to navigate and understand page structure. Proper semantics improve SEO and accessibility without additional effort.

### Example
```jsx
<section id="skills" aria-labelledby="skills-title">
  <h2 id="skills-title">My Skills</h2>
  <ul>
    <li>React</li>
    <li>Django</li>
  </ul>
</section>
```

---

## CSS Concepts & Approach

### 1. Utility-First CSS (Tailwind)
- Uses predefined utility classes instead of writing custom CSS
- Benefits: Consistency, faster development, smaller bundle size
- Example: `className="text-lg font-semibold text-black dark:text-white"`

**Concept:** Compose styles from small, single-purpose classes rather than large stylesheets.

### 2. Responsive Design (Mobile-First)
- Default styles apply to mobile
- Breakpoint prefixes for larger screens: `sm:`, `md:`, `lg:`
- Example: `className="w-full md:w-1/2 lg:w-1/3"` (100% mobile, 50% tablet, 33% desktop)

**Breakpoints Used:**
- `sm`: 640px (tablets)
- `md`: 768px (larger tablets)
- `lg`: 1024px (desktops)

### 3. Dark Mode Support
- Uses `dark:` prefix for dark mode styles
- Automatically enables based on system preference
- Example: `className="bg-white dark:bg-black text-black dark:text-white"`

**Implementation:** CSS media query `@media (prefers-color-scheme: dark)` with Tailwind's dark mode support.

### 4. CSS Animations & Transitions
Custom animations defined in `/src/styles/animations.css`:

**Key Animations:**
- `fadeIn` - Opacity change (0.6s)
- `fadeInUp` - Slide up while fading (0.6s, used on page load)
- `fadeInDown` - Slide down while fading (0.4s, used on headers)
- `scaleUp` - Hover effect scaling (1 to 1.05)
- `underlineSlide` - Nav link underline effect

**Example CSS:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 5. Stagger Animations
Sequential delays for multiple elements using CSS and inline styles:
```css
.animate-stagger > * {
  animation: fadeInUp 0.6s ease-out backwards;
}
.animate-stagger > *:nth-child(1) { animation-delay: 0.1s; }
.animate-stagger > *:nth-child(2) { animation-delay: 0.2s; }
```
**Purpose:** Elements fade in one after another, creating visual flow.

### 6. Hover States & Transitions
- Smooth color transitions on hover
- Scale effects for interactive elements
- Icon rotation effects
- Example: `.group-hover:scale-105 group-hover:rotate-12`

---

## Accessibility (A11y) Best Practices

### 1. Color Contrast
- Text has sufficient contrast ratio (WCAG AA: 4.5:1 for normal text)
- Dark mode tested for readability
- Color isn't the only indicator (icons have semantic meaning)

### 2. ARIA Labels & Attributes
```jsx
// Implicit label via semantic HTML
<button aria-label="Toggle navigation menu">
  <MenuIcon />
</button>

// Describing interactive regions
<section aria-labelledby="skills-title">
  <h2 id="skills-title">My Skills</h2>
</section>
```

**Key ARIA Attributes:**
- `aria-label` - Text label for non-text elements
- `aria-labelledby` - Links element to its heading
- `aria-expanded` - Shows if menu is open/closed
- `role` - Explicit element role when semantics don't apply

### 3. Keyboard Navigation
- All interactive elements focusable (buttons, links)
- Tab order follows visual flow (left to right, top to bottom)
- Focus visible with outline or ring (example: `.focus:ring-2 .focus:ring-blue-500`)
- No keyboard traps (user can tab away from any element)

### 4. Screen Reader Optimization
- Skip navigation link for direct content access (optional enhancement)
- Descriptive link text ("Learn more" → "Learn more about Django")
- Form labels linked to inputs: `<label for="email">Email</label><input id="email">`
- Alt text for images: `<img alt="Slavi Dimitrov portrait" src="..." />`

### 5. Motion & Reduced Motion
Animations respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
**Purpose:** Users with vestibular disorders or motion sensitivity won't experience dizziness.

### 6. Font & Text Readability
- Line height: 1.5+ for body text (adequate spacing)
- Font size: 16px minimum for body text
- Max-width on text blocks (prevents long lines hard to read)
- High contrast between text and background

---

## Color Palette & Design System

### Neutral Colors (Text & Backgrounds)
- `zinc-50` to `zinc-950` - Grayscale neutral shades
- `black` & `white` - Primary text and backgrounds
- `gray` equivalents for secondary content

### Accent Colors (Interactive Elements)
- `blue` - Primary actions and focus states
  - `blue-400` (light mode hover), `blue-500` (focus ring)
  - `blue-900` (dark mode variant)
- `green`, `yellow`, `purple`, `red` - Semantic colors for specific contexts
  - Green for growth/learning icons
  - Yellow for energy/enthusiasm
  - Red for errors/warnings

**Principle:** Limited palette maintains visual coherence and improves accessibility.

---

## CSS Specificity & Organization

### Class Naming Approach (Tailwind)
- No custom classes needed (Tailwind handles specificity)
- Utility classes composed directly in JSX
- Consistent structure: `[responsive]:[state]:[property]`

Example: `md:hover:bg-blue-600 dark:md:hover:bg-blue-700`

### Cascade Strategy
- Global styles in `globals.css` (minimal)
- Tailwind utilities handle most styling
- Custom animations isolated in `animations.css`
- No specificity wars (single-purpose utilities)

---

## Responsive Design Strategy

### Mobile-First Approach
1. Base styles apply to mobile (320px+)
2. Add `sm:` for tablet layout changes
3. Add `md:` and `lg:` for larger screens
4. Test at: 375px (mobile), 768px (tablet), 1024px (desktop)

### Layout Examples
```jsx
// Stacks on mobile, side-by-side on desktop
className="flex flex-col md:flex-row gap-6"

// Full width mobile, half width desktop
className="w-full md:w-1/2"

// Hidden on mobile, visible on desktop
className="hidden md:block"
```

---

## Performance Optimization Through CSS

### Code Splitting via CSS
- Unused Tailwind classes pruned at build time
- Only generated classes for used utilities
- Results: ~30KB gzipped CSS (typical portfolio)

### Hardware Acceleration
- `transform` and `opacity` used for animations (GPU accelerated)
- `will-change` hints for expensive animations (used sparingly)
- Avoids animating expensive properties (`width`, `height`, `layout`)

### Critical CSS
- Tailwind extracts critical styles for above-the-fold content
- Prevents render-blocking CSS

---

## Summary: Key Takeaways

| Concept | Implementation | Purpose |
|---------|---|---|
| **Semantic HTML** | `<section>`, `<nav>`, `<article>` | Improves accessibility, SEO, structure |
| **Utility CSS** | Tailwind classes | Consistency, speed, small bundle |
| **Responsive Design** | `sm:`, `md:`, `lg:` prefixes | Works on all device sizes |
| **Dark Mode** | `dark:` prefix | System preference support |
| **Animations** | CSS keyframes + Tailwind | Smooth, GPU-accelerated transitions |
| **A11y** | ARIA labels, high contrast, keyboard nav | Accessible to all users |
| **Reduced Motion** | `@media (prefers-reduced-motion)` | Respects user preferences |
| **Color System** | Limited palette with semantic meaning | Visual hierarchy, accessibility |

---

## Quick Checklist Before Deployment

- [ ] All images have descriptive `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus outline visible on all interactive elements
- [ ] Dark mode tested and readable
- [ ] Mobile responsive at 375px width
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Form labels linked to inputs
- [ ] No console errors or warnings

---

**This is a living document.** CSS and accessibility best practices evolve; refer to [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility) for current standards.
