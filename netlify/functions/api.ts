import serverless from "serverless-http";
import app, { initializeApp } from "../../server/app";

// Initialize the app (register routes, middleware, etc.)
// We use a cached promise to ensure setup only runs once per cold start
let appPromise: Promise<any> | null = null;

export const handler = async (event: any, context: any) => {
    if (!appPromise) {
        appPromise = initializeApp();
    }
    await appPromise;

    const handler = serverless(app);
    return handler(event, context);
};
