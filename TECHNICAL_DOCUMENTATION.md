# Technical Documentation - Slavi's Portfolio

## Project Overview

This is a modern, performant personal portfolio website built with Next.js 15 and showcasing a fullstack developer's work. The site emphasizes clean design, fast performance, accessibility, and SEO while providing a seamless user experience across all devices.

---

## Tech Stack

### Core Framework & Build
- **Next.js 15+** - React framework with App Router for server-side rendering and static generation
- **TypeScript** - Type-safe development for improved code quality and developer experience
- **Node.js** - Runtime environment for development and deployment

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **CSS Animations** - Custom CSS keyframe animations for smooth micro-interactions
- **Dark Mode** - Native dark theme support using `dark:` Tailwind utilities

### Content Management
- **Markdown/MDX** - Blog posts written in MDX for rich content with React components
- **Frontmatter** - YAML front matter for post metadata (title, date, excerpt)

### Backend & Database
- **Supabase** - PostgreSQL database for blog posts and dynamic content
- **API Routes** - Next.js serverless functions for contact form submission and data fetching
- **Environment Variables** - Secure configuration management for API keys and secrets

### Analytics & Monitoring
- **Vercel Analytics** - Performance metrics and real-time analytics
- **Google Analytics** - User behavior tracking and conversion monitoring
- **Google Search Console** - SEO monitoring and indexing verification

### Deployment
- **Vercel** - Automatic deployments from git with production previews
- **Vercel Edge Functions** - Optional serverless edge computing for optimized performance

### Development Tools
- **Git** - Version control for collaborative development
- **npm/pnpm** - Package management and dependency resolution
- **ESLint** - Code quality and style enforcement
- **Prettier** - Code formatting consistency

---

## Architecture & Approach

### Component Structure

**Modular & Reusable Design**
- Small, focused components with single responsibilities
- Shared components in `/src/components/` for DRY principle
- Section components for each major page section (Hero, About, Skills, etc.)
- Icon components organized in `/src/components/icons/`

**Example:** The portfolio uses a `Photo` component that encapsulates Next.js Image optimization and styling, reused across hero and about sections with consistent behavior.

### Page Organization

- **Static Pages** - Home, About, Experience, Skills, Projects (pre-rendered for speed)
- **Dynamic Content** - Blog posts fetched from Supabase or static MDX files
- **Contact Form** - Serverless API endpoint for form submissions
- **Hash-based Navigation** - Smooth scrolling between sections on single-page layout

### Styling Architecture

**Design System Approach**
- Consistent color palette: zinc/black/white for neutral, blue accents for actions
- Responsive breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Dark mode automatically enabled based on system preference
- Animations respect `prefers-reduced-motion` for accessibility

**Animation Strategy**
- Fade-in effects for page load (`.animate-fade-in-up`, `.animate-fade-in-down`)
- Stagger delays for sequential element animations (`.animate-stagger`)
- Hover micro-interactions with smooth transitions (`.animate-hover-scale`)
- SVG icons with color-coded semantic meaning

### Data Management

**Static Data**
- Skills and experience stored in TypeScript data files
- Skills organized by category (Backend, Frontend, Tools, Exploring)
- Experience includes work history and education with structured metadata

**Dynamic Content (Optional)**
- Blog posts from Supabase for real-time content management
- Alternative: Static MDX files for offline-first approach
- Contact form submissions logged and optionally sent via email

---

## Feature Set

### Core Features
- Responsive design (mobile, tablet, desktop)
- Dark/light theme toggle with system preference detection
- Smooth section navigation with hash routing
- Contact form with email submission
- Animated profile portrait (WebP format for performance)
- Favicon (32×32 ICO and 180×180 PNG for iOS)
- Color-coded skill badges with hover effects
- Dynamic list animations with staggered entrance

### Advanced Features
- SEO optimized meta tags and structured data (JSON-LD)
- Open Graph tags for social media sharing
- Canonical URLs to prevent duplicate content issues
- Sitemap generation for search engines
- Analytics integration for user tracking
- Performance monitoring with Vercel Analytics
- Blog platform with rich content support
- Real-time form validation and error handling

---

## Performance Optimization

### Image Optimization
- Next.js `<Image>` component with automatic format selection (WebP, AVIF)
- Lazy loading with `loading="lazy"` for below-the-fold images
- Responsive image sizing with `sizes` attribute
- Priority loading for hero section images with `priority` prop

### Code Splitting
- Automatic route-based code splitting by Next.js
- Dynamic imports for heavy components when needed
- Tree-shaking of unused code during build

### Caching Strategy
- Static generation (SSG) for content that rarely changes
- Incremental Static Regeneration (ISR) for blog posts
- Browser caching via HTTP headers on Vercel
- CDN edge caching for global performance

