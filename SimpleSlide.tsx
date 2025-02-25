import * as React from 'react';

function SimpleSlide() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Simple Test Slide</h1>
    </div>
  );
}

export { SimpleSlide as default }; 