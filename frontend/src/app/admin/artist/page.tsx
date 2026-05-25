"use client";

import { useEffect, useState } from "react";
import { getArtist, updateArtist } from "@/lib/api";
import type { Artist } from "@/types";
import styles from "./artist.module.css";

export default function ArtistPage() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [form, setForm] = useState({
    name: "", bio: "", email: "", phone: "", location: "", experience: 0,
    instagram: "", facebook: "", pinterest: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getArtist().then((data) => {
      setArtist(data);
      setForm({
        name: data.name,
        bio: data.bio,
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        experience: data.experience || 0,
        instagram: data.socialLinks?.instagram || "",
        facebook: data.socialLinks?.facebook || "",
        pinterest: data.socialLinks?.pinterest || "",
      });
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!artist) return;
    await updateArtist(artist.id, {
      name: form.name,
      bio: form.bio,
      email: form.email || null,
      phone: form.phone || null,
      location: form.location || null,
      experience: form.experience,
      socialLinks: {
        instagram: form.instagram || undefined,
        facebook: form.facebook || undefined,
        pinterest: form.pinterest || undefined,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Edit Artist</h1>

      <form onSubmit={handleSave} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label className={styles.label}>Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={styles.input} />
          </div>
          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label className={styles.label}>Bio *</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required rows={4} className={styles.textarea} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Experience (years)</label>
            <input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Instagram</label>
            <input type="text" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Facebook</label>
            <input type="text" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Pinterest</label>
            <input type="text" value={form.pinterest} onChange={(e) => setForm({ ...form, pinterest: e.target.value })} className={styles.input} />
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn}>Save Changes</button>
          {saved && <span className={styles.savedMsg}>Saved!</span>}
        </div>
      </form>
    </div>
  );
}
