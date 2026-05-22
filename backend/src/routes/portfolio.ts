import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const portfolioRouter = Router();

portfolioRouter.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category: String(category) } : {};
    const items = await prisma.portfolioItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

portfolioRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await prisma.portfolioItem.findUnique({ where: { id } });
    if (!item) {
      res.status(404).json({ error: "Portfolio item not found" });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio item" });
  }
});
