# Portfolio Project - Claude Guide

## Project Overview
A modern, responsive portfolio website for Zachary Habib built with React, TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Language**: TypeScript 5.9.3
- **Linting**: ESLint 9.39.1

## Project Structure
```
portfolio/
├── src/
│   ├── App.tsx           # Main component with all sections
│   ├── index.css         # Global styles and Tailwind import
│   └── main.tsx          # App entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Current Sections
The portfolio currently has a single-page layout with these sections:
1. **Hero** - Name, title, and tagline
2. ~~About~~ - Currently removed
3. ~~Work Experience~~ - Currently removed
4. ~~Projects~~ - Currently removed
5. ~~Contact~~ - Currently removed
6. ~~Footer~~ - Currently removed

## Styling Approach
- All styling is done with Tailwind CSS utility classes
- No component-specific CSS files
- `index.css` contains only:
  - Tailwind import
  - Global CSS reset
  - Smooth scrolling
  - Base font settings

## Customization Guide

### Adding Sections Back
The user has simplified the page to just the hero section. To add sections back, refer to git history or recreate as needed.

### Color Scheme
- Primary gradient: blue-400 to purple-500
- Background: slate-900/800
- Text: slate-300/400
- Accents: blue-600

### Responsive Breakpoints
- Mobile: default
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

## Key Features
- Smooth scrolling navigation
- Responsive design
- Modern gradient backgrounds
- Clean, minimal UI
- Full Tailwind CSS integration

## Notes for Future Development
- All sections are self-contained in App.tsx
- Easy to add/remove sections by editing App.tsx
- Tailwind v4 uses `bg-linear-to-*` instead of `bg-gradient-to-*`
- Contact links need to be updated with real URLs/emails
