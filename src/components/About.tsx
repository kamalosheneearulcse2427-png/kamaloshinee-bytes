import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Users, MapPin } from "lucide-react";
import profilePhoto from "@/assets/profile-kamaloshenee.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="about" className="py-20 bg-secondary/30 perspective-1000" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Self-motivated and passionate about creating digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div 
                custom={0}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-card p-6 rounded-xl transform-gpu shadow-lg hover:shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-accent mr-3" />
                  <h3 className="text-xl font-bold text-foreground">Education</h3>
                </div>
                <p className="text-muted-foreground">
                  Currently pursuing CSE at KSR College of Engineering (2nd year), 
                  building a strong foundation in computer science and programming.
                </p>
              </motion.div>

              <motion.div 
                custom={1}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-card p-6 rounded-xl transform-gpu shadow-lg hover:shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 text-pink mr-3" />
                  <h3 className="text-xl font-bold text-foreground">Passion</h3>
                </div>
                <p className="text-muted-foreground">
                  Dedicated to web development and creating innovative applications. 
                  Always eager to learn new technologies and improve my skills.
                </p>
              </motion.div>

              <motion.div 
                custom={2}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-card p-6 rounded-xl transform-gpu shadow-lg hover:shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-teal mr-3" />
                  <h3 className="text-xl font-bold text-foreground">Teaching</h3>
                </div>
                <p className="text-muted-foreground">
                  Part-time teacher for school students, sharing knowledge and 
                  helping others grow in their educational journey.
                </p>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.1, 
                    rotateZ: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img 
                    src={profilePhoto} 
                    alt="KAMALOSHENEE A"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Tamil Nadu, India</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-gradient-accent text-white border-0 shadow-2xl transform-gpu">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-bold mb-2">My Mission</h4>
                    <p className="text-white/90">
                      To bridge the gap between creativity and technology, 
                      creating meaningful digital solutions that make a positive impact.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
