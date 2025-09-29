import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Github, MapPin, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kamaloshenee.arul@gmail.com",
      href: "mailto:kamaloshenee.arul@gmail.com",
      color: "bg-teal"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8056577491",
      href: "tel:+918056577491",
      color: "bg-purple"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/a-kamaloshenee-arul-arul-5a916327",
      color: "bg-blue-600"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View my code",
      href: "https://github.com/kamaloshenee_app",
      color: "bg-gray-800"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate or have a question? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-card border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-accent p-3 rounded-lg mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="border-border focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="border-border focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or question..."
                      rows={5}
                      required
                      className="border-border focus:border-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-accent text-white hover:opacity-90 transition-all duration-300 py-3 font-medium"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <Card className="bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className={`${contact.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-card-foreground group-hover:text-accent transition-colors">
                                {contact.label}
                              </h4>
                              <p className="text-muted-foreground">
                                {contact.value}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Location & Availability */}
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-accent p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-card-foreground">
                    Location & Availability
                  </h4>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>📍 Tamil Nadu, India</p>
                  <p>⏰ Available for remote work</p>
                  <p>🎓 Open to internships and part-time opportunities</p>
                  <p>💼 Seeking entry-level positions in web development</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="bg-gradient-accent text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-bold mb-2">Quick Response</h4>
                <p className="text-white/90 text-sm">
                  I typically respond within 24 hours. Looking forward to discussing 
                  your project or opportunity!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;