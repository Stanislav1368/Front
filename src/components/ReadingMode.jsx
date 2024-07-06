import React, { useState, useRef } from 'react';
import { FloatButton, Drawer, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import TextToSpeech from './TextToSpeech';

const ReadingMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const textToSpeechRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.pointerEvents = 'auto';
    }
  };

  const handleReadText = () => {
    if (selectedElement) {
      const text = selectedElement.textContent;
      setSelectedText(text);
      textToSpeechRef.current.speak(text);
    }
  };

  const handleElementClick = (e) => {
    setSelectedElement(e.target);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        bottom: 70,
        zIndex: 1000,
      }}
    >
      <FloatButton
        icon={<AudioOutlined />}
        onClick={handleToggle}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
      />
      {isOpen && (
        <Drawer
          title="Режим чтения"
          placement="right"
          onClose={handleToggle}
          visible={isOpen}
          width={400}
        >
          <div onClick={handleReadText}>
            <p>Считать текст: "{selectedText}"</p>
          </div>
          <div style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleReadText}>
              Прочитать
            </Button>
          </div>
          <TextToSpeech ref={textToSpeechRef} />
        </Drawer>
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'all',
          zIndex: 999,
        }}
        onClick={handleElementClick}
      />
    </div>
  );
};

export default ReadingMode;
