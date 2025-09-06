import { Heart, CreditCard, Building2, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  isLeft: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: "anthem-current",
    company: "Anthem Inc.",
    role: "Senior Developer",
    startDate: "Nov 2019",
    endDate: "Present",
    description: "Leading development of healthcare management systems, implementing scalable solutions for member services and claims processing.",
    technologies: ["React", "Node.js", "AWS"],
    icon: <Heart className="text-primary text-xl" />,
    isLeft: true
  },
  {
    id: "amex",
    company: "American Express",
    role: "Full Stack Developer",
    startDate: "Nov 2018",
    endDate: "Nov 2019",
    description: "Developed secure payment processing applications and customer portal features for millions of cardholders worldwide.",
    technologies: ["Java", "Spring", "Angular"],
    icon: <CreditCard className="text-primary text-xl" />,
    isLeft: false
  },
  {
    id: "molina",
    company: "Molina Healthcare",
    role: "Software Developer",
    startDate: "Feb 2018",
    endDate: "Nov 2018",
    description: "Built healthcare management applications focusing on Medicaid and Medicare services for underserved communities.",
    technologies: ["C#", ".NET", "SQL Server"],
    icon: <Building2 className="text-primary text-xl" />,
    isLeft: true
  },
  {
    id: "anthem-previous",
    company: "Anthem Inc.",
    role: "Junior Developer",
    startDate: "Mar 2017",
    endDate: "Feb 2018",
    description: "Started career developing internal tools and contributing to member enrollment systems for healthcare plans.",
    technologies: ["JavaScript", "Python", "MySQL"],
    icon: <Heart className="text-primary text-xl" />,
    isLeft: false
  },
  {
    id: "macys",
    company: "Macy's Inc.",
    role: "Developer Intern",
    startDate: "May 2015",
    endDate: "Mar 2017",
    description: "Developed e-commerce features and inventory management tools while learning enterprise development practices.",
    technologies: ["PHP", "jQuery", "Oracle"],
    icon: <ShoppingBag className="text-primary text-xl" />,
    isLeft: true
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="experience-title">Professional Experience</h2>
          <p className="text-muted-foreground text-lg" data-testid="experience-subtitle">
            A journey through enterprise software development at industry-leading companies
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 timeline-line"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex items-center md:justify-between">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                
                {exp.isLeft ? (
                  <>
                    <div className="ml-20 md:ml-0 md:w-5/12">
                      <Card className="hover:shadow-md transition-shadow" data-testid={`experience-card-${exp.id}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mr-4">
                              {exp.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg" data-testid={`role-${exp.id}`}>{exp.role}</h3>
                              <p className="text-primary font-medium" data-testid={`company-${exp.id}`}>{exp.company}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" data-testid={`dates-${exp.id}`}>
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p className="text-muted-foreground" data-testid={`description-${exp.id}`}>
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:block w-5/12"></div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block w-5/12"></div>
                    <div className="ml-20 md:ml-0 md:w-5/12">
                      <Card className="hover:shadow-md transition-shadow" data-testid={`experience-card-${exp.id}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mr-4">
                              {exp.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg" data-testid={`role-${exp.id}`}>{exp.role}</h3>
                              <p className="text-primary font-medium" data-testid={`company-${exp.id}`}>{exp.company}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" data-testid={`dates-${exp.id}`}>
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p className="text-muted-foreground" data-testid={`description-${exp.id}`}>
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
