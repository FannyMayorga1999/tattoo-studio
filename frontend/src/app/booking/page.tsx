"use client";

import { useState, useEffect } from "react";
import { createAppointment, getAvailableSlots, getStyles } from "@/lib/api";
import type { TattooStyle, TimeSlot } from "@/types";
import Link from "next/link";
import styles from "./booking.module.css";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [styleList, setStyleList] = useState<TattooStyle[]>([]);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: "",
    startTime: "",
    endTime: "",
    tattooStyle: "",
    description: "",
  });
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getStyles().then(setStyleList).catch(() => {});
  }, []);

  async function checkDate() {
    if (!form.date) return;
    setLoading(true);
    setError("");
    try {
      const available = await getAvailableSlots(form.date);
      setSlots(available);
      if (available.length === 0) {
        setError("No available slots for this date. Please choose another day.");
      } else {
        setStep(2);
      }
    } catch {
      setError("Failed to check availability");
    } finally {
      setLoading(false);
    }
  }

  function selectSlot(slot: TimeSlot) {
    setForm({ ...form, startTime: slot.start, endTime: slot.end });
    setStep(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createAppointment(form);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.successTitle}>Booking Confirmed!</h1>
          <p className={styles.successText}>We&apos;ll review your request and confirm within 24 hours.</p>
          <Link href="/" className={styles.successLink}>Back to Home</Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.page}>
      <div className={`${styles.wrapper} section-container`}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>

          <div className={styles.header}>
            <p className={styles.badge}>Book a Session</p>
            <h1 className={styles.title}>Reserve Your Appointment</h1>
          </div>

          <div className={styles.stepper}>
            {[1, 2, 3].map((s) => (
              <div key={s} className={styles.stepGroup}>
                <div className={`${styles.stepCircle} ${step >= s ? styles.stepActive : styles.stepInactive}`}>
                  {s}
                </div>
                <span className={`${styles.stepLabel} ${step >= s ? styles.stepLabelActive : styles.stepLabelInactive}`}>
                  {s === 1 ? "Date" : s === 2 ? "Time" : "Details"}
                </span>
                {s < 3 && <div className={`${styles.stepLine} ${step > s ? styles.stepLineActive : styles.stepLineInactive}`} />}
              </div>
            ))}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {step === 1 && (
            <div className={styles.card}>
              <div className={styles.field}>
                <label className={styles.label}>Select a Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  min={today}
                  className={styles.input}
                />
              </div>
              <button onClick={checkDate} disabled={!form.date || loading} className={`${styles.primaryBtn} ${styles.flex1}`} style={{ marginTop: "1rem" }}>
                {loading ? "Checking..." : "Check Availability"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ marginTop: "2rem" }}>
              <p className={styles.availabilityText}>
                Available slots for {new Date(form.date).toLocaleDateString()}:
              </p>
              <div className={styles.slotGrid}>
                {slots.map((slot) => (
                  <button key={slot.start} onClick={() => selectSlot(slot)} className={styles.slotBtn}>
                    {slot.start}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className={styles.backBtn}>← Choose another date</button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className={styles.card}>
              <p className={styles.bookingInfo}>
                Booking: {new Date(form.date).toLocaleDateString()} at {form.startTime} - {form.endTime}
              </p>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Name *</label>
                  <input type="text" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email *</label>
                  <input type="email" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone</label>
                  <input type="tel" value={form.clientPhone} onChange={(e) => setForm({ ...form, clientPhone: e.target.value })} className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Tattoo Style</label>
                  <select value={form.tattooStyle} onChange={(e) => setForm({ ...form, tattooStyle: e.target.value })} className={styles.select}>
                    <option value="">Select a style</option>
                    {styleList.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.field} style={{ marginTop: "0.5rem" }}>
                <label className={styles.label}>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className={styles.textarea} />
              </div>
              <div className={styles.btnRow}>
                <button type="submit" disabled={loading} className={`${styles.primaryBtn} ${styles.flex1}`}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
                <button type="button" onClick={() => setStep(2)} className={styles.outlineBtn}>Back</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
