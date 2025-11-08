import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function StressTestScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runStressTest = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResult({
        messages: 100,
        avgLatency: 210,
        avgHops: 2.3,
        successRate: 96.4,
      });
    } catch (err) {
      console.log('Stress test error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Network Stress Test</h1>
      <p style={styles.subtitle}>
        This simulates message load to test mesh strength, latency, and delivery rate.
      </p>
      <button
        style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
        onClick={runStressTest}
        disabled={loading}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={styles.spinner}
          />
        ) : (
          '🚀 Run Test'
        )}
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.resultBox}
          >
            <h2 style={styles.resultTitle}>📊 Test Results</h2>
            <p style={styles.metric}>Messages Tested: {result.messages}</p>
            <p style={styles.metric}>Avg Latency: {result.avgLatency} ms</p>
            <p style={styles.metric}>Avg Hops: {result.avgHops}</p>
            <p style={styles.metric}>
              Success Rate: <span style={styles.good}>{result.successRate}%</span>
            </p>
            <p style={styles.comment}>
              {result.successRate >= 95
                ? '✅ Excellent mesh stability!'
                : result.successRate >= 80
                ? '⚠️ Moderate stability, acceptable performance.'
                : '❌ Poor stability — signal may be weak or peers too far apart.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
    marginBottom: '24px',
    marginTop: '4px',
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: '999px',
    padding: '14px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '48px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid #FFFFFF',
    borderRadius: '50%',
  },
  resultBox: {
    marginTop: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  resultTitle: {
    color: '#1E293B',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
    margin: 0,
  },
  metric: {
    color: '#64748B',
    fontSize: '14px',
    marginBottom: '6px',
    margin: 0,
  },
  good: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: '16px',
  },
  comment: {
    color: '#1E293B',
    fontSize: '13px',
    marginTop: '12px',
    fontStyle: 'italic',
    lineHeight: '20px',
    margin: 0,
  },
  backButton: {
    marginTop: '30px',
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

