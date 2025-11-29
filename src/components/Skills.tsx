import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Server, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SpaceBackground from "./SpaceBackground";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code2 className="h-6 w-6" />,
      skills: [
        { name: "C Programming", level: 80, status: "proficient" },
        { name: "Java", level: 75, status: "proficient" },
        { name: "JavaScript", level: 85, status: "expert" },
        { name: "Python", level: 70, status: "learning" },
      ],
    },
    {
      title: "Web Technologies",
      icon: <Palette className="h-6 w-6" />,
      skills: [
        { name: "HTML5 & CSS3", level: 90, status: "expert" },
        { name: "React.js", level: 85, status: "expert" },
        { name: "Tailwind CSS", level: 88, status: "expert" },
        { name: "Bootstrap", level: 82, status: "proficient" },
      ],
    },
    {
      title: "Backend & Database",
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "Node.js", level: 75, status: "proficient" },
        { name: "MySQL", level: 78, status: "proficient" },
        { name: "MongoDB", level: 70, status: "learning" },
        { name: "Firebase", level: 72, status: "learning" },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: <Zap className="h-6 w-6" />,
      skills: [
        { name: "Git & GitHub", level: 85, status: "expert" },
        { name: "VS Code", level: 90, status: "expert" },
        { name: "Figma", level: 75, status: "proficient" },
        { name: "Vercel", level: 80, status: "proficient" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "expert":
        return "bg-teal text-white";
      case "proficient":
        return "bg-purple text-white";
      case "learning":
        return "bg-pink text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      <SpaceBackground starCount={100} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Constantly learning and expanding my technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" style={{ perspective: '1000px' }}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              custom={categoryIndex}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="bg-gradient-card border-accent/20 h-full shadow-xl hover:shadow-2xl transform-gpu transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-accent/10 p-3 rounded-lg mr-4 text-accent">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.1, duration: 0.5 }}
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                        className="transform-gpu"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <Badge className={getStatusColor(skill.status)}>
                            {skill.status}
                          </Badge>
                        </div>
                        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                            className="absolute h-full bg-gradient-to-r from-teal to-purple rounded-full shadow-lg"
                            style={{
                              boxShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ 
            scale: 1.02,
            rotateX: -2,
            transition: { duration: 0.3 }
          }}
          className="max-w-3xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="bg-gradient-accent text-white border-0 shadow-2xl transform-gpu">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Always Learning</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Technology never stops evolving, and neither do I. I'm committed to continuous 
                learning and staying updated with the latest trends in web development, always 
                exploring new frameworks, tools, and best practices to deliver cutting-edge solutions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;