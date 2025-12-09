import { Laptop, Server, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { personalData } from "@/data";
import { motion } from "framer-motion";
import { useThemeLogic } from "@/hooks/use-theme-logic";

const iconMap: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="text-primary text-2xl" />,
  Server: <Server className="text-primary text-2xl" />,
  Cloud: <Cloud className="text-primary text-2xl" />,
};

export default function Skills() {
  const { theme } = useThemeLogic();

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="skills-title">Technical Skills</h2>
          <p className="text-muted-foreground text-lg" data-testid="skills-subtitle">
            Technologies and tools I use to build exceptional software solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {personalData.skills.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`p-8 hover:shadow-lg transition-shadow duration-300 border-primary/20 bg-card/50 backdrop-blur-sm ${theme === 'christmas' ? 'snow-cap' : ''}`}>
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-[bounce_3s_infinite]">
                      {iconMap[category.icon]}
                    </div>
                    <h3 className="text-xl font-semibold" data-testid={`skill-category-${categoryIndex}`}>
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span data-testid={`skill-name-${categoryIndex}-${skillIndex}`}>
                            {skill.name}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`skill-level-${categoryIndex}-${skillIndex}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Progress
                            value={skill.level}
                            className="h-2"
                            data-testid={`skill-progress-${categoryIndex}-${skillIndex}`}
                          />
                        </motion.div>
                      </div>
                    ))}
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
