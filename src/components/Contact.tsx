import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "kamaloshenee.arul@gmail.com",
      href: "mailto:kamaloshenee.arul@gmail.com",
      color: "teal"
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "@kamaloshenee_app",
      href: "https://github.com/kamaloshenee_app",
      color: "purple"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "kamaloshenee Arul",
      href: "https://www.linkedin.com/in/a-kamaloshenee-arul-arul-5a916327",
      color: "pink"
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto" style={{ perspective: '2000px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="bg-gradient-card border-accent/20 h-full shadow-xl hover:shadow-2xl transform-gpu transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="transform-gpu"
                    >
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-background/50 border-accent/20 focus:border-accent transition-all duration-300 hover:shadow-lg transform-gpu"
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="transform-gpu"
                    >
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-background/50 border-accent/20 focus:border-accent transition-all duration-300 hover:shadow-lg transform-gpu"
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="transform-gpu"
                    >
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={5}
                        className="bg-background/50 border-accent/20 focus:border-accent transition-all duration-300 hover:shadow-lg transform-gpu resize-none"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-accent text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-2xl transform-gpu"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -20 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 3,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="bg-gradient-accent text-white border-0 shadow-xl hover:shadow-2xl transform-gpu transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
                    <p className="text-white/90 leading-relaxed">
                      I'm always excited to collaborate on interesting projects and learn from 
                      experienced professionals. Whether you have a project idea, need help with 
                      development, or just want to connect, feel free to reach out!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 50, rotateY: -20 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <Card className="bg-gradient-card border-accent/20 hover:border-accent/40 shadow-lg hover:shadow-2xl transform-gpu transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6 flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`bg-${link.color}/10 text-${link.color} w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-md`}
                          style={{ transform: 'translateZ(20px)' }}
                        >
                          {link.icon}
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{link.label}</p>
                          <p className="text-foreground font-semibold">{link.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;