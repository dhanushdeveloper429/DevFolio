import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export default function TypingAnimation({
  text,
  speed = 100,
  className = "",
  showCursor = true
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (showCursor) {
      // Start cursor blinking after typing is complete
      const interval = setInterval(() => {
        setShowCursorBlink(prev => !prev);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [currentIndex, text, speed, showCursor]);

  return (
    <span className={className} data-testid="typing-animation">
      {displayText}
      {showCursor && (
        <span 
          className={`inline-block w-0.5 h-full bg-current ml-1 ${
            currentIndex >= text.length 
              ? showCursorBlink ? 'opacity-100' : 'opacity-0' 
              : 'opacity-100'
          } transition-opacity duration-100`}
          data-testid="typing-cursor"
        />
      )}
    </span>
  );
}