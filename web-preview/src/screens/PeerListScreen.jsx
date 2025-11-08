import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PeerListScreen() {
  const navigate = useNavigate();
  const [peers] = React.useState([
    { id: '11:22:33:44:55:66', name: 'Alpha Node', rssi: -45, distance: '1.2' },
    { id: '77:88:99:AA:BB:CC', name: 'Bravo Node', rssi: -62, distance: '3.8' },
    { id: 'DE:AD:BE:EF:FE:ED', name: 'Charlie Node', rssi: -78, distance: '8.5' },
  ]);

  const renderPeer = (peer, index) => {
    const strength = peer.rssi >= -60 ? '#10B981' : peer.rssi >= -75 ? '#F59E0B' : '#EF4444';

    return (
      <motion.div
        key={peer.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        style={styles.peerRow}
      >
        <div style={styles.peerLeft}>
          <span style={{ ...styles.deviceIcon, color: strength }}>📱</span>
          <div>
            <p style={styles.peerName}>{peer.name || 'Unknown Node'}</p>
            <p style={styles.meta}>
              ID: {peer.id.substring(0, 6)}... | {peer.distance ? `${peer.distance}m` : 'N/A'}
            </p>
          </div>
        </div>
        <p style={{ ...styles.rssi, color: strength }}>{peer.rssi} dBm</p>
      </motion.div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Connected Devices</h1>
      <p style={styles.subtitle}>
        These are nearby SafeLink nodes currently within your mesh range.
      </p>
      {peers.length === 0 ? (
        <p style={styles.empty}>No connected devices detected.</p>
      ) : (
        <div>{peers.map((peer, index) => renderPeer(peer, index))}</div>
      )}
      <button onClick={() => navigate('/home')} style={styles.backButton}>
        ← Back
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #F8FAFC, #E0E7FF)',
    padding: '18px',
    paddingTop: '50px',
  },
  title: {
    color: '#1E293B',
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  },
  subtitle: {
    color: '#64748B',
    fontSize: '13px',
    marginBottom: '20px',
    marginTop: '4px',
  },
  peerRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  peerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    fontSize: '28px',
    marginRight: '12px',
  },
  peerName: {
    color: '#1E293B',
    fontSize: '15px',
    fontWeight: '600',
    margin: 0,
  },
  meta: {
    color: '#64748B',
    fontSize: '12px',
    marginTop: '4px',
    margin: 0,
  },
  rssi: {
    fontSize: '13px',
    fontWeight: '600',
    margin: 0,
  },
  empty: {
    color: '#94A3B8',
    fontSize: '14px',
    marginTop: '40px',
    textAlign: 'center',
  },
  backButton: {
    marginTop: '20px',
    alignSelf: 'center',
    border: '2px solid #3B82F6',
    borderRadius: '999px',
    padding: '10px 24px',
    backgroundColor: '#FFFFFF',
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

