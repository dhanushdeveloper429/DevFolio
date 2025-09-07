import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const commands = [
  { command: 'cat ~/skills.txt', output: ['Frontend: React, Angular, Vue.js', 'Backend: Node.js, Java, C#', 'Cloud: AWS, Docker, Kubernetes'] },
  { command: 'ls -la ~/experience/', output: ['anthem_2019-present/', 'american_express_2018-2019/', 'molina_healthcare_2018/', 'anthem_2017-2018/', 'macys_2015-2017/'] },
  { command: 'whoami', output: ['senior_developer'] },
  { command: 'ps aux | grep passion', output: ['coding    1337  0.0  99.9  building_awesome_software'] },
  { command: 'uptime', output: ['7+ years of enterprise development experience'] }
];

export default function TerminalSimulator() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const currentCommand = commands[currentCommandIndex];
    
    if (isTyping) {
      const targetText = `$ ${currentCommand.command}`;
      
      if (displayText.length < targetText.length) {
        const timer = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        setShowOutput(true);
        
        const outputTimer = setTimeout(() => {
          setShowOutput(false);
          setDisplayText('');
          setIsTyping(true);
          setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
        }, 3000);
        
        return () => clearTimeout(outputTimer);
      }
    }
  }, [displayText, currentCommandIndex, isTyping]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="bg-black/90 border border-cyan-400/30 rounded-lg p-6 font-mono text-sm backdrop-blur-sm" data-testid="terminal-simulator">
      <div className="flex items-center mb-4 text-cyan-400">
        <Terminal className="w-4 h-4 mr-2" />
        <span>developer@portfolio:~</span>
      </div>
      
      <div className="text-green-400 min-h-[120px]">
        <div className="flex items-center">
          <span className="text-cyan-400">{displayText}</span>
          {showCursor && <span className="bg-green-400 w-2 h-4 ml-1 animate-pulse"></span>}
        </div>
        
        {showOutput && (
          <div className="mt-2 text-gray-300">
            {commands[currentCommandIndex].output.map((line, index) => (
              <div key={index} className="ml-4">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}