import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const personalData = {
    name: "Dhanush Developer",
    role: "Senior Enterprise Software Specialist",
    email: "john.developer@email.com",
    phone: "+1 234 567 890",
    address: "San Francisco, CA",
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
    },
    about: {
        title: "About Me",
        subtitle: "Passionate about building robust, scalable software solutions that drive business value and enhance user experiences.",
        description: [
            "With over 7 years of experience in enterprise software development, I've had the privilege of working with industry leaders including Anthem, American Express, Molina Healthcare, and Macy's. My expertise spans full-stack development, system architecture, and leading cross-functional teams to deliver mission-critical applications.",
            "I specialize in building scalable, maintainable solutions that meet complex business requirements while ensuring optimal performance and security. My approach combines technical excellence with strategic thinking to drive meaningful business outcomes.",
        ],
    },
    hero: {
        title: "Senior Developer",
        description: [
            "Enterprise software specialist with 7+ years of experience",
            "Architect of scalable solutions and system architecture",
            "Fortune 500 team leadership expertise"
        ]
    },
    stats: {
        experience: "7+",
        companies: "5"
    },
    skills: [
        {
            title: "Frontend",
            icon: "Laptop",
            skills: [
                { name: "React/Next.js", level: 100 },
                { name: "TypeScript", level: 85 },
                { name: "Angular", level: 80 }
            ]
        },
        {
            title: "Backend",
            icon: "Server",
            skills: [
                { name: "Node.js", level: 100 },
                { name: "Java/Spring", level: 85 },
                { name: "C#/.NET", level: 80 },
                { name: "Python", level: 75 }
            ]
        },
        {
            title: "Cloud & DevOps",
            icon: "Cloud",
            skills: [
                { name: "AWS", level: 100 },
                { name: "Docker", level: 85 },
                { name: "Kubernetes", level: 75 },
                { name: "CI/CD", level: 80 }
            ]
        }
    ],
    projects: [
        {
            id: "healthcare-platform",
            title: "Healthcare Management Platform",
            description: "Enterprise healthcare solution for member enrollment and claims processing with 99.9% uptime.",
            technologies: ["React", "Node.js", "AWS"],
            icon: "Heart",
            liveUrl: "https://example.com",
            githubUrl: "https://github.com"
        },
        {
            id: "payment-dashboard",
            title: "Payment Processing Dashboard",
            description: "Real-time payment analytics dashboard handling millions of transactions daily.",
            technologies: ["Angular", "Java", "Spring"],
            icon: "CreditCard",
            liveUrl: "https://example.com",
            githubUrl: "https://github.com"
        },
        {
            id: "ecommerce-platform",
            title: "E-commerce Platform",
            description: "Full-stack e-commerce solution with inventory management and order processing.",
            technologies: ["Next.js", "TypeScript", "PostgreSQL"],
            icon: "ShoppingCart",
            liveUrl: "https://example.com",
            githubUrl: "https://github.com"
        }
    ]
};
