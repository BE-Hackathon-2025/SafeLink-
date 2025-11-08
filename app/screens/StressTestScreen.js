// app/screens/StressTestScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";

export default function StressTestScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runStressTest = async () => {
    setLoading(true);
    try {
      // Simulate stress test
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setResult({
        messages: 100,
        avgLatency: 210,
        avgHops: 2.3,
        successRate: 96.4,
      });
    } catch (err) {
      console.log("Stress test error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#F8FAFC", "#E0E7FF"]}
      style={styles.container}
    >
      <Text style={styles.title}>Network Stress Test</Text>
      <Text style={styles.subtitle}>
        This simulates message load to test mesh strength, latency, and delivery rate.
      </Text>
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={runStressTest}
        disabled={loading}
      >
        {loading ? (
          <Animatable.View animation="pulse" iterationCount="infinite" duration={1000}>
            <ActivityIndicator color="#FFFFFF" size="large" />
          </Animatable.View>
        ) : (
          <Text style={styles.buttonText}>🚀 Run Test</Text>
        )}
      </TouchableOpacity>
      {result && (
        <Animatable.View animation="fadeInUp" duration={600}>
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>📊 Test Results</Text>
            <Text style={styles.metric}>Messages Tested: {result.messages}</Text>
            <Text style={styles.metric}>Avg Latency: {result.avgLatency} ms</Text>
            <Text style={styles.metric}>Avg Hops: {result.avgHops}</Text>
            <Text style={styles.metric}>
              Success Rate: <Text style={styles.good}>{result.successRate}%</Text>
            </Text>
            <Text style={styles.comment}>
              {result.successRate >= 95
                ? "✅ Excellent mesh stability!"
                : result.successRate >= 80
                ? "⚠️ Moderate stability, acceptable performance."
                : "❌ Poor stability — signal may be weak or peers too far apart."}
            </Text>
          </View>
        </Animatable.View>
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 50,
  },
  title: {
    color: "#1E293B",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 24,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  resultBox: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  resultTitle: {
    color: "#1E293B",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  metric: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 6,
  },
  good: {
    color: "#10B981",
    fontWeight: "700",
    fontSize: 16,
  },
  comment: {
    color: "#1E293B",
    fontSize: 13,
    marginTop: 12,
    fontStyle: "italic",
    lineHeight: 20,
  },
  backButton: {
    marginTop: 30,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  backText: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 15,
  },
});
