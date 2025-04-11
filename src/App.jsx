import { lazy, Suspense } from 'react';
import './app.scss';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/navbar/Navbar'));
const Hero = lazy(() => import('./components/hero/Hero'));
const WorkExperience = lazy(() => import('./components/workExperience/WorkExperience'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const Tools = lazy(() => import('./components/tools/Tools'));
const Services = lazy(() => import('./components/services/Services'));
const Contact = lazy(() => import('./components/contact/Contact'));

// Simple loading component
const LoadingPlaceholder = () => (
  <div className="loading-placeholder" style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0a0a18 0%, #121229 100%)'
  }}>
    <div className="spinner"></div>
  </div>
);

const App = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<LoadingPlaceholder />}>
        <section id="hero">
          <Navbar />
          <Hero />
        </section>
        
        <section id="work">
          <WorkExperience />
        </section>
        
        <section id="portfolio">
          <Portfolio />
        </section>
        
        <section id="tools">
          <Tools />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </Suspense>
    </div>
  );
};

export default App;