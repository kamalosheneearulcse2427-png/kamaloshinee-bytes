import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram, Download } from "lucide-react";
import { HeroScene } from "./3d/HeroScene";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-kamaloshenee.jpg";

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/kamaloshenee_app", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/a-kamaloshenee-arul-arul-5a916327", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:kamaloshenee.arul@gmail.com", label: "Email" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * 1000,
              y: Math.random() * 800,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, -100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20"
        >
          {/* Profile Photo */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 10, 0, -10, 0],
                rotateX: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              {/* Glowing ring */}
              <motion.div 
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-light via-purple to-pink opacity-75 blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Profile image */}
              <motion.div
                whileHover={{ scale: 1.05, rotateZ: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
              >
                <img 
                  src={profilePhoto} 
                  alt="KAMALOSHENEE A"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 bg-gradient-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                Web Developer
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            variants={itemVariants}
            className="text-center lg:text-left text-white max-w-xl"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-3xl"
              >
                👋
              </motion.span>
              <span className="text-lg md:text-xl font-medium text-white/90">Hello, I'm</span>
            </motion.div>
            
            {/* Name */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="block">KAMALOSHENEE</span>
              <motion.span 
                className="text-teal-light block"
                animate={{ 
                  textShadow: [
                    "0 0 10px hsl(189 56% 45% / 0.5)",
                    "0 0 20px hsl(189 56% 45% / 0.8)",
                    "0 0 10px hsl(189 56% 45% / 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ARUL
              </motion.span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed"
            >
              A passionate <span className="text-teal-light font-semibold">Web Developer</span> & 
              <span className="text-pink font-semibold"> CSE Student</span> at KSR College of Engineering.
              Building creative digital experiences with modern technologies.
            </motion.p>
            
            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex justify-center lg:justify-start gap-4 mb-8"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    backgroundColor: "rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-teal-light transition-colors duration-300 backdrop-blur-sm"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-accent text-white px-8 py-6 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple/50 transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  onClick={scrollToNext}
                  className="border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 px-8 py-6 rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300"
                >
                  Explore More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.button 
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
