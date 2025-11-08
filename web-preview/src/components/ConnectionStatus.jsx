import React from 'react';
import { motion } from 'framer-motion';

export default function ConnectionStatus({ health, peersCount }) {
  const status = health?.reliabilityScore || 'Good';
  const successRate = health?.successRate || 0;

  let color = '#10B981';
  if (status === 'Warning') color = '#F59E0B';
  if (status === 'Critical') color = '#EF4444';

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            ...styles.dot,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
        <div>
          <h3 style={styles.title}>Mesh Network</h3>
          <p style={styles.subtitle}>
            {status === 'Critical'
              ? 'Unstable connection'
              : status === 'Warning'
              ? 'Some delays'
              : 'Connected and stable'}
          </p>
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.badge}>
          <span style={styles.badgeIcon}>👥</span>
          <span style={styles.badgeText}>{peersCount} devices</span>
        </div>
        <p style={styles.meta}>{successRate}% delivery</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1E3A8A',
    padding: '16px',
    borderRadius: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    marginBottom: '18px',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: '14px',
    height: '14px',
    borderRadius: '7px',
    marginRight: '10px',
  },
  title: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
  },
  subtitle: {
    color: '#BFDBFE',
    fontSize: '12px',
    marginTop: '2px',
    margin: 0,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '999px',
    padding: '4px 10px',
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: '14px',
    marginRight: '4px',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '600',
  },
  meta: {
    color: '#93C5FD',
    fontSize: '11px',
    marginTop: '4px',
    margin: 0,
  },
};

