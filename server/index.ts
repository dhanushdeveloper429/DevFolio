import { type Request, type Response, type NextFunction } from "express";
import { serveStatic, log } from "./utils";
import app, { initializeApp } from "./app";

// Setup logic for dev/prod server
const setupServer = async () => {
  const { server } = await initializeApp();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return server;
};

// Only listen if not running in Vercel (local dev or traditional hosting)
if (process.env.NODE_ENV !== "production" || (!process.env.VERCEL && !process.env.NETLIFY)) {
  (async () => {
    const server = await setupServer();
    const port = parseInt(process.env.PORT || '5001', 10);
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
    });
  })();
}

export { setupServer };
