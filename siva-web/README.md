# Portfolio website

This folder contains the React and TypeScript application for SIVA.OS, SIVAGURU M's personal portfolio. It presents his education, skills, projects, certificates, resume availability, and contact links.

## Requirements

- Node.js 18 or later
- npm

## Development

From this directory, install the locked dependencies and start Vite:

```bash
npm ci
npm run dev
```

The development server prints its local URL when it starts.

## Build and preview

```bash
npm run build
npm run preview
```

`npm run build` runs the TypeScript compiler before producing the static site in `dist/`.

## Content and assets

Update portfolio details in `src/data/`:

- `personal.ts` — name, role, biography, education, and profile image path
- `skills.ts` — skills and learning levels
- `projects.ts` — project descriptions, technologies, and destination links
- `certificates.ts` — certificate records; add verified details only
- `social.ts` — social and contact links
- `resume.ts` — resume file metadata; set it only when a real resume is available

Place public assets in `public/` and refer to them by a root-relative path, such as `/profile.jpg`.

## Technology

React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide React.

For repository overview, project layout, and contact links, see the [repository README](../README.md).
