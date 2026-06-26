import { useState, useEffect } from 'react';
import BentoAccordion from './components/BentoAccordion';
import Pricing from './components/Pricing';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bentoActiveIndex, setBentoActiveIndex] = useState(0);
  const [heroActiveNode, setHeroActiveNode] = useState(0);

  // Auto-cycle the active node in the Hero pipeline visualization
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroActiveNode((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Performance entry loader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // 300ms guarantees execution within the strict 500ms timeline
    return () => clearTimeout(timer);
  }, []);

  // Scroll to section handler
  const handleScroll = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Entry Performance Loader */}
      {loading && (
        <div className="loader-overlay" style={{ opacity: loading ? 1 : 0 }}>
          <div className="loader-spinner">
            <svg className="spinner-icon" viewBox="0 0 24 24">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
            <div className="loader-text">INITIALIZING ENGINE...</div>
          </div>
        </div>
      )}

      {/* Header / Navigation */}
      <header className="header">
        <div className="container nav-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <svg className="logo-icon" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>AETHERFLOW</span>
          </a>

          <nav className="nav-menu">
            <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('features'); }}>Features</a>
            <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('pricing'); }}>Pricing</a>
            <a href="#social" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('social'); }}>Testimonials</a>
            <button type="button" className="btn btn-primary" onClick={() => handleScroll('pricing')}>Get Started</button>
          </nav>

          <button 
            type="button"
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('features'); }}>Features</a>
        <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('pricing'); }}>Pricing</a>
        <a href="#social" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('social'); }}>Testimonials</a>
        <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleScroll('pricing')}>Get Started</button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-glow"></div>
          <div className="container">
            <div className="hero-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>AETHERFLOW ENGINE 2.0</span>
            </div>
            
            <h1 className="hero-title">
              AI-Driven Data Automation at Scale
            </h1>
            
            <p className="hero-desc">
              Choreograph distributed ETL streams, parse schemas automatically, and deploy self-healing database nodes in micro-seconds.
            </p>
            
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => handleScroll('pricing')}>
                Deploy Sandbox Pipeline
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => handleScroll('features')}>
                Read Documentation
              </button>
            </div>

            {/* Interactive Pipeline Visualization */}
            <div className="hero-preview">
              <div className="preview-header">
                <div className="window-dots">
                  <div className="window-dot red"></div>
                  <div className="window-dot yellow"></div>
                  <div className="window-dot green"></div>
                </div>
                <div className="preview-title">orchestrator_live_telemetry.log</div>
                <div style={{ width: '36px' }}></div>
              </div>
              
              <div className="pipeline-flow">
                <div className={`flow-node ${heroActiveNode === 0 ? 'active' : ''}`}>
                  <svg className="node-icon" viewBox="0 0 24 24">
                    <path d="M12 3v18M5 10l7-7 7 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="node-name">INGEST_STREAM</div>
                </div>
                
                <div className="flow-connector">
                  {heroActiveNode === 0 && <div className="connector-pulse"></div>}
                </div>
                
                <div className={`flow-node ${heroActiveNode === 1 ? 'active' : ''}`}>
                  <svg className="node-icon" viewBox="0 0 24 24">
                    <path d="M4.5 12h15M12.75 4.5l7.5 7.5-7.5 7.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="node-name">TRANSFORM_AI</div>
                </div>
                
                <div className="flow-connector">
                  {heroActiveNode === 1 && <div className="connector-pulse"></div>}
                </div>
                
                <div className={`flow-node ${heroActiveNode === 2 ? 'active' : ''}`}>
                  <svg className="node-icon" viewBox="0 0 24 24">
                    <path d="M12 3L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="node-name">DELIVER_NODES</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Section */}
        <section id="features" className="bento-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Features</span>
              <h2 className="section-title">Engineered for Technical Integrity</h2>
              <p className="section-desc">
                From low-latency scheduling to geo-replicated fallbacks, explore the infrastructure driving the AetherFlow platform.
              </p>
            </div>

            <BentoAccordion activeIndex={bentoActiveIndex} setActiveIndex={setBentoActiveIndex} />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pricing-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Pricing</span>
              <h2 className="section-title">Matrix-Driven Regional Billing</h2>
              <p className="section-desc">
                Scale your flows. Pay with purchasing power parity (PPP) adjustments across major global regions.
              </p>
            </div>

            <Pricing />
          </div>
        </section>

        {/* Testimonials / Social Proof Section */}
        <section id="social" className="social-proof section-padding">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Social Proof</span>
              <h2 className="section-title">Trusted by Modern Web Engineers</h2>
              <p className="section-desc">
                Here is what lead developers say about migrating their telemetry pipelines to AetherFlow.
              </p>
            </div>

            <div className="social-grid">
              <div className="social-card">
                <div className="social-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star-icon" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="social-quote">
                  "AetherFlow cut our data pipeline latency by 80%. The self-healing mechanisms automatically recover broken database nodes without waking our on-call engineers."
                </p>
                <div className="social-author">
                  <div className="author-avatar">AM</div>
                  <div className="author-info">
                    <div className="author-name">Alex Mercer</div>
                    <div className="author-role">Director of Infrastructure, CloudCore</div>
                  </div>
                </div>
              </div>

              <div className="social-card">
                <div className="social-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star-icon" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="social-quote">
                  "We were blown away by the billing transparency. The purchasing power parity pricing model let us scale regional clusters in India and Europe at fair rates."
                </p>
                <div className="social-author">
                  <div className="author-avatar">SK</div>
                  <div className="author-info">
                    <div className="author-name">Sanjay K.</div>
                    <div className="author-role">Lead DevOps Architect, BharatVibe</div>
                  </div>
                </div>
              </div>

              <div className="social-card">
                <div className="social-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star-icon" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="social-quote">
                  "Building custom ETL flows was historically a headache. AetherFlow's live telemetry and schema detection made integration simple and extremely robust."
                </p>
                <div className="social-author">
                  <div className="author-avatar">EL</div>
                  <div className="author-info">
                    <div className="author-name">Elena Lindqvist</div>
                    <div className="author-role">Chief Technical Officer, NordSync</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-info">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <svg className="logo-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>AETHERFLOW</span>
            </a>
            <p className="footer-copy">&copy; {new Date().getFullYear()} AetherFlow Technologies Inc. All rights reserved.</p>
          </div>
          
          <div className="footer-links">
            <a href="#features" className="footer-link" onClick={(e) => { e.preventDefault(); handleScroll('features'); }}>Features</a>
            <a href="#pricing" className="footer-link" onClick={(e) => { e.preventDefault(); handleScroll('pricing'); }}>Pricing</a>
            <a href="#social" className="footer-link" onClick={(e) => { e.preventDefault(); handleScroll('social'); }}>Testimonials</a>
          </div>

          <div className="footer-status">
            <span className="status-dot"></span>
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </>
  );
}
