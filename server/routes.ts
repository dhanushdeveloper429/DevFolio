import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", (req, res) => {
    // In a real implementation, this would serve an actual PDF file
    res.json({ 
      message: "Resume download functionality to be implemented",
      downloadUrl: "/resume.pdf" 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
