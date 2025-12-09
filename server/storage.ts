import { type User, type InsertUser, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { Contact } from "./models/Contact";
import { connectDB } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MongoStorage implements IStorage {
  constructor() {
    connectDB();
  }

  async getUser(id: string): Promise<User | undefined> {
    // Placeholder - return undefined as we are not using Mongo for Users yet
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Placeholder
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Placeholder - not implemented for Mongo yet
    throw new Error("User storage not implemented in MongoStorage");
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const contact = new Contact(insertMessage);
    await contact.save();
    // Mongoose document to plain object conversion usually needed, but for simple interface matching:
    return {
      id: (contact._id as any).toString(),
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt
    } as ContactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return contacts.map(contact => ({
      id: (contact._id as any).toString(),
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt
    })) as ContactMessage[];
  }
}

export const storage = new MongoStorage();
