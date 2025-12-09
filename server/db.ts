import mongoose from 'mongoose';

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL || '');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
