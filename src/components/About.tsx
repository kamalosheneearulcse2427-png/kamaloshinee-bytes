import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Users, MapPin } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Self-motivated and passionate about creating digital experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-accent mr-3" />
                  <h3 className="text-xl font-bold text-foreground">Education</h3>
                </div>
                <p className="text-muted-foreground">
                  Currently pursuing CSE at KSR College of Engineering (2nd year), 
                  building a strong foundation in computer science and programming.
                </p>
              </div>

              <div className="bg-gradient-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 text-pink mr-3" />
                  <h3 className="text-xl font-bold text-foreground">Passion</h3>
                </div>
                <p className="text-muted-foreground">
                  Dedicated to web development and creating innovative applications. 
                  Always eager to learn new technologies and improve my skills.
                </p>
              </div>

              <div className="bg-gradient-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-teal mr-3" />
                  <h3 className="text-xl font-bold text-foreground">Teaching</h3>
                </div>
                <p className="text-muted-foreground">
                  Part-time teacher for school students, sharing knowledge and 
                  helping others grow in their educational journey.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=500&q=80" 
                    alt="KAMALOSHENEE A"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Tamil Nadu, India</span>
                </div>
              </div>

              <Card className="bg-gradient-accent text-white border-0">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-bold mb-2">My Mission</h4>
                  <p className="text-white/90">
                    To bridge the gap between creativity and technology, 
                    creating meaningful digital solutions that make a positive impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;