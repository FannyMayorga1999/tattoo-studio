"use client";

import { useEffect, useState } from "react";
import { getAdminAppointments, updateAppointmentStatus, deleteAppointment } from "@/lib/api";
import type { Appointment } from "@/types";
import styles from "./appointments.module.css";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getAdminAppointments();
    setAppointments(data);
  }

  async function handleStatus(id: number, status: string) {
    await updateAppointmentStatus(id, status);
    await load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this appointment?")) return;
    await deleteAppointment(id);
    await load();
  }

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Appointments</h1>
        <div className={styles.filters}>
          {["all", "pending", "confirmed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : styles.filterBtnInactive}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {filtered.map((app) => (
          <div key={app.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.clientInfo}>
                <h3 className={styles.clientName}>{app.clientName}</h3>
                <p className={styles.clientEmail}>{app.clientEmail}</p>
                {app.clientPhone && <p className={styles.clientPhone}>{app.clientPhone}</p>}
              </div>
              <span className={`${styles.statusBadge} ${
                app.status === "pending" ? styles.statusPending :
                app.status === "confirmed" ? styles.statusConfirmed :
                styles.statusCancelled
              }`}>
                {app.status}
              </span>
            </div>
            <div className={styles.details}>
              <span>Date: {new Date(app.date).toLocaleDateString()}</span>
              <span>Time: {app.startTime} - {app.endTime}</span>
              {app.tattooStyle && <span>Style: {app.tattooStyle}</span>}
            </div>
            {app.description && <p className={styles.description}>{app.description}</p>}
            <div className={styles.actions}>
              {app.status === "pending" && (
                <>
                  <button onClick={() => handleStatus(app.id, "confirmed")} className={styles.confirmBtn}>Confirm</button>
                  <button onClick={() => handleStatus(app.id, "cancelled")} className={styles.cancelActionBtn}>Cancel</button>
                </>
              )}
              {app.status === "confirmed" && (
                <button onClick={() => handleStatus(app.id, "cancelled")} className={styles.cancelActionBtn}>Cancel</button>
              )}
              <button onClick={() => handleDelete(app.id)} className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className={styles.empty}>No appointments found</p>}
      </div>
    </div>
  );
}
