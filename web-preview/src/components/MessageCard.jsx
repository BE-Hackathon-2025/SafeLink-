import React from 'react';
import { motion } from 'framer-motion';

const PRIORITY_COLORS = {
  critical: '#EF4444',
  high: '#F97316',
  normal: '#10B981',
  low: '#3B82F6',
};

export default function MessageCard({ title, body, priority, locationLabel, time }) {
  const color = PRIORITY_COLORS[priority] || PRIORITY_COLORS.normal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={styles.card}
    >
      <div style={styles.header}>
        <div style={{ ...styles.priorityDot, backgroundColor: color }} />
        <h4 style={styles.title}>{title}</h4>
      </div>
      <p style={styles.body}>{body}</p>
      <div style={styles.footer}>
        {locationLabel && <span style={styles.meta}>📍 {locationLabel}</span>}
        {time && <span style={styles.meta}>🕐 {time}</span>}
      </div>
    </motion.div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '10px',
    borderLeft: '4px solid #3B82F6',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '6px',
  },
  priorityDot: {
    width: '8px',
    height: '8px',
    borderRadius: '4px',
    marginRight: '6px',
  },
  title: {
    color: '#1E293B',
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  },
  body: {
    color: '#475569',
    fontSize: '13px',
    marginBottom: '8px',
    lineHeight: '20px',
    margin: 0,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
  },
  meta: {
    color: '#94A3B8',
    fontSize: '11px',
  },
};

