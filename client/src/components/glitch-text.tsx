import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number;
  trigger?: boolean;
}

export default function GlitchText({ 
  text, 
  className = "", 
  intensity = 5,
  trigger = false 
}: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

  const createGlitch = () => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.1) {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        result += text[i];
      }
    }
    return result;
  };

  useEffect(() => {
    if (trigger && !isGlitching) {
      setIsGlitching(true);
      
      const glitchInterval = setInterval(() => {
        setGlitchText(createGlitch());
      }, 50);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitchText(text);
        setIsGlitching(false);
      }, 200);
    }
  }, [trigger, text, isGlitching]);

  return (
    <span 
      className={`inline-block transition-all duration-75 ${className} ${
        isGlitching ? 'animate-pulse' : ''
      }`}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff00ff, -2px 0 #00ffff, 0 0 20px rgba(0, 255, 255, 0.5)'
          : 'none',
        transform: isGlitching ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : 'none'
      }}
      data-testid="glitch-text"
    >
      {glitchText}
    </span>
  );
}