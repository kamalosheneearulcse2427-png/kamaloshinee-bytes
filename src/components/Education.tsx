import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SpaceBackground from "./SpaceBackground";
import InteractiveMoon from "./InteractiveMoon";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const educationData = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "KSR College of Engineering",
      location: "Tiruchengode, Tamil Nadu",
      period: "2023 - Present",
      status: "Currently Pursuing",
      grade: "CGPA: 8.5+",
      description: "Focusing on software development, data structures, algorithms, and web technologies.",
      highlights: ["Web Development", "Data Structures", "Algorithms", "Database Management"]
    },
    {
      degree: "Higher Secondary Education (12th)",
      institution: "Higher Secondary School",
      location: "Tamil Nadu",
      period: "2021 - 2023",
      status: "Completed",
      grade: "85%",
      description: "Completed higher secondary education with focus on Science and Mathematics.",
      highlights: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
    },
    {
      degree: "Secondary Education (10th)",
      institution: "High School",
      location: "Tamil Nadu",
      period: "2020 - 2021",
      status: "Completed",
      grade: "90%",
      description: "Completed secondary education with excellent academic performance.",
      highlights: ["Science", "Mathematics", "English", "Social Studies"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="education" className="py-24 relative overflow-hidden min-h-screen" ref={ref}>
      <SpaceBackground starCount={90} />
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <InteractiveMoon moonSize={100} sectionName="Education Realm">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-teal font-semibold text-lg mb-4 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            MY JOURNEY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal via-purple to-pink transform md:-translate-x-1/2 hidden md:block" />
          
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              variants={itemVariants}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'}`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-accent rounded-full transform md:-translate-x-1/2 z-10 shadow-lg hidden md:block"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-teal/30 rounded-full"
                />
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className={`ml-0 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-left' : ''}`}>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-accent w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                      >
                        <GraduationCap className="h-7 w-7" />
                      </motion.div>
                      <div className="flex-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                          edu.status === 'Currently Pursuing' 
                            ? 'bg-teal/20 text-teal' 
                            : 'bg-purple/20 text-purple'
                        }`}>
                          {edu.status}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                        <p className="text-teal font-semibold">{edu.institution}</p>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className={`space-y-3 text-left`}>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-teal" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-pink" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4 text-purple" />
                        <span className="font-semibold text-foreground">{edu.grade}</span>
                      </div>
                      
                      <p className="text-muted-foreground pt-2">{edu.description}</p>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 pt-3">
                        {edu.highlights.map((highlight, i) => (
                          <motion.span
                            key={highlight}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        </InteractiveMoon>
      </div>
    </section>
  );
};

export default Education;
