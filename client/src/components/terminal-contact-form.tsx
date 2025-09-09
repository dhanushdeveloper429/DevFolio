import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const steps = [
  { field: 'firstName', prompt: 'Enter your first name', type: 'text' },
  { field: 'lastName', prompt: 'Enter your last name', type: 'text' },
  { field: 'email', prompt: 'Enter your email address', type: 'email' },
  { field: 'subject', prompt: 'Enter message subject', type: 'text' },
  { field: 'message', prompt: 'Enter your message', type: 'textarea' }
];

export default function TerminalContactForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setHistory(prev => [...prev, 
        '', 
        '[SUCCESS] Message transmission complete',
        '[INFO] Secure channel established',
        '[CONF] Message encrypted and delivered to target',
        '[ACK] Response expected within 24-48 hours',
        '[STATUS] Connection terminated successfully',
        ''
      ]);
      setIsSubmitting(false);
      setIsComplete(true);
      toast({
        title: "Message transmitted successfully!",
        description: "Secure connection established. Response incoming within 24-48 hours.",
      });
      // Reset form after 5 seconds
      setTimeout(() => {
        resetForm();
      }, 5000);
    },
    onError: (error: any) => {
      setHistory(prev => [...prev, 
        '', 
        '[ERROR] Transmission failed',
        '[DEBUG] Connection timeout or server unreachable',
        '[RETRY] Please reinitialize contact protocol',
        '[STATUS] Session terminated with errors',
        ''
      ]);
      setIsSubmitting(false);
      toast({
        title: "Transmission failed",
        description: "Connection error detected. Please retry contact protocol.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
    setCurrentInput('');
    setHistory([]);
    setIsComplete(false);
    setIsSubmitting(false);
  };

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);

  // Focus input when step changes
  useEffect(() => {
    if (currentStep < steps.length && !isComplete) {
      const timer = setTimeout(() => {
        if (steps[currentStep].type === 'textarea') {
          textareaRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isComplete]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitStep();
    }
  };

  const handleSubmitStep = () => {
    if (!currentInput.trim()) return;

    const step = steps[currentStep];
    const field = step.field as keyof ContactFormData;
    
    // Add to history
    setHistory(prev => [...prev, `$ ${step.prompt}`, `→ ${currentInput}`]);
    
    // Update form data
    setFormData(prev => ({ ...prev, [field]: currentInput }));
    
    // Clear current input
    setCurrentInput('');
    
    // Move to next step or submit
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // All steps complete, submit form
      submitForm();
    }
  };

  const submitForm = () => {
    const finalFormData = { ...formData, [steps[currentStep].field]: currentInput };
    
    setHistory(prev => [...prev, 
      '', 
      '[INIT] Validating contact payload...',
      '[SCAN] Running security checks...',
      '[ENCRYPT] Applying end-to-end encryption...',
      '[SEND] Establishing secure connection...',
      '[WAIT] Transmitting to target server...'
    ]);
    setIsSubmitting(true);
    
    contactMutation.mutate(finalFormData);
  };

  const currentPrompt = currentStep < steps.length ? steps[currentStep].prompt : '';
  const isTextarea = currentStep < steps.length && steps[currentStep].type === 'textarea';

  return (
    <div className="bg-black/90 border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] rounded-lg p-6 font-mono text-sm backdrop-blur-sm min-h-[400px]" data-testid="terminal-contact-form">
      <div className="flex items-center mb-4 text-primary dark:text-cyan-400">
        <Terminal className="w-4 h-4 mr-2" />
        <span>contact@portfolio:~</span>
      </div>
      
      <div className="text-green-400 min-h-[300px] space-y-1">
        {/* Initial message */}
        {history.length === 0 && (
          <div className="text-gray-300 mb-4">
            <div>[INIT] Initiating secure contact protocol...</div>
            <div>[INFO] Authentication required for message transmission</div>
            <div>[PROMPT] Please provide the following credentials:</div>
            <div></div>
          </div>
        )}
        
        {/* Command history */}
        {history.map((line, index) => {
          let className = 'text-green-400';
          if (line.startsWith('$')) {
            className = 'text-cyan-400 dark:text-cyan-400';
          } else if (line.startsWith('→')) {
            className = 'text-gray-300';
          } else if (line.startsWith('[SUCCESS]') || line.startsWith('[CONF]') || line.startsWith('[ACK]')) {
            className = 'text-green-400';
          } else if (line.startsWith('[ERROR]') || line.startsWith('[DEBUG]') || line.startsWith('[RETRY]')) {
            className = 'text-red-400';
          } else if (line.startsWith('[INFO]') || line.startsWith('[STATUS]') || line.startsWith('[PROMPT]')) {
            className = 'text-blue-400';
          } else if (line.startsWith('[INIT]') || line.startsWith('[SCAN]') || line.startsWith('[ENCRYPT]') || line.startsWith('[SEND]') || line.startsWith('[WAIT]')) {
            className = 'text-yellow-400';
          }
          
          return (
            <div key={index} className={className}>
              {line}
            </div>
          );
        })}
        
        {/* Current input */}
        {!isComplete && !isSubmitting && currentStep < steps.length && (
          <div className="flex items-start">
            <span className="text-cyan-400 dark:text-cyan-400">$ {currentPrompt}: </span>
            <div className="flex-1 ml-2">
              {isTextarea ? (
                <textarea
                  ref={textareaRef}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-transparent text-green-400 outline-none resize-none w-full min-h-[60px]"
                  placeholder="Type your message here..."
                  data-testid="terminal-textarea-input"
                />
              ) : (
                <input
                  ref={inputRef}
                  type={steps[currentStep].type}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-transparent text-green-400 outline-none w-full"
                  placeholder="Type here and press Enter..."
                  data-testid="terminal-text-input"
                />
              )}
              {showCursor && <span className="bg-green-400 w-2 h-4 ml-1 animate-pulse inline-block"></span>}
            </div>
          </div>
        )}
        
        {/* Completion message */}
        {isComplete && (
          <div className="text-blue-400 mt-4">
            <div>[COMPLETE] Contact session terminated successfully</div>
            <div>[AUTO] Reinitializing terminal in 5 seconds...</div>
            <div>[SYSTEM] Thank you for using SecureContact v2.1</div>
          </div>
        )}
        
        {/* Instructions */}
        {!isComplete && !isSubmitting && (
          <div className="text-gray-500 text-xs mt-4">
            {isTextarea ? 'Type your message and press Enter to continue' : 'Press Enter to continue'}
          </div>
        )}
      </div>
    </div>
  );
}