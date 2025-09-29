import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-primary/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-teal-light/60 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple/60 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink/60 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-teal/60 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center z-10 text-white">
        {/* Date indicator */}
        <div className="mb-8 text-sm tracking-widest opacity-80">
          10-12<br />DECEMBER
        </div>
        
        {/* Main heading */}
        <div className="mb-8">
          <div className="text-6xl font-light mb-2">'31</div>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            INSPIRED<br />
            <span className="text-teal-light">CREATIONS</span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Passionate web developer crafting innovative digital experiences with modern technologies. 
          Currently studying CSE at KSR College of Engineering.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-3 rounded-lg font-medium transition-all duration-300">
            <Code2 className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-lg font-medium transition-all duration-300">
            <Sparkles className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
        </div>
        
        {/* Side elements */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-left hidden lg:block">
          <div className="text-xs opacity-60 mb-2">01</div>
          <div className="text-sm">WEB DEV</div>
          <div className="text-xs opacity-60">STUDENT</div>
        </div>
        
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-right hidden lg:block">
          <div className="text-xs opacity-60 mb-4">PORTFOLIO</div>
          <div className="text-sm mb-1">2024</div>
          <div className="text-xs opacity-60">COLLECTION</div>
        </div>
        
        {/* Next indicator */}
        <div className="absolute right-8 bottom-8 hidden lg:block">
          <div className="text-sm mb-2">NEXT</div>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300 lg:hidden"
      >
        <ArrowDown className="h-8 w-8 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;