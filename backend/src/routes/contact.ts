import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  try {
    const { name, email, phone, tattooStyle, preferredDate, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required" });
      return;
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        tattooStyle,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        message,
      },
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});
