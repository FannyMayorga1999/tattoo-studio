import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const appointmentsRouter = Router();

appointmentsRouter.post("/", async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, date, startTime, endTime, tattooStyle, description } = req.body;

    if (!clientName || !clientEmail || !date || !startTime || !endTime) {
      res.status(400).json({ error: "clientName, clientEmail, date, startTime, and endTime are required" });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        date: new Date(date),
        startTime,
        endTime,
        tattooStyle,
        description,
        status: "pending",
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

appointmentsRouter.get("/available", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      res.status(400).json({ error: "Date is required" });
      return;
    }

    const dateObj = new Date(date as string);
    dateObj.setHours(0, 0, 0, 0);
    const nextDay = new Date(dateObj);
    nextDay.setDate(nextDay.getDate() + 1);

    const existing = await prisma.appointment.findMany({
      where: {
        date: { gte: dateObj, lt: nextDay },
        status: { not: "cancelled" },
      },
      select: { startTime: true, endTime: true },
    });

    const allSlots = [];
    for (let h = 9; h < 18; h++) {
      allSlots.push({ start: `${String(h).padStart(2, "0")}:00`, end: `${String(h + 1).padStart(2, "0")}:00` });
    }

    const available = allSlots.filter((slot) => {
      const day = new Date(dateObj);
      const now = new Date();
      if (day.toDateString() === now.toDateString()) {
        const [h] = slot.start.split(":").map(Number);
        if (h <= now.getHours()) return false;
      }
      return !existing.some((e) => e.startTime === slot.start);
    });

    res.json(available);
  } catch {
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});
