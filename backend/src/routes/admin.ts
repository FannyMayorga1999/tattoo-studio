import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype.split("/")[1]);
    cb(null, ext && mime);
  },
});

export const adminRouter = Router();
adminRouter.use(authenticate);

adminRouter.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const url = `http://localhost:${process.env.PORT || 4000}/uploads/${req.file.filename}`;
  res.json({ url });
});

adminRouter.put("/artist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const artist = await prisma.artist.update({ where: { id: Number(id) }, data });
    res.json(artist);
  } catch {
    res.status(500).json({ error: "Failed to update artist" });
  }
});

adminRouter.get("/portfolio", async (_req, res) => {
  try {
    const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

adminRouter.post("/portfolio", async (req, res) => {
  try {
    const item = await prisma.portfolioItem.create({ data: req.body });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
});

adminRouter.put("/portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.portfolioItem.update({ where: { id: Number(id) }, data: req.body });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update portfolio item" });
  }
});

adminRouter.delete("/portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.portfolioItem.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

adminRouter.get("/styles", async (_req, res) => {
  try {
    const styles = await prisma.tattooStyle.findMany({ orderBy: { order: "asc" } });
    res.json(styles);
  } catch {
    res.status(500).json({ error: "Failed to fetch styles" });
  }
});

adminRouter.post("/styles", async (req, res) => {
  try {
    const style = await prisma.tattooStyle.create({ data: req.body });
    res.status(201).json(style);
  } catch {
    res.status(500).json({ error: "Failed to create style" });
  }
});

adminRouter.put("/styles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const style = await prisma.tattooStyle.update({ where: { id: Number(id) }, data: req.body });
    res.json(style);
  } catch {
    res.status(500).json({ error: "Failed to update style" });
  }
});

adminRouter.delete("/styles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tattooStyle.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete style" });
  }
});

adminRouter.get("/contact", async (_req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

adminRouter.put("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await prisma.contactMessage.update({
      where: { id: Number(id) },
      data: { read: req.body.read },
    });
    res.json(message);
  } catch {
    res.status(500).json({ error: "Failed to update message" });
  }
});

adminRouter.delete("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

adminRouter.get("/appointments", async (_req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({ orderBy: { date: "desc" } });
    res.json(appointments);
  } catch {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

adminRouter.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: req.body.status },
    });
    res.json(appointment);
  } catch {
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

adminRouter.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});
