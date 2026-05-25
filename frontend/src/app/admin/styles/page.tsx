"use client";

import { useEffect, useState } from "react";
import { getAdminStyles, createStyle, updateStyle, deleteStyle } from "@/lib/api";
import type { TattooStyle } from "@/types";
import styles from "./styles.module.css";

export default function StylesPage() {
  const [styleList, setStyleList] = useState<TattooStyle[]>([]);
  const [editing, setEditing] = useState<TattooStyle | null>(null);
  const [form, setForm] = useState({ name: "", description: "", icon: "", order: 0 });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getAdminStyles();
    setStyleList(data);
  }

  function openEdit(style: TattooStyle) {
    setEditing(style);
    setForm({ name: style.name, description: style.description || "", icon: style.icon || "", order: style.order });
    setShowForm(true);
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: "", description: "", icon: "", order: styleList.length });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await updateStyle(editing.id, form);
    } else {
      await createStyle(form);
    }
    setShowForm(false);
    setEditing(null);
    await load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this style?")) return;
    await deleteStyle(id);
    await load();
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Tattoo Styles</h1>
        <button onClick={openCreate} className={styles.addBtn}>+ Add Style</button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Icon</label>
              <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={styles.input} />
            </div>
            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.label}>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={styles.textarea} />
            </div>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn}>{editing ? "Update" : "Create"}</button>
            <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      )}

      <div className={styles.grid}>
        {styleList.map((style) => (
          <div key={style.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{style.icon || "🎨"}</span>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardName}>{style.name}</h3>
                <p className={styles.cardOrder}>Order: {style.order}</p>
              </div>
            </div>
            <p className={styles.cardDesc}>{style.description}</p>
            <div className={styles.cardActions}>
              <button onClick={() => openEdit(style)} className={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(style.id)} className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
