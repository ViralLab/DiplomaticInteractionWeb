import React from 'react';
import CountryFlag from '@/components/countries/countryFlag';

const CountryTooltip = ({ country }) => {
  if (!country) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '12px 16px',
        boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        maxWidth: '220px',
        height: 'auto',
        minHeight: 'auto',
        overflow: 'hidden'
      }}
    >
      <CountryFlag name={country.name} countryCode={country.code} />
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
          {country.name}
        </div>
        <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
          Click for details
        </div>
      </div>
    </div>
  );
};

export default CountryTooltip;
