import { Laptop, Server, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Laptop className="text-primary text-2xl" />,
    skills: [
      { name: "React/Next.js", level: 100 },
      { name: "TypeScript", level: 85 },
      { name: "Angular", level: 80 },
      { name: "Vue.js", level: 75 }
    ]
  },
  {
    title: "Backend",
    icon: <Server className="text-primary text-2xl" />,
    skills: [
      { name: "Node.js", level: 100 },
      { name: "Java/Spring", level: 85 },
      { name: "C#/.NET", level: 80 },
      { name: "Python", level: 75 }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="text-primary text-2xl" />,
    skills: [
      { name: "AWS", level: 100 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 75 },
      { name: "CI/CD", level: 80 }
    ]
  }
];

export default function Skills() {
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
          {skillCategories.map((category, categoryIndex) => (
            <Card key={category.title} className="p-8">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {category.icon}
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
                      <Progress 
                        value={skill.level} 
                        className="h-2" 
                        data-testid={`skill-progress-${categoryIndex}-${skillIndex}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