### SEO Optimization

**On-Page SEO**
- Semantic HTML with proper heading hierarchy
- Meta descriptions for all pages
- Open Graph and Twitter Card tags
- Canonical URLs to prevent duplicate content
- Alt text for all images

**Technical SEO**
- XML sitemap at `/sitemap.xml`
- robots.txt for search engine crawling rules
- Structured data (JSON-LD) for rich snippets
- Mobile-friendly responsive design
- Fast page load times (Core Web Vitals optimized)

**Google Search Console Integration**
- Sitemap submission for crawling
- Search performance monitoring
- Mobile usability tracking
- URL inspection for indexing status
- Coverage reports for crawl errors

---

## Deployment & Hosting

### Deployment Platform: Vercel

**Automatic CI/CD**
- GitHub integration for automatic deployments
- Preview deployments for every pull request
- Production deployment on merge to main
- Automatic rollbacks on errors

**Edge Functions**
- Optional serverless functions at edge locations
- Reduced latency for API requests
- Automatic scaling without server management

**Environment Management**
- Separate staging and production environments
- Environment variables encrypted and isolated
- Secret management for API keys and credentials

**Performance Features**
- Automatic image optimization
- Font optimization and preloading
- Middleware for request transformation
- Analytics and monitoring built-in

### Analytics & Monitoring

**Vercel Analytics**
- Real User Monitoring (RUM) for performance metrics
- Core Web Vitals tracking
- JavaScript error tracking
- Real-time dashboard for site health

**Google Analytics**
- User behavior tracking and flow analysis
- Conversion tracking for contact form submissions
- Traffic source attribution
- Device and browser analytics

**Google Search Console**
- Search query performance monitoring
- Click-through rate (CTR) optimization insights
- Indexing coverage reports
- Mobile usability issues detection

---

## Development Workflow

### Local Development
```bash
npm run dev              # Start development server with HMR
npm run build           # Production build
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Git Workflow
- Feature branches from `dev` for development
- Pull requests to `dev` for code review
- Merge to `main` for production deployment
- Semantic commit messages with co-author attribution

### Environment Setup
```
.env.local
├── NEXT_PUBLIC_SITE_URL=http://localhost:3000
├── SUPABASE_URL=...
├── SUPABASE_ANON_KEY=...
└── GOOGLE_ANALYTICS_ID=...
```

---

## Content Strategy

### Blog Platform Options

**Option 1: Static MDX Files**
- Files in `/app/blog/` with YAML frontmatter
- Pre-rendered at build time
- Fast, no external dependencies
- Perfect for technical blogs and documentation

**Option 2: Supabase Backend**
- Dynamic content management
- Real-time updates without rebuilds
- Editor interface for non-technical users
- Enables comment systems and user interactions

**Current Setup:** Hybrid approach with static MDX as primary, Supabase available for extended functionality.

### Social Sharing
- Open Graph images for rich previews
- Twitter Card tags for X/Twitter
- LinkedIn-optimized meta tags
- Automatic sharing metadata for all pages

---

## Security & Best Practices

### Security Measures
- Environment variables for sensitive data (never committed)
- HTTPS-only deployment
- Content Security Policy (CSP) headers
- Automatic security headers via Vercel

### Code Quality
- TypeScript for type safety
- ESLint for code style enforcement
- Pre-commit hooks (optional) for quality gates
- Dependency scanning for vulnerabilities

### Accessibility
- WCAG AA compliance
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` respect for animations

---

## Monitoring & Maintenance

### Key Metrics to Track
- **Core Web Vitals** - LCP, FID, CLS for user experience
- **Search Rankings** - Target keywords and positions in Google
- **User Engagement** - Bounce rate, time on page, conversion rate
- **Performance** - Page load time, Time to First Byte (TTFB)
- **Errors** - JavaScript errors, API failures, 404s

### Maintenance Schedule
- Weekly: Monitor Google Search Console for new issues
- Monthly: Review analytics and performance metrics
- Quarterly: Update dependencies and security patches
- As needed: Content updates and feature additions

---

## Future Enhancements

Potential additions for portfolio evolution:
- Comment system for blog posts
- Newsletter subscription integration
- Project showcase with live demos
- Speaking engagements and conference calendar
- Resume download functionality
- LinkedIn profile integration
- GitHub activity feed
- Case studies with detailed breakdowns

---

## Resources & Documentation

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Deployment:** https://vercel.com/docs
- **Supabase:** https://supabase.com/docs
- **Google Search Console:** https://support.google.com/webmasters

---

**Last Updated:** 2026-09-19  
**Version:** 1.0.0  
**Maintained by:** Slavi Dimitrov
