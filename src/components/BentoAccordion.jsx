import React from 'react';

const FEATURES = [
  {
    title: "High-Throughput Orchestrator",
    desc: "Coordinate thousands of concurrent ETL workflows with microsecond latency. Built-in backpressure handling and queue virtualization ensure stable performance under heavy load spikes.",
    tag: "CORE ENGINE",
    colspan: "card-colspan-8",
    icon: (
      <svg className="bento-card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    visual: (
      <div className="pipeline-flow" style={{ marginTop: '16px' }}>
        <div className="flow-node active">
          <svg className="node-icon" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div className="node-name">Ingest</div>
        </div>
        <div className="flow-connector">
          <div className="connector-pulse"></div>
        </div>
        <div className="flow-node active">
          <svg className="node-icon" viewBox="0 0 24 24">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div className="node-name">Process</div>
        </div>
        <div className="flow-connector">
          <div className="connector-pulse" style={{ animationDelay: '0.8s' }}></div>
        </div>
        <div className="flow-node">
          <svg className="node-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div className="node-name">Deliver</div>
        </div>
      </div>
    )
  },
  {
    title: "Live Telemetry Logs",
    desc: "Stream real-time trace summaries directly inside your console. Diagnose anomalies instantly using dev-friendly formats.",
    tag: "DIAGNOSTICS",
    colspan: "card-colspan-4",
    icon: (
      <svg className="bento-card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20h9M3 20v-8c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v8M3 10V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    visual: (
      <div className="bento-visual code-block" style={{ height: '110px' }}>
        <div><span className="code-comment">// stdout log trace</span></div>
        <div><span className="code-keyword">fetch</span> <span className="code-string">"api.aetherflow.io/v1/jobs"</span></div>
        <div>Status: <span className="code-number">200 OK</span> <span className="code-comment">(4ms)</span></div>
        <div>Queue: <span className="code-string">"active_workers"</span> = <span className="code-number">124</span></div>
      </div>
    )
  },
  {
    title: "Schema Detection",
    desc: "Automatic JSON structure mapping and mutation tracking. Detect breaking database changes before they crash downstream consumers.",
    tag: "METADATA",
    colspan: "card-colspan-4",
    icon: (
      <svg className="bento-card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    visual: (
      <div className="bento-visual code-block" style={{ height: '110px' }}>
        <div>{`{`}</div>
        <div style={{ paddingLeft: '12px' }}><span className="code-string">"userId"</span>: <span className="code-keyword">uuid</span>,</div>
        <div style={{ paddingLeft: '12px' }}><span className="code-string">"role"</span>: <span className="code-string">"admin"</span> <span className="code-comment">/* verified */</span></div>
        <div>{`}`}</div>
      </div>
    )
  },
  {
    title: "Multi-Region Redundancy",
    desc: "Geographically isolated cluster sync prevents data loss. Active-active failovers ensure zero downtime across North America, Europe, and Asia Pacific.",
    tag: "RELIABILITY",
    colspan: "card-colspan-8",
    icon: (
      <svg className="bento-card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 5.66 2.34L12 12V4zm-5.66 3.66A8 8 0 0 1 12 6v6H6a8 8 0 0 1 .34-2.34z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    visual: (
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <div className="bento-visual" style={{ textAlign: 'left', flex: 1 }}>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>US-EAST</div>
          <div style={{ color: '#27c93f', fontWeight: 'bold' }}>1.2ms</div>
        </div>
        <div className="bento-visual" style={{ textAlign: 'left', flex: 1 }}>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>EU-WEST</div>
          <div style={{ color: '#27c93f', fontWeight: 'bold' }}>1.8ms</div>
        </div>
        <div className="bento-visual" style={{ textAlign: 'left', flex: 1 }}>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>AP-SOUTH</div>
          <div style={{ color: '#ffd233', fontWeight: 'bold' }}>12ms</div>
        </div>
      </div>
    )
  },
  {
    title: "Self-Healing Workflows",
    desc: "Autonomous pipeline recovery resolves 90% of connectivity dropouts. Automatically replays failed runs, applies rate limiting, and notifies on sustained faults.",
    tag: "AUTONOMOUS",
    colspan: "card-colspan-12",
    icon: (
      <svg className="bento-card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    visual: (
      <div className="bento-visual code-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#ff5f56', fontWeight: 'bold' }}>[ERR] Connection Timeout</span>
          <br />
          <span style={{ color: '#27c93f' }}>[RETRY] Re-establishing node connection... Success!</span>
        </div>
        <div style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(39, 201, 63, 0.1)', color: '#27c93f', border: '1px solid rgba(39, 201, 63, 0.3)', fontFamily: 'var(--font-mono)' }}>
          RESOLVED
        </div>
      </div>
    )
  }
];

export default function BentoAccordion({ activeIndex, setActiveIndex }) {
  // We receive activeIndex and setActiveIndex from parent state, ensuring seamless transition locked synchronization.
  return (
    <div className="bento-container">
      {/* Desktop View (Bento Grid) */}
      <div className="bento-wrapper">
        <div className="bento-grid">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className={`bento-card ${feature.colspan} ${activeIndex === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                  <span className="section-tag" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>{feature.tag}</span>
                  <h3 className="bento-card-title">{feature.title}</h3>
                  <p className="bento-card-desc">{feature.desc}</p>
                </div>
                {feature.icon}
              </div>
              {feature.visual}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View (Accordion List) */}
      <div className="accordion-wrapper">
        {FEATURES.map((feature, idx) => (
          <div 
            key={idx} 
            className={`accordion-item ${activeIndex === idx ? 'active' : ''}`}
          >
            <div 
              className="accordion-header"
              onClick={() => setActiveIndex(idx)}
            >
              <div className="accordion-title-block">
                {React.cloneElement(feature.icon, { className: 'accordion-icon' })}
                <span className="accordion-title">{feature.title}</span>
              </div>
              <svg className="accordion-chevron" viewBox="0 0 24 24">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div 
              className="accordion-content" 
              style={{ maxHeight: activeIndex === idx ? '350px' : '0px' }}
            >
              <div className="accordion-content-inner">
                <p className="bento-card-desc">{feature.desc}</p>
                {feature.visual}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
