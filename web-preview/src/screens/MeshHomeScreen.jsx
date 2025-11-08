import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ConnectionStatus from '../components/ConnectionStatus';
import NearbyDevices from '../components/NearbyDevices';
import MessageCard from '../components/MessageCard';

export default function MeshHomeScreen() {
  const navigate = useNavigate();
  const [peers] = useState([
    { id: '1', name: 'Alpha Node', rssi: -45, distance: '1.2' },
    { id: '2', name: 'Bravo Node', rssi: -62, distance: '3.8' },
  ]);
  const [health] = useState({ reliabilityScore: 'Good', successRate: 94 });

  const handleRequestHelp = () => {
    navigate('/send', { state: { mode: 'relief' } });
  };

  const handleSendUpdate = () => {
    navigate('/send', { state: { mode: 'status' } });
  };

  const handleViewPeers = () => {
    navigate('/peers');
  };

  const handleStressTest = () => {
    navigate('/stress');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.appName}>SafeLink Mesh</h1>
          <p style={styles.appSubtitle}>Offline lifeline for your community</p>
        </div>
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={styles.logo}
        >
          🔗
        </motion.span>
      </div>

      <div style={styles.scroll}>
        <ConnectionStatus health={health} peersCount={peers.length} />

        <div style={styles.quickActions}>
          <h2 style={styles.sectionTitle}>Quick actions</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div style={styles.actionsRow}>
              <button
                onClick={handleRequestHelp}
                style={{ ...styles.actionCard, ...styles.actionPrimary }}
              >
                <span style={styles.actionIcon}>🆘</span>
                <h3 style={styles.actionTitle}>Request help</h3>
                <p style={styles.actionText}>
                  Send a distress message with your location.
                </p>
              </button>

              <button onClick={handleSendUpdate} style={styles.actionCard}>
                <span style={styles.actionIcon}>✅</span>
                <h3 style={styles.actionTitle}>Status update</h3>
                <p style={styles.actionText}>
                  Let others know you're safe or available to help.
                </p>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div style={styles.actionsRow}>
              <button onClick={handleViewPeers} style={styles.actionCardSmall}>
                <h4 style={styles.smallTitle}>Nearby devices</h4>
                <p style={styles.smallText}>{peers.length} connected</p>
              </button>

              <button onClick={handleStressTest} style={styles.actionCardSmall}>
                <h4 style={styles.smallTitle}>Stress test</h4>
                <p style={styles.smallText}>Check mesh performance</p>
              </button>
            </div>
          </motion.div>
        </div>

        <NearbyDevices peers={peers} />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Active alerts & requests</h2>
          <MessageCard
            title="Medical support needed"
            body="Field clinic in Zone A requires bandages, antibiotics and clean water."
            priority="critical"
            locationLabel="Zone A camp • ~2.3 km"
            time="2 min ago"
          />
          <MessageCard
            title="Water distribution point"
            body="Clean water available near the old market for the next 3 hours."
            priority="normal"
            locationLabel="Old market • ~1.1 km"
            time="12 min ago"
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #F8FAFC, #E0E7FF)',
    padding: '16px',
    paddingTop: '18px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    paddingTop: '10px',
  },
  appName: {
    color: '#1E3A8A',
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  },
  appSubtitle: {
    color: '#64748B',
    fontSize: '13px',
    marginTop: '3px',
    margin: 0,
  },
  logo: {
    fontSize: '36px',
    display: 'inline-block',
  },
  scroll: {
    paddingBottom: '40px',
  },
  quickActions: {
    marginTop: '18px',
  },
  sectionTitle: {
    color: '#1E293B',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    margin: 0,
  },
  actionsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
    gap: '8px',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(148,163,184,0.4)',
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    outline: 'none',
  },
  actionPrimary: {
    backgroundColor: '#DBEAFE',
    border: '2px solid #3B82F6',
  },
  actionIcon: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '8px',
  },
  actionTitle: {
    color: '#1E293B',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '4px',
    margin: 0,
  },
  actionText: {
    color: '#64748B',
    fontSize: '12px',
    lineHeight: '16px',
    margin: 0,
  },
  actionCardSmall: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    padding: '12px',
    border: '1px solid rgba(55,65,81,0.7)',
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  smallTitle: {
    color: '#1E293B',
    fontSize: '13px',
    fontWeight: '600',
    margin: 0,
  },
  smallText: {
    color: '#64748B',
    fontSize: '11px',
    marginTop: '4px',
    margin: 0,
  },
  section: {
    marginTop: '20px',
    marginBottom: '20px',
  },
};

