"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getAdminPortfolio, createPortfolioItem, updatePortfolioItem, deletePortfolioItem, uploadImage } from "@/lib/api";
import type { PortfolioItem } from "@/types";
import css from "./portfolio.module.css";

const PLACEHOLDER = "/images/placeholder.svg";

const categories = ["Traditional", "Realism", "Fine Line", "Geometric", "Blackwork", "Watercolor"];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", category: "Traditional", featured: false });
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== PLACEHOLDER) {
      img.src = PLACEHOLDER;
    }
  }, []);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getAdminPortfolio();
    setItems(data);
  }

  function openEdit(item: PortfolioItem) {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "", imageUrl: item.imageUrl, category: item.category, featured: item.featured });
    setPreview(item.imageUrl || PLACEHOLDER);
    setShowForm(true);
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: "", description: "", imageUrl: "", category: "Traditional", featured: false });
    setPreview(null);
    setShowForm(true);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm({ ...form, imageUrl: url });
      setPreview(url);
    } catch {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await updatePortfolioItem(editing.id, form);
    } else {
      await createPortfolioItem(form);
    }
    setShowForm(false);
    setEditing(null);
    setPreview(null);
    await load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await deletePortfolioItem(id);
    await load();
  }

  return (
    <div className={css.page}>
      <div className={css.pageHeader}>
        <h1 className={css.pageTitle}>Portfolio</h1>
        <button onClick={openCreate} className={css.addBtn}>+ Add Item</button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className={css.form}>
          <div className={css.formGrid}>
            <div className={css.formGroup}>
              <label className={css.label}>Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className={css.input} />
            </div>
            <div className={css.formGroup}>
              <label className={css.label}>Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={css.select}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className={`${css.formGroup} ${css.formGroupFull}`}>
              <label className={css.label}>Image</label>
              <div className={css.uploadArea}>
                <div className={css.previewWrap}>
                  <img
                    src={preview || PLACEHOLDER}
                    alt="Preview"
                    className={css.previewImg}
                    onError={handleImgError}
                  />
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
                <button type="button" onClick={() => fileRef.current?.click()} className={css.uploadBtn} disabled={uploading}>
                  {uploading ? "Uploading..." : "Choose file"}
                </button>
                {uploading && <span className={css.uploading}>Uploading...</span>}
              </div>
            </div>
            <div className={`${css.formGroup} ${css.formGroupFull}`}>
              <label className={css.label}>Image URL (or upload above)</label>
              <input type="text" value={form.imageUrl} onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setPreview(e.target.value || PLACEHOLDER); }} className={css.input} />
            </div>
            <div className={`${css.formGroup} ${css.formGroupFull}`}>
              <label className={css.label}>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={css.textarea} />
            </div>
            <div className={css.checkboxWrap}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className={css.checkbox} />
              <label className={css.checkboxLabel}>Featured</label>
            </div>
          </div>
          <div className={css.formActions}>
            <button type="submit" className={css.saveBtn}>{editing ? "Update" : "Create"}</button>
            <button type="button" onClick={() => setShowForm(false)} className={css.cancelBtn}>Cancel</button>
          </div>
        </form>
      )}

      <div className={css.grid}>
        {items.map((item) => (
          <div key={item.id} className={css.card}>
            <div className={css.cardImage}>
              <img
                src={item.imageUrl || PLACEHOLDER}
                alt={item.title}
                onError={handleImgError}
              />
            </div>
            <div className={css.cardBody}>
              <div className={css.cardHeader}>
                <h3 className={css.cardTitle}>{item.title}</h3>
                {item.featured && <span className={css.cardFeatured}>Featured</span>}
              </div>
              <p className={css.cardCategory}>{item.category}</p>
              <div className={css.cardActions}>
                <button onClick={() => openEdit(item)} className={css.editBtn}>Edit</button>
                <button onClick={() => handleDelete(item.id)} className={css.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
