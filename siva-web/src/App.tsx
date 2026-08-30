import { Fragment } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground, CustomCursor } from '@/components/ui';
import { Hero, About, Skills, Projects, Certificates, Resume, Contact } from '@/components/sections';

export function App() {
  return (
    <Fragment>
      <AnimatedBackground />
      <CustomCursor enabled />
      <Navigation />

      <main className="relative z-10 min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </Fragment>
  );
}
