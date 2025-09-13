import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiLinkedin, SiGithub } from "react-icons/si";
import TypingAnimation from "@/components/typing-animation";
import GlitchText from "@/components/glitch-text";
import TerminalSimulator from "@/components/terminal-simulator";
import { useState, useEffect } from "react";

export default function Hero() {
  const [glitchTrigger, setGlitchTrigger] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/api/resume/download');
      const data = await response.json();
      // In a real implementation, this would trigger a file download
      console.log('Resume download:', data);
    } catch (error) {
      console.error('Failed to download resume:', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center matrix-bg-light dark:matrix-bg-dark relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold" data-testid="hero-title">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-cyan-400 dark:via-purple-500 dark:to-cyan-400 bg-[length:200%_200%] animate-[gradientShift_3s_ease_infinite] bg-clip-text text-transparent dark:drop-shadow-[0_0_10px_currentColor]">
                  <TypingAnimation 
                    text="Senior Developer" 
                    speed={150}
                    className="inline-block"
                  />
                </div>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl" data-testid="hero-description">
              <span className="text-primary">&gt;</span> Enterprise software specialist with 7+ years of experience<br/>
              <span className="text-primary">&gt;</span> Architect of scalable solutions and system architecture<br/>
              <span className="text-primary">&gt;</span> Fortune 500 team leadership expertise
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownloadResume}
                className="border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-primary/20 text-primary hover:bg-primary/30 px-8 py-3 font-medium transition-all duration-300 animate-[float_3s_ease-in-out_infinite]"
                data-testid="button-download-resume"
              >
                <Download className="w-4 h-4 mr-2" />
                Download.Resume.pkg
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToContact}
                className="border border-accent shadow-[0_0_5px_rgba(168,85,247,0.2)] dark:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-accent hover:bg-accent/20 px-8 py-3 font-medium transition-all duration-300"
                data-testid="button-contact"
              >
                Initialize.Contact
              </Button>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 dark:hover:drop-shadow-[0_0_10px_currentColor]"
                data-testid="link-linkedin"
              >
                <SiLinkedin />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 dark:hover:drop-shadow-[0_0_10px_currentColor]"
                data-testid="link-github"
              >
                <SiGithub />
              </a>
              <a 
                href="mailto:john.developer@email.com"
                className="text-2xl text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 dark:hover:drop-shadow-[0_0_10px_currentColor]"
                data-testid="link-email"
              >
                <Mail />
              </a>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <TerminalSimulator />
          </div>
        </div>
      </div>
    </section>
  );
}
