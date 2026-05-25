"use client";

import { useEffect, useState } from "react";
import { getMessages, markMessageRead, deleteMessage } from "@/lib/api";
import type { ContactMessage } from "@/types";
import styles from "./messages.module.css";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getMessages();
    setMessages(data);
  }

  async function handleMarkRead(id: number, read: boolean) {
    await markMessageRead(id, read);
    await load();
    if (selected?.id === id) setSelected(null);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(id);
    if (selected?.id === id) setSelected(null);
    await load();
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Messages</h1>

      <div className={styles.grid}>
        <div className={styles.list}>
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`${styles.listItem} ${selected?.id === msg.id ? styles.listItemSelected : ""}`}
            >
              <div className={styles.listItemTop}>
                <span className={`${styles.listItemName} ${msg.read ? "" : styles.listItemNameUnread}`}>
                  {msg.name}
                </span>
                {!msg.read && <span className={styles.unreadDot} />}
              </div>
              <p className={styles.listItemEmail}>{msg.email}</p>
              <p className={styles.listItemDate}>{new Date(msg.createdAt).toLocaleDateString()}</p>
            </button>
          ))}
          {messages.length === 0 && <p className={styles.empty}>No messages yet</p>}
        </div>

        {selected && (
          <div className={styles.detailCard}>
            <div className={styles.detailTop}>
              <div>
                <h3 className={styles.detailName}>{selected.name}</h3>
                <p className={styles.detailContact}>{selected.email}</p>
                {selected.phone && <p className={styles.detailContact}>{selected.phone}</p>}
              </div>
              <span className={styles.detailDate}>{new Date(selected.createdAt).toLocaleString()}</span>
            </div>
            <div className={styles.detailMeta}>
              {selected.tattooStyle && <p>Style: {selected.tattooStyle}</p>}
              {selected.preferredDate && <p>Preferred date: {new Date(selected.preferredDate).toLocaleDateString()}</p>}
            </div>
            <p className={styles.detailMessage}>{selected.message}</p>
            <div className={styles.detailActions}>
              <button onClick={() => handleMarkRead(selected.id, !selected.read)} className={styles.markBtn}>
                {selected.read ? "Mark as Unread" : "Mark as Read"}
              </button>
              <button onClick={() => handleDelete(selected.id)} className={styles.deleteDetailBtn}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
