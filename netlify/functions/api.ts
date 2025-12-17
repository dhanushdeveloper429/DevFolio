import serverless from "serverless-http";
import app, { setupApp } from "../../server";

// Initialize the app (register routes, middleware, etc.)
// We use a cached promise to ensure setup only runs once per cold start
let appPromise: Promise<any> | null = null;

export const handler = async (event: any, context: any) => {
    if (!appPromise) {
        appPromise = setupApp();
    }
    await appPromise;

    const handler = serverless(app);
    return handler(event, context);
};
