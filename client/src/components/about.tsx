import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { personalData } from "@/data";

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="about-title">{personalData.about.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="about-subtitle">
            {personalData.about.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center" data-testid="profile-placeholder">
              <User className="w-24 h-24 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold" data-testid="about-role">{personalData.role}</h3>
            {personalData.about.description.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed" data-testid={`about-description-${index + 1}`}>
                {paragraph}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-experience">{personalData.stats.experience}</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-companies">{personalData.stats.companies}</div>
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
