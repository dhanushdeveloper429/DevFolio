import app, { setupApp } from "../server";

// Initialize the app (register routes, middleware, etc.)
// We use a cached promise to ensure setup only runs once per cold start
let appPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
    if (!appPromise) {
        appPromise = setupApp();
    }
    await appPromise;

    // Forward the request to Express
    app(req, res);
}
