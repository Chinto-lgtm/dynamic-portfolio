import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Qualifications } from '../components/Qualifications';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Portfolio = () => {
  return (
    // "min-vh-100" is Bootstrap for "min-height: 100vh"
    // "d-flex flex-column" ensures the footer stays at the bottom if content is short
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Hero />
      <About />
      <Qualifications />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};