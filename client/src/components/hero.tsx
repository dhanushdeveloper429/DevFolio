import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiLinkedin, SiGithub } from "react-icons/si";
import TypingAnimation from "@/components/typing-animation";

export default function Hero() {
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
    <section className="min-h-screen flex items-center bg-gradient-to-br from-primary/5 to-secondary pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">
            <span className="gradient-text">
              <TypingAnimation 
                text="Senior.Developer.Portfolio..." 
                speed={120}
                className="inline-block"
              />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="hero-description">
            Enterprise software specialist with 7+ years of experience at Fortune 500 companies. 
            Expertise in scalable solutions, system architecture, and team leadership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleDownloadResume}
              className="bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90"
              data-testid="button-download-resume"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button 
              variant="outline"
              onClick={scrollToContact}
              className="px-8 py-3 font-medium"
              data-testid="button-contact"
            >
              Get In Touch
            </Button>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-linkedin"
            >
              <SiLinkedin className="text-2xl" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-github"
            >
              <SiGithub className="text-2xl" />
            </a>
            <a 
              href="mailto:john.developer@email.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-email"
            >
              <Mail className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
