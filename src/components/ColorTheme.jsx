import { useState, useContext } from 'react';
import { FloatButton } from 'antd';
import { ThemeContext } from '../contexts/ThemeContext';

const ColorTheme = () => {
  const { changeTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (color) => {
    const themes = {
      default: {
        colorPrimary: '#ff6347',
        colorSecondary: '#ffa500',
        colorText: '#555555',
        colorBgContainer: '#fafafa',
        colorLink: '#1890ff',
        borderColor: '#e8e8e8',
      },
      blue: {
        colorPrimary: '#007bff',
        colorSecondary: '#0056b3',
        colorText: '#555555',
        colorBgContainer: '#fafafa',
        colorLink: '#0056b3',
        borderColor: '#b8daff',
      },
      red: {
        colorPrimary: '#dc3545',
        colorSecondary: '#bd2130',
        colorText: '#555555',
        colorBgContainer: '#fafafa',
        colorLink: '#bd2130',
        borderColor: '#f5c6cb',
      },
      green: {
        colorPrimary: '#28a745',
        colorSecondary: '#1e7e34',
        colorText: '#555555',
        colorBgContainer: '#fafafa',
        colorLink: '#1e7e34',
        borderColor: '#c3e6cb',
      },
    };
    changeTheme(themes[color]);
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
            onClick={() => handleThemeChange('default')}
            style={{
              position: 'absolute',
              right: isOpen ? 200 : 0,
              bottom: 0,
              transition: 'right 0.3s',
              backgroundColor: '#ff6347',
            }}
          />
          <FloatButton
            onClick={() => handleThemeChange('blue')}
            style={{
              position: 'absolute',
              right: isOpen ? 150 : 0,
              bottom: 0,
              transition: 'right 0.3s',
              backgroundColor: '#007bff',
            }}
          />
          <FloatButton
            onClick={() => handleThemeChange('red')}
            style={{
              position: 'absolute',
              right: isOpen ? 100 : 0,
              bottom: 0,
              transition: 'right 0.3s',
              backgroundColor: '#dc3545',
            }}
          />
          <FloatButton
            onClick={() => handleThemeChange('green')}
            style={{
              position: 'absolute',
              right: isOpen ? 50 : 0,
              bottom: 0,
              transition: 'right 0.3s',
              backgroundColor: '#28a745',
            }}
          />
        
      <FloatButton
        type="primary"
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
