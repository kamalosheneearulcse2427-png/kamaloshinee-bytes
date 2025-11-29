import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Send, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import SpaceBackground from "./SpaceBackground";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "kamaloshenee.arul@gmail.com",
      href: "mailto:kamaloshenee.arul@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXXX",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Location",
      value: "Tamil Nadu, India",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/kamaloshenee_app", label: "GitHub", color: "hover:bg-foreground hover:text-background" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/a-kamaloshenee-arul-arul-5a916327", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram", color: "hover:bg-pink hover:text-white" },
    { icon: <MessageCircle className="h-5 w-5" />, href: "#", label: "WhatsApp", color: "hover:bg-green-500 hover:text-white" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <SpaceBackground starCount={110} showNebula />
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-6 relative z-10">
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
            GET IN TOUCH
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-gradient-accent rounded-3xl p-8 text-white shadow-2xl">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold mb-6"
                >
                  Let's Work Together
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-white/90 mb-8 leading-relaxed"
                >
                  I'm always excited to collaborate on interesting projects. Whether you have a 
                  project idea or just want to connect, feel free to reach out!
                </motion.p>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">{item.label}</p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
                
                {/* Social Links */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 }}
                  className="mt-8 pt-6 border-t border-white/20"
                >
                  <p className="text-white/70 text-sm mb-4">Follow me on</p>
                  <div className="flex gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 1.1 + index * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 ${link.color}`}
                        aria-label={link.label}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card className="bg-gradient-card border-accent/20 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-background/50 border-accent/20 focus:border-teal h-12 rounded-xl transition-all duration-300"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-background/50 border-accent/20 focus:border-teal h-12 rounded-xl transition-all duration-300"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Input
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-background/50 border-accent/20 focus:border-teal h-12 rounded-xl transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={6}
                        className="bg-background/50 border-accent/20 focus:border-teal rounded-xl transition-all duration-300 resize-none"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-accent text-white h-14 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                      >
                        <motion.span
                          className="flex items-center justify-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          Send Message
                          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
