import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code2, Sparkles } from "lucide-react";
import { HeroScene } from "./3d/HeroScene";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
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
      <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px]"></div>
      
      <div className="container mx-auto px-6 text-center z-10 text-white">
        {/* Date indicator with animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-sm tracking-widest"
        >
          10-12<br />DECEMBER
        </motion.div>
        
        {/* Main heading with staggered animation */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl font-light mb-2"
          >
            '31
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold leading-tight"
          >
            INSPIRED<br />
            <span className="text-teal-light">CREATIONS</span>
          </motion.h1>
        </div>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Passionate web developer crafting innovative digital experiences with modern technologies. 
          Currently studying CSE at KSR College of Engineering.
        </motion.p>
        
        {/* CTA Buttons with hover 3D effect */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl transform-gpu">
            <Code2 className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl transform-gpu">
            <Sparkles className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
        </motion.div>
        
        {/* Side elements with parallax effect */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-left hidden lg:block"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="text-xs mb-2">01</div>
          <div className="text-sm">WEB DEV</div>
          <div className="text-xs opacity-60">STUDENT</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-right hidden lg:block"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="text-xs mb-4">PORTFOLIO</div>
          <div className="text-sm mb-1">2024</div>
          <div className="text-xs opacity-60">COLLECTION</div>
        </motion.div>
        
        {/* Next indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute right-8 bottom-8 hidden lg:block"
        >
          <div className="text-sm mb-2">NEXT</div>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300 lg:hidden z-20"
      >
        <ArrowDown className="h-8 w-8 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
