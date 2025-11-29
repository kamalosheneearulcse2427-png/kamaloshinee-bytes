import { Button } from "@/components/ui/button";
import { Download, Code2, Lightbulb, Target, Rocket } from "lucide-react";
import profilePhoto from "@/assets/profile-kamaloshenee.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SpaceBackground from "./SpaceBackground";
import InteractiveMoon from "./InteractiveMoon";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Projects", value: "10+", icon: <Code2 className="h-5 w-5" /> },
    { label: "Technologies", value: "15+", icon: <Lightbulb className="h-5 w-5" /> },
    { label: "Years Coding", value: "2+", icon: <Target className="h-5 w-5" /> },
  ];

  const highlights = [
    { icon: <Rocket className="h-6 w-6" />, title: "Fast Learner", desc: "Quick to adapt to new technologies" },
    { icon: <Code2 className="h-6 w-6" />, title: "Clean Code", desc: "Writing maintainable solutions" },
    { icon: <Lightbulb className="h-6 w-6" />, title: "Creative", desc: "Innovative problem solving" },
    { icon: <Target className="h-6 w-6" />, title: "Goal Oriented", desc: "Focused on delivering results" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden min-h-screen" ref={ref}>
      <SpaceBackground starCount={80} />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <InteractiveMoon moonSize={100}>
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
            ABOUT ME
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Get To Know Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Background shapes */}
              <motion.div 
                className="absolute -top-8 -left-8 w-72 h-72 bg-gradient-to-r from-teal/20 to-purple/20 rounded-3xl"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-r from-purple/20 to-pink/20 rounded-3xl"
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              />
              
              {/* Main photo */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src={profilePhoto} 
                  alt="KAMALOSHENEE A"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-teal text-white p-4 rounded-2xl shadow-xl z-20"
              >
                <Code2 className="h-8 w-8" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-purple text-white p-4 rounded-2xl shadow-xl z-20"
              >
                <Lightbulb className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                A Passionate Web Developer from India
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                I'm a self-motivated web developer and 2nd year CSE student at KSR College of Engineering. 
                I love creating beautiful, functional websites and applications that provide excellent user experiences.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                When I'm not coding, I enjoy teaching school students as a part-time teacher, sharing knowledge 
                and helping others grow in their educational journey.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-gradient-card p-4 rounded-2xl text-center border border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-teal mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="bg-gradient-accent text-white px-8 py-6 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                </motion.span>
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-card p-6 rounded-2xl text-center border border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div 
                className="bg-gradient-accent w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>
              <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        </InteractiveMoon>
      </div>
    </section>
  );
};

export default About;
