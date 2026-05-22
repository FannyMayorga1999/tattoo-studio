import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const stylesRouter = Router();

stylesRouter.get("/", async (_req, res) => {
  try {
    const styles = await prisma.tattooStyle.findMany({
      orderBy: { order: "asc" },
    });
    res.json(styles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch styles" });
  }
});
