import React from 'react';

const SectionComponent = ({ text, heading, subheading, children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ 
          marginBottom: '20px', 
          border: '1px solid #0000002A',
          borderRadius: '10px',
          padding: '5px',
          backgroundColor: '#f9f9f9',
          fontSize:'11px',
        }}>
        <p style={{ padding: '0 5px', margin: '0' }}>{text}</p>
      </div>

      <div>
        <p style={{ fontSize: '50px' }}>{heading}</p>
      </div>

      <div style={{ marginBottom: '40px', maxWidth: '600px', textAlign: 'center' }}>
        <h3 style={{ margin: '0', wordWrap: 'break-word' }}>{subheading}</h3> {/* Props used here */}
      </div>

      <div style={{ width: '100%', marginBottom: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

export default SectionComponent;
