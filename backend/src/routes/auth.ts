import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "tattoo-studio-secret-key";

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, admin: { id: admin.id, username: admin.username, name: admin.name } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});
