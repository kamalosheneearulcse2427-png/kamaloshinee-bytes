import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe, Smartphone } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 85, status: "Proficient" },
        { name: "C", level: 80, status: "Proficient" },
        { name: "JavaScript", level: 70, status: "Learning" },
        { name: "Java", level: 60, status: "Learning" },
      ]
    },
    {
      title: "Web Technologies", 
      icon: Globe,
      skills: [
        { name: "HTML", level: 75, status: "Learning" },
        { name: "CSS", level: 70, status: "Learning" },
        { name: "React", level: 65, status: "Learning" },
        { name: "Tailwind CSS", level: 60, status: "Learning" },
      ]
    },
    {
      title: "Development Tools",
      icon: Database,
      skills: [
        { name: "Git & GitHub", level: 75, status: "Proficient" },
        { name: "VS Code", level: 85, status: "Proficient" },
        { name: "Node.js", level: 55, status: "Learning" },
        { name: "Figma", level: 50, status: "Learning" },
      ]
    },
    {
      title: "Soft Skills",
      icon: Smartphone,
      skills: [
        { name: "Problem Solving", level: 90, status: "Expert" },
        { name: "Teaching", level: 85, status: "Proficient" },
        { name: "Communication", level: 80, status: "Proficient" },
        { name: "Leadership", level: 75, status: "Proficient" },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Expert": return "bg-teal text-white";
      case "Proficient": return "bg-purple text-white";
      case "Learning": return "bg-pink text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and ongoing learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-accent p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-card-foreground">
                            {skill.name}
                          </span>
                          <Badge className={getStatusColor(skill.status)}>
                            {skill.status}
                          </Badge>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-muted"
                        />
                        <div className="text-right text-sm text-muted-foreground">
                          {skill.level}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Always Learning
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Technology evolves rapidly, and so do I. Currently expanding my knowledge in 
              full-stack development, exploring modern frameworks, and staying updated with 
              the latest industry trends and best practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;