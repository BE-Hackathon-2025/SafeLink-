import React from 'react';
import { motion } from 'framer-motion';

function PeerRow({ peer, index }) {
  const strength = peer.rssi >= -60 ? 'Strong' : peer.rssi >= -75 ? 'Medium' : 'Weak';
  const strengthColor = peer.rssi >= -60 ? '#10B981' : peer.rssi >= -75 ? '#F59E0B' : '#EF4444';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={styles.row}
    >
      <div style={styles.rowLeft}>
        <div style={{ ...styles.deviceDot, backgroundColor: strengthColor }} />
        <div>
          <p style={styles.name}>{peer.name || 'Unknown device'}</p>
          <p style={styles.meta}>
            {strength} • {peer.distance ? `${peer.distance}m` : 'distance n/a'}
          </p>
        </div>
      </div>
      <p style={styles.rssi}>{peer.rssi} dBm</p>
    </motion.div>
  );
}

export default function NearbyDevices({ peers }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Nearby devices</h3>
        <span style={styles.count}>{peers.length} connected</span>
      </div>
      {peers.length === 0 ? (
        <p style={styles.empty}>
          No nearby devices yet. Keep the app open to join a mesh.
        </p>
      ) : (
        <div>
          {peers.map((peer, index) => (
            <PeerRow key={peer.id} peer={peer} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '18px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '14px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8px',
    alignItems: 'center',
  },
  title: {
    color: '#1E3A8A',
    fontSize: '15px',
    fontWeight: '600',
    margin: 0,
  },
  count: {
    color: '#64748B',
    fontSize: '12px',
  },
  empty: {
    color: '#94A3B8',
    fontSize: '13px',
    marginTop: '6px',
    textAlign: 'center',
    padding: '20px',
  },
  row: {
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E2E8F0',
  },
  rowLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDot: {
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    marginRight: '10px',
  },
  name: {
    color: '#1E293B',
    fontSize: '14px',
    fontWeight: '500',
    margin: 0,
  },
  meta: {
    color: '#64748B',
    fontSize: '12px',
    marginTop: '2px',
    margin: 0,
  },
  rssi: {
    color: '#94A3B8',
    fontSize: '12px',
    margin: 0,
  },
};

