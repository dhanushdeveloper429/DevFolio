import { Heart, CreditCard, ShoppingCart, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "healthcare-platform",
    title: "Healthcare Management Platform",
    description: "Enterprise healthcare solution for member enrollment and claims processing with 99.9% uptime.",
    technologies: ["React", "Node.js", "AWS"],
    icon: <Heart className="text-primary text-4xl" />,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: "payment-dashboard",
    title: "Payment Processing Dashboard",
    description: "Real-time payment analytics dashboard handling millions of transactions daily.",
    technologies: ["Angular", "Java", "Spring"],
    icon: <CreditCard className="text-primary text-4xl" />,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with inventory management and order processing.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    icon: <ShoppingCart className="text-primary text-4xl" />,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="projects-title">Featured Projects</h2>
          <p className="text-muted-foreground text-lg" data-testid="projects-subtitle">
            Showcasing enterprise solutions and personal projects that demonstrate technical expertise
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="transform-gpu transition-all duration-300 hover:rotate-y-3 hover:rotate-x-3 hover:translate-z-5 border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] overflow-hidden hover:shadow-2xl hover:shadow-primary/20" data-testid={`project-card-${project.id}`}>
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 matrix-bg-light dark:matrix-bg-dark opacity-30"></div>
                <div className="relative z-10 dark:drop-shadow-[0_0_10px_currentColor]">
                  {project.icon}
                </div>
              </div>
              <CardContent className="p-6 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-2 text-primary dark:drop-shadow-[0_0_10px_currentColor]" data-testid={`project-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary border border-primary/30 dark:drop-shadow-[0_0_5px_currentColor]">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_5px_rgba(0,255,255,0.3)] text-primary hover:bg-primary/20"
                      data-testid={`project-live-${project.id}`}
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_5px_rgba(0,255,255,0.3)] text-primary hover:bg-primary/20"
                      data-testid={`project-github-${project.id}`}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <SiGithub className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
