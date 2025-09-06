# Overview

This is a full-stack TypeScript portfolio website built with React and Express. The application showcases a senior developer's professional experience, skills, and projects through a modern, responsive interface. It features a contact form with backend API integration and uses shadcn/ui components for a polished user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for consistent type checking across the stack
- **API Design**: RESTful API endpoints with proper error handling and validation
- **Data Validation**: Zod schemas for request/response validation
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module reloading with Vite integration for seamless development

## Data Storage Solutions
- **Current Implementation**: Memory-based storage using Maps for development and testing
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema Management**: Shared TypeScript schemas between client and server using Drizzle and Zod
- **Migration Support**: Drizzle Kit configured for database migrations

## Authentication and Authorization
- **Current State**: Basic user schema defined but authentication not implemented
- **Prepared Infrastructure**: User management interfaces and storage methods ready for implementation
- **Session Handling**: Connect-pg-simple configured for PostgreSQL session storage

## External Dependencies
- **Database**: Neon PostgreSQL (configured but using memory storage currently)
- **UI Framework**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS for utility-first styling approach
- **Icons**: Lucide React for consistent iconography, React Icons for brand icons
- **Development Tools**: 
  - Replit-specific plugins for development environment integration
  - Runtime error overlay for better debugging experience
  - Cartographer plugin for enhanced development workflow

## Key Features
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts
- **Contact System**: Functional contact form with server-side validation and storage
- **Portfolio Sections**: About, Experience, Skills, Projects, and Contact sections with smooth scrolling
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Toast Notifications**: User feedback system for form submissions and errors
- **Resume Download**: API endpoint prepared for resume file serving

## Development Workflow
- **Monorepo Structure**: Client, server, and shared code organized in a single repository
- **Type Safety**: End-to-end TypeScript coverage with shared types and schemas
- **Hot Reloading**: Vite development server with Express API integration
- **Code Quality**: ESM modules, strict TypeScript configuration, and modern JavaScript features