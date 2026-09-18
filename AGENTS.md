<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Slavi's Portfolio - Development Guidelines

## Project Overview
This is a personal portfolio website built with Next.js 15+ showcasing Slavi Dimitrov's work as a fullstack developer. The site emphasizes clean design, accessibility, and performance while representing expertise in React, Vue, Django, and PostgreSQL.

## Architecture & Conventions

### File Structure
- **`app/`** - Next.js App Router pages (home, about, experience, blog, projects, contact)
- **`src/components/`** - Reusable UI components
- **`src/styles/`** - Global styles and Tailwind configuration
- **`src/data/`** - Static content data and constants
- **`public/images/`** - Static assets (profile photos, project screenshots)
- **`src/assets/`** - Source assets before optimization

### Styling
- **Tailwind CSS** for utility-first styling
- **Dark mode support** via `dark:` classes throughout
- **Mobile-first responsive design** using `sm:`, `md:`, `lg:` breakpoints
- Color palette: zinc/black/white for text, accent colors for highlights

### Component Guidelines
- Functional components only (no class components)
- Use TypeScript for type safety
- Keep components focused and single-responsibility
- Extract hardcoded content to data files in `src/data/`
- All interactive components should have proper accessibility attributes

## Content Management

### Portfolio Content
- **Projects** - Stored in `src/data/projects.ts`, displayed on projects page
- **Blog posts** - Located in `app/blog/`, supports MDX with frontmatter
- **Experience/Skills** - Stored in `src/data/experience.ts`
- **Navigation** - Menu links defined in a constants file for easy updates

### Images & Assets
- Profile photos go in `public/images/`
- Optimize images before adding (use tools like imagemin or squoosh)
- Use Next.js `<Image>` component for all product images
- Provide proper alt text for accessibility

## UI/UX Principles

### Design Expectations
- **Minimalist aesthetic** - Clean, professional, not overdone
- **High contrast** - Ensure readability in both light and dark modes
- **Performance first** - Lazy load images, optimize bundle size
- **Accessibility** - WCAG AA compliant, semantic HTML
- **Micro-interactions** - Subtle animations that enhance, not distract

### Animation Best Practices
- Use CSS animations for hover states and transitions
- Framer Motion for complex component animations (if needed)
- Keep animations under 300ms for snappy feel
- Respect `prefers-reduced-motion` for accessibility
- Animate entrance of page sections on scroll

## Development Workflow

### Before Writing Code
1. Check data files first - content might already exist
2. Review component library - don't duplicate components
3. Check dark mode - add `dark:` classes alongside regular classes
4. Test on mobile - use dev tools viewport emulation

### Common Tasks
- **Adding a new project**: Update `src/data/projects.ts`, create project page
- **New blog post**: Create `.mdx` file in `app/blog/` with frontmatter
- **Styling changes**: Prefer Tailwind utilities over custom CSS
- **Testing changes**: Verify in both light and dark modes on mobile/desktop

### Git Workflow
- Branch from `dev` for features
- Create PRs to `dev` for code review
- Keep commits atomic and descriptive
- Include "Co-Authored-By: Claude Haiku 4.5" in commit messages

## Performance Checklist
- [ ] Images optimized and using Next.js Image component
- [ ] No unnecessary dependencies added
- [ ] Dark mode tested and working
- [ ] Mobile responsive (test at 375px width)
- [ ] Console has no errors or warnings
- [ ] Lighthouse score maintained above 90

## Known Patterns

### Dark Mode Implementation
All text and backgrounds should have dark mode variants:
```jsx
<p className="text-black dark:text-white">
  Light mode text with dark mode fallback
</p>
```

### Section Containers
Use `PageSection` component for consistent styling:
```jsx
<PageSection eyebrow="SECTION" title="Section Title">
  Content here
</PageSection>
```

### Links & Navigation
Use Next.js `Link` component for internal navigation, styled with Tailwind classes.

## Contact & Questions
When in doubt about design decisions:
- Check existing components for patterns
- Review the live site to understand current aesthetic
- Test changes in browser before committing
