import { useState } from 'react';
import { FloatButton, Tooltip } from 'antd';

const ColorTheme = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        bottom: 76,
        zIndex: 1000,
      }}
    >
        <FloatButton              
        style={{
          position: 'absolute',
          right: isOpen ? 150 : 0,
          bottom: 0,
          transition: 'right 0.3s',
        }}
      />
      <FloatButton    
          style={{            
          position: 'absolute',
          right: isOpen ? 100 : 0,
          bottom: 0,
          transition: 'right 0.3s',
        }}
      />
      <FloatButton              
        style={{
          position: 'absolute',
          right: isOpen ? 50 : 0,
          bottom: 0,
          transition: 'right 0.3s',
        }}
      />
      <FloatButton        
        type='primary'        
        onClick={handleToggle}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
      />
      
    </div>
  );
};

export default ColorTheme;