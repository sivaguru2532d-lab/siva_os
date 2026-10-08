# SIVA.OS — SIVAGURU M's Portfolio

SIVA.OS is my personal portfolio: a place to share what I'm learning, the projects I'm building, and my journey as an Information Technology student.

I'm pursuing a B.Tech in Information Technology at **SRM Valliammai Engineering College**. I enjoy learning by building, exploring web development and emerging technologies, and improving with every project.

## Portfolio

The site brings together my introduction, education, skills, projects, certificates, resume information, and contact links in one responsive experience.

**Built with:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

```powershell
cd siva-web
npm ci
npm run dev
```

To create and preview a production build:

```powershell
npm run build
npm run preview
```

The build output is written to `siva-web/dist/`.

## Project structure

```text
siva-web/
├── public/                 # Static assets
└── src/
    ├── components/
    │   ├── layout/         # Navigation, footer, and section layout
    │   ├── sections/       # Portfolio page sections
    │   └── ui/             # Reusable interface components
    ├── data/               # Personal, skills, project, and contact content
    ├── App.tsx
    └── index.css
```

## Update portfolio content

Portfolio content is kept in `siva-web/src/data/`:

| File | Content |
| --- | --- |
| `personal.ts` | Name, title, biography, education, and profile image |
| `skills.ts` | Skills and self-reported learning levels |
| `projects.ts` | Project descriptions, technologies, and links |
| `certificates.ts` | Verified certificate details |
| `social.ts` | Social profile and contact links |
| `resume.ts` | Resume file details, when a real PDF is available |

Add only accurate, verifiable information and update the relevant data file. Static images belong in `siva-web/public/`.

## Contact

- **Email:** [sivaguru2532d@gmail.com](mailto:sivaguru2532d@gmail.com)
- **GitHub:** [sivaguru2532d-lab](https://github.com/sivaguru2532d-lab)
- **LinkedIn:** [Sivaguru M](https://www.linkedin.com/in/siva-guru-m-b84175370)
- **Portfolio:** [sivaguru-portfolio-two.vercel.app](https://sivaguru-portfolio-two.vercel.app/)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
