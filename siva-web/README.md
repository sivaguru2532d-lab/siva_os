# SIVAGURU M - Personal Portfolio

A premium, modern, fully responsive personal portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Dark Glassmorphism Design** - Deep black backgrounds, glass panels, subtle gradients
- **Smooth Animations** - Entrance animations, scroll reveals, magnetic buttons, custom cursor
- **Fully Responsive** - Mobile-first design that works on all devices
- **Accessible** - Semantic HTML, keyboard navigation, reduced motion support
- **Easy to Customize** - Centralized data files for all content
- **Project Management** - Add/edit/remove projects via data file
- **Certificate Management** - Add/edit/remove certificates via data file
- **Resume Upload** - Upload and replace PDF resume
- **Profile Image** - Easy to replace profile image

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── GlassCard.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── TiltCard.tsx
│   │   ├── Tag.tsx
│   │   └── SocialIcon.tsx
│   ├── layout/             # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── SectionWrapper.tsx
│   └── sections/           # Page sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Certificates.tsx
│       ├── Resume.tsx
│       └── Contact.tsx
├── data/                   # Centralized data configuration
│   ├── personal.ts         # Personal info, bio, education
│   ├── skills.ts           # Skills with proficiency levels
│   ├── projects.ts         # Projects data
│   ├── certificates.ts     # Certificates data
│   ├── social.ts           # Social links & contact info
│   └── resume.ts           # Resume data
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles & Tailwind
```

## Customization Guide

### 1. Personal Information
Edit `src/data/personal.ts`:
- Name, title, bio, about text
- Education details
- Profile image path (replace `/public/profile.jpg`)

### 2. Skills
Edit `src/data/skills.ts`:
- Add/remove skills
- Set proficiency: `Familiar`, `Intermediate`, `Learning`
- Categories: `Language`, `Tool`, `Framework`, `Other`

### 3. Projects
Edit `src/data/projects.ts`:
```typescript
{
  id: 'unique-id',
  name: 'Project Name',
  description: 'Project description',
  technologies: ['React', 'TypeScript'],
  image: '/projects/project1.jpg',  // Add image to public/projects/
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://project.demo.com',
  featured: true,
  status: 'completed'  // 'completed' | 'in-progress' | 'planned'
}
```

### 4. Certificates
Edit `src/data/certificates.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Certificate Name',
  organization: 'Issuer',
  date: '2024',
  image: '/certificates/cert1.jpg',
  credentialUrl: 'https://verify.com/...',
  description: 'Optional description'
}
```

### 5. Social Links
Edit `src/data/social.ts`:
- Update URLs for GitHub, LinkedIn, Instagram, Email
- Phone number in contactInfo

### 6. Resume
- Upload PDF via the Resume section (max 5MB)
- Or replace `/public/resume.pdf` and update `src/data/resume.ts`

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the 'dist' folder
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from 'dist' folder
```

## Design System

### Colors
- Background: `#030303` (deep black)
- Glass: `rgba(255, 255, 255, 0.03)`
- Text Primary: `#fafafa`
- Text Secondary: `#a3a3a3`
- Accent: White with opacity variations

### Typography
- Font: Inter (headings & body)
- Mono: JetBrains Mono (code)

### Animations
- Respects `prefers-reduced-motion`
- Smooth spring transitions
- Staggered entrance animations

## Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy (h1-h6)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast ratios (WCAG AA)
- Reduced motion support

## Performance

- Lazy-loaded images
- Code splitting with React.lazy/Suspense
- Optimized animations (transform/opacity only)
- No heavy dependencies
- Tree-shaking enabled

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Feel free to use for your own portfolio.

## Credits

Built with:
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- Vite