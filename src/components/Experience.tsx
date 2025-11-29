import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SpaceBackground from "./SpaceBackground";
import InteractiveMoon from "./InteractiveMoon";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Computer Science Student",
      organization: "KSR College of Engineering",
      period: "2023 - Present",
      type: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Currently in 2nd year, focusing on core computer science subjects including data structures, algorithms, and web development.",
      achievements: [
        "Maintaining excellent academic performance",
        "Active participation in coding competitions",
        "Member of college tech club",
      ],
      color: "teal",
    },
    {
      title: "Part-Time Teacher",
      organization: "Local School",
      period: "2023 - Present",
      type: "Teaching",
      icon: <Users className="h-5 w-5" />,
      description: "Teaching programming fundamentals and mathematics to school students, helping them build strong foundational skills.",
      achievements: [
        "Successfully taught 50+ students",
        "Developed custom learning materials",
        "Improved student engagement through interactive methods",
      ],
      color: "purple",
    },
    {
      title: "Self-Learning Journey",
      organization: "Online Platforms",
      period: "2022 - Present",
      type: "Learning",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Continuously learning through online courses, tutorials, and hands-on projects to stay updated with latest technologies.",
      achievements: [
        "Completed multiple web development courses",
        "Built 10+ personal projects",
        "Contributing to open-source projects",
      ],
      color: "pink",
    },
  ];

  const getIconColor = (color: string) => {
    return `bg-${color}/10 text-${color}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -60, rotateY: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden min-h-screen" ref={ref}>
      <SpaceBackground starCount={85} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-6 relative z-10">
        <InteractiveMoon moonSize={100}>
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey in technology and education
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8" style={{ perspective: '2000px' }}>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
                x: 20,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-accent/20 overflow-hidden shadow-lg hover:shadow-2xl transform-gpu transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`${getIconColor(exp.color)} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      {exp.icon}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-foreground">{exp.title}</h3>
                        <Badge variant="outline" className="border-accent text-accent">
                          {exp.type}
                        </Badge>
                      </div>

                      <div className="text-muted-foreground mb-2">
                        <span className="font-semibold">{exp.organization}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.period}</span>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-accent">Key Highlights:</p>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: index * 0.2 + i * 0.1 + 0.3, duration: 0.5 }}
                              whileHover={{ x: 10, transition: { duration: 0.2 } }}
                              className="text-muted-foreground flex items-start transform-gpu"
                            >
                              <span className="text-accent mr-2">▹</span>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 15, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            rotateY: -3,
            transition: { duration: 0.3 }
          }}
          className="max-w-3xl mx-auto mt-12"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="bg-gradient-accent text-white border-0 shadow-2xl transform-gpu">
            <CardContent className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4"
              >
                <Target className="h-12 w-12 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Looking Forward</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Eager to gain professional experience in web development and contribute to 
                innovative projects. Open to internships and collaborative opportunities that 
                will help me grow as a developer and make meaningful contributions to the tech community.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        </InteractiveMoon>
      </div>
    </section>
  );
};

export default Experience;