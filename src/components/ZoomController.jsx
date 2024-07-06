import { useState } from 'react';
import { FloatButton, Tooltip } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined, EyeOutlined } from '@ant-design/icons';

const ZoomController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.25);
    document.body.style.zoom = zoomLevel + 0.25;
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 0.25);
    document.body.style.zoom = zoomLevel - 0.25;
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 1000,
      }}
    >
        
      <FloatButton
        icon={<ZoomInOutlined />}
        onClick={handleZoomIn}
        style={{
          position: 'absolute',
          right: isOpen ? 100 : 0,
          bottom: 0,
          transition: 'right 0.3s',
        }}
      />
      <FloatButton
        icon={<ZoomOutOutlined />}
        onClick={handleZoomOut}
        style={{
          position: 'absolute',
          right: isOpen ? 50 : 0,
          bottom: 0,
          transition: 'right 0.3s',
        }}
      />
      <FloatButton
        
        type='primary'
        icon={<EyeOutlined />}
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

export default ZoomController;