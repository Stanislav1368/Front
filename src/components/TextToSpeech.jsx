import React, { forwardRef, useImperativeHandle, useState } from 'react';

const TextToSpeech = forwardRef((props, ref) => {
  const [isReading, setIsReading] = useState(false);

  useImperativeHandle(ref, () => ({
    speak: (text) => {
      if (!isReading) {
        setIsReading(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          setIsReading(false);
        };
        window.speechSynthesis.speak(utterance);
      }
    },
  }));

  return null;
});


export default TextToSpeech;
