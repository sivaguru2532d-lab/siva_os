export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  image?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

// Keep portfolio content here until an authenticated CMS or API is connected.
// The optional asset and link fields map directly to nullable backend fields.
export const projects: Project[] = [
  {
    id: 'portfolio-website',
    name: 'Personal Portfolio Website',
    description: 'A modern, dark glassmorphism personal portfolio built with React, TypeScript, and Tailwind CSS featuring smooth animations and interactive components.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/portfolio-website.webp',
    githubUrl: 'https://github.com/sivaguru2532d-lab/Siva',
    liveUrl: 'https://sivaguru-portfolio.vercel.app',
    featured: true,
    status: 'completed',
  },
  {
    id: 'task-manager',
    name: 'Task Management App',
    description: 'A full-stack task management application with real-time collaboration, user authentication, and drag-and-drop task boards.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: '/projects/task-manager.webp',
    githubUrl: 'https://github.com/sivaguru2532d-lab/task-manager',
    liveUrl: null,
    featured: false,
    status: 'in-progress',
  },
  {
    id 'data-visualization-dashboard',
    name: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing analytics data with custom charts, filters, and export functionality.',
    technologies: ['React', 'D3.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/dashboard.webp',
    githubUrl: 'https://github.com/sivaguru2532d-lab/dashboard',
    liveUrl: 'https://dashboard-demo.vercel.app',
    featured: true,
    status: 'completed',
  },
];
