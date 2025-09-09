import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiLinkedin, SiGithub, SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send a message.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">Get In Touch</h2>
          <p className="text-muted-foreground text-lg" data-testid="contact-subtitle">
            Ready to discuss your next project or opportunity? Let's connect!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Terminal Contact Info */}
          <div className="bg-black/90 border border-primary shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] rounded-lg p-6 font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center mb-4 text-primary dark:text-cyan-400">
              <Mail className="w-4 h-4 mr-2" />
              <span>contact_info@portfolio:~</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-blue-400">[INFO] Personal contact protocol initialized</div>
              <div className="text-gray-300">─────────────────────────────────────────</div>
              
              <div className="space-y-1">
                <div className="text-cyan-400 dark:text-cyan-400">$ cat contact/email.txt</div>
                <div className="text-green-400 ml-4" data-testid="contact-email">→ john.developer@email.com</div>
                
                <div className="text-cyan-400 dark:text-cyan-400">$ cat contact/phone.txt</div>
                <div className="text-green-400 ml-4" data-testid="contact-phone">→ +1 (555) 123-4567</div>
                
                <div className="text-cyan-400 dark:text-cyan-400">$ cat contact/location.txt</div>
                <div className="text-green-400 ml-4" data-testid="contact-location">→ Atlanta, GA</div>
              </div>
              
              <div className="text-gray-300 mt-4">─────────────────────────────────────────</div>
              <div className="text-blue-400">[SOCIAL] External connection endpoints:</div>
              
              <div className="space-y-1 mt-2">
                <div className="flex items-center">
                  <span className="text-cyan-400 dark:text-cyan-400">$ curl -X GET </span>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-primary transition-colors ml-1"
                    data-testid="social-linkedin"
                  >
                    linkedin.com/in/profile
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 dark:text-cyan-400">$ git clone </span>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-primary transition-colors ml-1"
                    data-testid="social-github"
                  >
                    github.com/developer
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 dark:text-cyan-400">$ ping </span>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-primary transition-colors ml-1"
                    data-testid="social-twitter"
                  >
                    twitter.com/handle
                  </a>
                </div>
              </div>
              
              <div className="text-gray-300 mt-4">─────────────────────────────────────────</div>
              <div className="text-yellow-400">[STATUS] All communication channels online</div>
              <div className="text-green-400">[READY] Awaiting incoming connections...</div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-2"
                      data-testid="input-firstname"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-2"
                      data-testid="input-lastname"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="mt-2"
                    data-testid="input-subject"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2"
                    data-testid="input-message"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
