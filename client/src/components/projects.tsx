import { Heart, CreditCard, ShoppingCart, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { personalData } from "@/data";
import { useThemeLogic } from "@/hooks/use-theme-logic";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="text-primary text-4xl" />,
  CreditCard: <CreditCard className="text-primary text-4xl" />,
  ShoppingCart: <ShoppingCart className="text-primary text-4xl" />,
};

export default function Projects() {
  const { theme } = useThemeLogic();

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
          {personalData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full transform-gpu transition-all duration-300 hover:rotate-y-3 hover:rotate-x-3 hover:translate-z-5 border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] overflow-hidden hover:shadow-2xl hover:shadow-primary/20 ${theme === 'christmas' ? 'snow-cap' : ''}`} data-testid={`project-card-${project.id}`}>
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 matrix-bg-light dark:matrix-bg-dark opacity-30"></div>
                  <div className="relative z-10 dark:drop-shadow-[0_0_10px_currentColor]">
                    {iconMap[project.icon]}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
