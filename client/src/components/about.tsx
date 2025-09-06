import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="about-title">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="about-subtitle">
            Passionate about building robust, scalable software solutions that drive business value and enhance user experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center" data-testid="profile-placeholder">
              <User className="w-24 h-24 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold" data-testid="about-role">Enterprise Software Specialist</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="about-description-1">
              With over 7 years of experience in enterprise software development, I've had the privilege of working 
              with industry leaders including Anthem, American Express, Molina Healthcare, and Macy's. My expertise 
              spans full-stack development, system architecture, and leading cross-functional teams to deliver 
              mission-critical applications.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="about-description-2">
              I specialize in building scalable, maintainable solutions that meet complex business requirements 
              while ensuring optimal performance and security. My approach combines technical excellence with 
              strategic thinking to drive meaningful business outcomes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-experience">7+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-companies">5</div>
                  <div className="text-sm text-muted-foreground">Fortune 500 Companies</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
