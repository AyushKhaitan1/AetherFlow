import React, { useRef, useEffect, useState } from 'react';

const REGIONAL_CONFIG = {
  USD: { symbol: '$', rate: 1.0, tariff: 1.0 },
  EUR: { symbol: '€', rate: 0.92, tariff: 1.0 },
  INR: { symbol: '₹', rate: 83.5, tariff: 0.4 } // 0.4 PPP tariff adjustment
};

const BASE_TIERS = {
  starter: 19,
  pro: 49,
  enterprise: 149
};

const TIER_FEATURES = {
  starter: [
    '5,000 automated runs / mo',
    '1 connected data source',
    'Standard latency queues',
    'Email support'
  ],
  pro: [
    '50,000 automated runs / mo',
    '5 connected data sources',
    'High-priority execution queues',
    '24/7 Slack support',
    'Advanced analytics dashboard'
  ],
  enterprise: [
    'Unlimited automated runs',
    'Unlimited connections',
    'Isolated performance queues',
    'Dedicated account manager',
    'Custom SLA & SOC2 compliance'
  ]
};

// Isolated Billing Toggle component to avoid parent re-renders
function BillingToggle({ onChange }) {
  const [cycle, setCycle] = useState('monthly');

  const handleToggle = (val) => {
    setCycle(val);
    onChange(val);
  };

  return (
    <div className="toggle-container">
      <button 
        type="button"
        className={`toggle-btn ${cycle === 'monthly' ? 'active' : ''}`}
        onClick={() => handleToggle('monthly')}
      >
        Monthly
      </button>
      <button 
        type="button"
        className={`toggle-btn ${cycle === 'annual' ? 'active' : ''}`}
        onClick={() => handleToggle('annual')}
      >
        Annual (20% off)
      </button>
    </div>
  );
}

// Isolated Currency Switcher component to avoid parent re-renders
function CurrencySwitcher({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('USD');
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (curr) => {
    setSelected(curr);
    setOpen(false);
    onChange(curr);
  };

  return (
    <div className={`dropdown-container ${open ? 'open' : ''}`} ref={containerRef}>
      <div 
        className="dropdown-selected" 
        onClick={() => setOpen(!open)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
      >
        <span>{selected}</span>
        <svg className="dropdown-selected-arrow" viewBox="0 0 24 24">
          <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="dropdown-options" role="listbox">
        {['USD', 'EUR', 'INR'].map((curr) => (
          <div 
            key={curr} 
            className={`dropdown-option ${selected === curr ? 'selected' : ''}`}
            onClick={() => handleSelect(curr)}
            role="option"
            aria-selected={selected === curr}
          >
            {curr}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  const currentCurrency = useRef('USD');
  const currentBilling = useRef('monthly');

  const priceRefs = {
    starter: useRef(null),
    pro: useRef(null),
    enterprise: useRef(null)
  };

  const detailRefs = {
    starter: useRef(null),
    pro: useRef(null),
    enterprise: useRef(null)
  };

  const updatePrices = () => {
    const currency = currentCurrency.current;
    const billing = currentBilling.current;
    const config = REGIONAL_CONFIG[currency];

    Object.keys(BASE_TIERS).forEach((tierId) => {
      const base = BASE_TIERS[tierId];
      // Formula: basePrice * ExchangeRate * RegionalTariff
      let calculated = base * config.rate * config.tariff;
      
      let priceStr = '';
      let detailStr = '';

      if (billing === 'annual') {
        // 20% discount (0.8 multiplier)
        const pricePerMonth = calculated * 0.8;
        priceStr = `${config.symbol}${Math.round(pricePerMonth)}`;
        const totalYearly = Math.round(pricePerMonth * 12);
        detailStr = `Billed annually (${config.symbol}${totalYearly.toLocaleString()}/yr)`;
      } else {
        priceStr = `${config.symbol}${Math.round(calculated)}`;
        detailStr = 'Billed monthly';
      }

      if (priceRefs[tierId].current) {
        priceRefs[tierId].current.textContent = priceStr;
      }
      if (detailRefs[tierId].current) {
        detailRefs[tierId].current.textContent = detailStr;
      }
    });
  };

  // Run initial configuration update on load
  useEffect(() => {
    updatePrices();
  }, []);

  return (
    <div className="pricing-container">
      <div className="pricing-controls">
        <BillingToggle onChange={(val) => {
          currentBilling.current = val;
          updatePrices();
        }} />
        <CurrencySwitcher onChange={(val) => {
          currentCurrency.current = val;
          updatePrices();
        }} />
      </div>

      <div className="pricing-grid">
        {/* Starter Card */}
        <div className="pricing-card">
          <div className="pricing-header">
            <h3 className="pricing-name">Starter</h3>
            <div className="price-wrapper">
              <span ref={priceRefs.starter} className="price-amount">$19</span>
              <span className="price-period">/mo</span>
            </div>
            <p ref={detailRefs.starter} className="billing-detail">Billed monthly</p>
          </div>
          <div className="pricing-divider"></div>
          <ul className="pricing-features">
            {TIER_FEATURES.starter.map((f, i) => (
              <li key={i} className="pricing-feature">
                <svg className="pricing-feature-icon" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-secondary" style={{ width: '100%' }}>
            Deploy Sandbox
          </button>
        </div>

        {/* Pro Card (Popular) */}
        <div className="pricing-card popular">
          <div className="popular-badge">Most Popular</div>
          <div className="pricing-header">
            <h3 className="pricing-name">Pro</h3>
            <div className="price-wrapper">
              <span ref={priceRefs.pro} className="price-amount">$49</span>
              <span className="price-period">/mo</span>
            </div>
            <p ref={detailRefs.pro} className="billing-detail">Billed monthly</p>
          </div>
          <div className="pricing-divider"></div>
          <ul className="pricing-features">
            {TIER_FEATURES.pro.map((f, i) => (
              <li key={i} className="pricing-feature">
                <svg className="pricing-feature-icon" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
            Upgrade to Pro
          </button>
        </div>

        {/* Enterprise Card */}
        <div className="pricing-card">
          <div className="pricing-header">
            <h3 className="pricing-name">Enterprise</h3>
            <div className="price-wrapper">
              <span ref={priceRefs.enterprise} className="price-amount">$149</span>
              <span className="price-period">/mo</span>
            </div>
            <p ref={detailRefs.enterprise} className="billing-detail">Billed monthly</p>
          </div>
          <div className="pricing-divider"></div>
          <ul className="pricing-features">
            {TIER_FEATURES.enterprise.map((f, i) => (
              <li key={i} className="pricing-feature">
                <svg className="pricing-feature-icon" viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-secondary" style={{ width: '100%' }}>
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
