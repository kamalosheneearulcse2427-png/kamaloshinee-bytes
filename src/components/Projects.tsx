import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SpaceBackground from "./SpaceBackground";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack online shopping platform with cart functionality, user authentication, and payment integration.",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    },
    {
      title: "Task Management System",
      description: "React-based task manager with drag-and-drop functionality, real-time updates, and team collaboration features.",
      category: "Productivity Tool",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather application using API integration, displaying forecasts with beautiful visualizations.",
      category: "API Integration",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    },
    {
      title: "Portfolio Template",
      description: "Modern, responsive portfolio template with dark mode, smooth animations, and customizable sections.",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    },
    {
      title: "Blog Platform",
      description: "Content management system with rich text editor, category management, and SEO optimization.",
      category: "CMS",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    },
    {
      title: "Fitness Tracker",
      description: "Mobile-responsive fitness application tracking workouts, nutrition, and progress with data visualization.",
      category: "Health & Fitness",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -25, scale: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={ref}>
      <SpaceBackground starCount={120} />
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my skills and creativity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1500px' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.08,
                rotateY: 8,
                rotateX: 5,
                z: 50,
                transition: { duration: 0.4 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="group overflow-hidden bg-card border-accent/20 h-full shadow-lg hover:shadow-2xl transform-gpu transition-all duration-300">
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    whileHover={{ scale: 1.2, rotate: 2 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform-gpu"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 right-4"
                  >
                    <Button
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-white shadow-xl transform-gpu hover:scale-110 transition-transform"
                    >
                      View <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
                <CardContent className="p-6" style={{ transform: 'translateZ(20px)' }}>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;