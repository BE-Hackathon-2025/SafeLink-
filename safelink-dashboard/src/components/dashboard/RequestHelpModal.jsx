// src/components/dashboard/RequestHelpModal.jsx

import React, { useState, useEffect, useRef } from "react";
import { createHelpRequest } from "../../api/helpRequestApi";
import "./RequestHelpModal.css";

export default function RequestHelpModal({ onClose, onSuccess }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [address, setAddress] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const recognitionRef = useRef(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        // Process all results from the current event
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setMessage((prev) => {
          // Get the base message (without any listening indicators)
          let baseMessage = prev.replace(/\[Listening\.\.\.\]/g, "").trim();
          
          // Add final transcripts
          if (finalTranscript) {
            baseMessage += (baseMessage ? " " : "") + finalTranscript.trim();
          }
          
          // Add interim transcript with indicator
          if (interimTranscript) {
            baseMessage += (baseMessage ? " " : "") + interimTranscript + " [Listening...]";
          }
          
          return baseMessage;
        });
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "no-speech") {
          setSpeechError("No speech detected. Please try again.");
        } else if (event.error === "audio-capture") {
          setSpeechError("No microphone found. Please check your microphone.");
        } else if (event.error === "not-allowed") {
          setSpeechError("Microphone permission denied. Please enable microphone access.");
        } else {
          setSpeechError("Speech recognition error. Please try typing instead.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        // Clean up [Listening...] text
        setMessage((prev) => prev.replace(/\[Listening\.\.\.\]/g, "").trim());
      };

      recognitionRef.current = recognition;
    } else {
      setIsSpeechSupported(false);
    }

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          
          // Reverse geocode to get address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            
            if (data.address) {
              const addr = data.address;
              const addressParts = [
                addr.house_number,
                addr.road,
                addr.neighbourhood || addr.suburb,
                addr.city || addr.town,
                addr.state,
              ].filter(Boolean);
              setAddress(addressParts.join(", ") || "Location detected");
            } else {
              setAddress("Location detected");
            }
          } catch (err) {
            setAddress("Location detected");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Could not get your location. Please enable location access.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      // Stop listening
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping recognition:", err);
      }
      setIsListening(false);
      // Clean up any listening indicators
      setMessage((prev) => prev.replace(/\[Listening\.\.\.\]/g, "").trim());
    } else {
      // Start listening
      setSpeechError(null);
      try {
        // Clear any previous listening text
        setMessage((prev) => prev.replace(/\[Listening\.\.\.\]/g, "").trim());
        recognitionRef.current.start();
      } catch (err) {
        console.error("Error starting recognition:", err);
        setIsListening(false);
        if (err.message && err.message.includes("already started")) {
          setSpeechError("Speech recognition is already running.");
        } else {
          setSpeechError("Could not start speech recognition. Please check your microphone permissions.");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Clean message of any interim text
    const cleanMessage = message.replace(/\[Listening\.\.\.\]/g, "").trim();
    
    if (!cleanMessage) {
      setError("Please enter a message describing your help request.");
      return;
    }

    if (!location) {
      setError("Location is required. Please enable location access.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestData = {
        message: cleanMessage,
        latitude: location.latitude,
        longitude: location.longitude,
        address: address || "Location detected",
        status: "pending",
      };

      await createHelpRequest(requestData);
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      console.error("Error creating help request:", err);
      setError(err.response?.data?.message || "Failed to create help request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="requestHelpModalOverlay" onClick={onClose}>
      <div className="requestHelpModal" onClick={(e) => e.stopPropagation()}>
        <button className="requestHelpModal__close" onClick={onClose}>
          ×
        </button>

        <div className="requestHelpModal__header">
          <h2>Request Help</h2>
          <p className="requestHelpModal__subtitle">
            Describe what you need help with. Your location will be automatically detected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="requestHelpModal__form">
          <div className="formGroup">
            <div className="formLabelRow">
              <label htmlFor="message" className="formLabel">
                What do you need help with? *
              </label>
              {isSpeechSupported && (
                <button
                  type="button"
                  className={`voiceButton ${isListening ? "voiceButton--active" : ""}`}
                  onClick={toggleListening}
                  disabled={loading}
                  title={isListening ? "Stop recording" : "Start voice input"}
                >
                  {isListening ? (
                    <>
                      <span className="voiceButton__icon voiceButton__icon--stop">⏹️</span>
                      <span className="voiceButton__text">Stop</span>
                    </>
                  ) : (
                    <>
                      <span className="voiceButton__icon">🎤</span>
                      <span className="voiceButton__text">Voice</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <textarea
              id="message"
              className={`formTextarea ${isListening ? "formTextarea--listening" : ""}`}
              placeholder="E.g., I need medical assistance for an injured person at the community center. We have limited supplies and need urgent help."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
              disabled={loading || isListening}
            />
            {isListening && (
              <div className="listeningIndicator">
                <span className="listeningIndicator__dot"></span>
                Listening... Speak clearly into your microphone.
              </div>
            )}
            {speechError && (
              <div className="speechError">
                {speechError}
              </div>
            )}
            <div className="formHint">
              {isSpeechSupported 
                ? "Type your message or click the microphone button to use voice input. Be as descriptive as possible."
                : "Be as descriptive as possible. Include details like: type of help needed, number of people, urgency, etc."}
            </div>
          </div>

          <div className="formGroup">
            <label className="formLabel">Your Location</label>
            {location ? (
              <div className="locationInfo">
                <div className="locationInfo__icon">📍</div>
                <div className="locationInfo__details">
                  <div className="locationInfo__address">{address || "Location detected"}</div>
                  <div className="locationInfo__coords">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="locationError">
                {locationError || "Getting your location..."}
              </div>
            )}
          </div>

          {error && (
            <div className="formError">
              {error}
            </div>
          )}

          <div className="requestHelpModal__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading || !location || !message.trim()}
            >
              {loading ? "Submitting..." : "Request Help"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

