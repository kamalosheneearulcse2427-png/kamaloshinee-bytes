import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Part-time Teacher",
      organization: "School Students Tutoring",
      period: "2023 - Present",
      type: "Teaching",
      icon: Users,
      description: "Providing personalized tutoring to school students in mathematics and science subjects, helping them improve their academic performance and understanding of core concepts.",
      achievements: [
        "Helped 20+ students improve their grades",
        "Developed personalized learning plans",
        "Enhanced communication and leadership skills"
      ],
      color: "bg-teal"
    },
    {
      title: "Computer Science Student",
      organization: "KSR College of Engineering",
      period: "2023 - 2027",
      type: "Education",
      icon: GraduationCap,
      description: "Currently pursuing Bachelor's degree in Computer Science and Engineering, focusing on programming fundamentals, data structures, algorithms, and modern web technologies.",
      achievements: [
        "Strong academic performance",
        "Active participation in coding activities",
        "Focus on practical application of concepts"
      ],
      color: "bg-purple"
    },
    {
      title: "Self-Directed Learning",
      organization: "Online Platforms & Projects",
      period: "2022 - Present",
      type: "Learning",
      icon: BookOpen,
      description: "Continuously expanding knowledge through online courses, tutorials, and hands-on projects. Building practical experience in web development and programming languages.",
      achievements: [
        "Completed multiple programming courses",
        "Built several personal projects",
        "Developed problem-solving skills"
      ],
      color: "bg-pink"
    }
  ];

  const getIconColor = (color: string) => {
    return `${color} text-white`;
  };

  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Experience & Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My educational background, teaching experience, and continuous learning path
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              return (
                <Card key={index} className="bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon and Timeline */}
                      <div className="flex-shrink-0">
                        <div className={`${getIconColor(exp.color)} p-4 rounded-full shadow-lg`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-lg text-muted-foreground">
                              {exp.organization}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-2 md:mt-0">
                            <Badge className={`${getIconColor(exp.color)} border-0`}>
                              {exp.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground font-medium">
                              {exp.period}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        <div>
                          <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                            <Award className="h-4 w-4 mr-2 text-accent" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achieveIndex) => (
                              <li key={achieveIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-muted-foreground">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Future Goals */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-accent text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Looking Forward</h3>
                <p className="text-white/90 leading-relaxed max-w-2xl mx-auto">
                  Seeking opportunities to apply my skills in real-world projects, 
                  contribute to innovative teams, and continue growing as a web developer. 
                  Ready to take on new challenges and make a meaningful impact in the tech industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;