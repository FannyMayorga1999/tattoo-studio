"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminPortfolio, getAdminStyles, getMessages, getAdminAppointments } from "@/lib/api";
import type { PortfolioItem, TattooStyle, ContactMessage, Appointment } from "@/types";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [stylesCount, setStylesCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    Promise.all([
      getAdminPortfolio().then((p: PortfolioItem[]) => setPortfolioCount(p.length)),
      getAdminStyles().then((s: TattooStyle[]) => setStylesCount(s.length)),
      getMessages().then((m: ContactMessage[]) => {
        setUnreadMessages(m.filter((msg) => !msg.read).length);
        setRecentMessages(m.slice(0, 5));
      }),
      getAdminAppointments().then((a: Appointment[]) => {
        setPendingAppointments(a.filter((app) => app.status === "pending").length);
        setRecentAppointments(a.slice(0, 5));
      }),
    ]);
  }, []);

  const stats = [
    { label: "Portfolio Items", value: portfolioCount, href: "/admin/portfolio", color: styles.statValueBlue },
    { label: "Tattoo Styles", value: stylesCount, href: "/admin/styles", color: styles.statValuePurple },
    { label: "Unread Messages", value: unreadMessages, href: "/admin/messages", color: styles.statValueYellow },
    { label: "Pending Appointments", value: pendingAppointments, href: "/admin/appointments", color: styles.statValueGreen },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={`${styles.statValue} ${stat.color}`}>{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className={styles.lists}>
        <div className={styles.listCard}>
          <h2 className={styles.listTitle}>Recent Messages</h2>
          {recentMessages.length === 0 ? (
            <p className={styles.listEmpty}>No messages yet</p>
          ) : (
            <ul className={styles.list}>
              {recentMessages.map((msg) => (
                <li key={msg.id} className={styles.listItem}>
                  <div className={styles.listItemInfo}>
                    <p className={`${styles.listItemName} ${!msg.read ? styles.listItemNameUnread : ""}`}>
                      {msg.name}
                    </p>
                    <p className={styles.listItemMeta}>{msg.email}</p>
                  </div>
                  <span className={`${styles.listItemBadge} ${msg.read ? styles.listItemBadgeRead : styles.listItemBadgeNew}`}>
                    {msg.read ? "Read" : "New"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.listCard}>
          <h2 className={styles.listTitle}>Recent Appointments</h2>
          {recentAppointments.length === 0 ? (
            <p className={styles.listEmpty}>No appointments yet</p>
          ) : (
            <ul className={styles.list}>
              {recentAppointments.map((app) => (
                <li key={app.id} className={styles.listItem}>
                  <div className={styles.listItemInfo}>
                    <p className={styles.listItemNameUnread}>{app.clientName}</p>
                    <p className={styles.listItemMeta}>
                      {new Date(app.date).toLocaleDateString()} at {app.startTime}
                    </p>
                  </div>
                  <span className={`${styles.statusBadge} ${
                    app.status === "pending" ? styles.statusPending :
                    app.status === "confirmed" ? styles.statusConfirmed :
                    styles.statusCancelled
                  }`}>
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
