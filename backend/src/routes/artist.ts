import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const artistRouter = Router();

artistRouter.get("/", async (_req, res) => {
  try {
    const artist = await prisma.artist.findFirst();
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});
