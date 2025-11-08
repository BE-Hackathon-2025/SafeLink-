import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PRIORITIES = ['critical', 'high', 'normal', 'low'];
const PRIORITY_COLORS = {
  critical: '#EF4444',
  high: '#F97316',
  normal: '#10B981',
  low: '#3B82F6',
};

export default function SendMessageScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.state?.mode || 'status';
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('normal');
  const [includeLocation, setIncludeLocation] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const title = mode === 'relief' ? 'Request help' : 'Send status update';
  const placeholder =
    mode === 'relief'
      ? 'Describe what you need, how many people are affected, and any urgent risks.'
      : "Example: I'm safe at the school shelter, I can help with first aid.";

  const onAutoPriority = () => {
    const lower = text.toLowerCase();
    if (lower.includes('emergency') || lower.includes('urgent')) {
      setPriority('critical');
    } else if (lower.includes('need') || lower.includes('help')) {
      setPriority('high');
    } else {
      setPriority('normal');
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
      setTimeout(() => {
        setSent(false);
        navigate('/home');
      }, 1200);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/home')} style={styles.backButton}>
        ← Back
      </button>

      <h1 style={styles.title}>{title}</h1>
      <p style={styles.subtitle}>
        Your message will travel across nearby devices, even without the internet.
      </p>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={styles.successContainer}
          >
            <span style={styles.successIcon}>✅</span>
            <p style={styles.successText}>Message sent!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <textarea
        style={styles.input}
        disabled={submitting}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={styles.row}>
        <label style={styles.label}>Priority</label>
        <div style={styles.pillRow}>
          {PRIORITIES.map((p) => (
            <button
              key={p}
              disabled={submitting}
              onClick={() => setPriority(p)}
              style={{
                ...styles.pill,
                backgroundColor: priority === p ? PRIORITY_COLORS[p] : '#FFFFFF',
                borderColor: priority === p ? PRIORITY_COLORS[p] : '#CBD5E1',
                color: priority === p ? '#FFFFFF' : '#64748B',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.row}>
        <label style={styles.label}>Include location (if available)</label>
        <input
          type="checkbox"
          checked={includeLocation}
          onChange={(e) => setIncludeLocation(e.target.checked)}
          style={styles.switch}
        />
      </div>

      <button
        style={{ ...styles.button, opacity: submitting ? 0.5 : 1 }}
        disabled={submitting}
        onClick={handleSubmit}
      >
        {submitting ? 'Sending...' : 'Send message'}
      </button>

      <button
        onClick={onAutoPriority}
        disabled={!text.trim()}
        style={styles.autoLink}
      >
        🤖 Auto-detect priority from message
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #F8FAFC, #E0E7FF)',
    padding: '16px',
  },
  backButton: {
    marginBottom: '12px',
    background: 'none',
    border: 'none',
    color: '#3B82F6',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0,
  },
  title: {
    color: '#1E293B',
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
    marginBottom: '6px',
  },
  subtitle: {
    color: '#64748B',
    fontSize: '13px',
    marginTop: '6px',
    marginBottom: '20px',
    lineHeight: '18px',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: '10px',
  },
  successIcon: {
    fontSize: '60px',
    marginBottom: '8px',
  },
  successText: {
    color: '#10B981',
    fontSize: '16px',
    fontWeight: '700',
    margin: 0,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '2px solid #E2E8F0',
    color: '#1E293B',
    padding: '14px',
    fontSize: '14px',
    minHeight: '140px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  row: {
    marginTop: '18px',
  },
  label: {
    color: '#1E293B',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    display: 'block',
  },
  pillRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pill: {
    padding: '6px 14px',
    borderRadius: '999px',
    border: '2px solid',
    backgroundColor: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  switch: {
    width: '50px',
    height: '30px',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: '999px',
    padding: '14px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    marginTop: '28px',
    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
    transition: 'transform 0.2s',
  },
  autoLink: {
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#3B82F6',
    fontSize: '13px',
    marginTop: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: 0,
  },
};

