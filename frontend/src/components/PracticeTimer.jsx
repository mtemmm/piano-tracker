import React, { useState, useEffect } from "react";
import { createPracticeSession } from "../services/api";
import "../styles/PracticeTimer.css";

export default function PracticeTimer({ pieceId, onSessionSaved }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    if (!startTime) {
      setStartTime(new Date());
    }
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStopAndSave = async () => {
    setIsActive(false);
    const endTime = new Date();

    if (!startTime || seconds < 5) {
      setError("Can't record");
      return;
    }

    //YYYY-MM-DDTHH:mm:ss
    const formatLocalDateTime = (date) => {
      const pad = (num) => String(num).padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const sessionPayload = {
      startTime: formatLocalDateTime(startTime),
      endTime: formatLocalDateTime(endTime),
      notes: notes,
    };

    setLoading(true);
    setError("");

    try {
      const savedSession = await createPracticeSession(pieceId, sessionPayload);

      setSeconds(0);
      setStartTime(null);
      setNotes("");

      if (onSessionSaved) {
        onSessionSaved(savedSession);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="timer-card">
      <h3>Merač Vežbanja</h3>

      <div className="timer-display">{formatTime(seconds)}</div>

      <div className="button-group">
        {!isActive ? (
          <button
            className="btn btn-start"
            onClick={handleStart}
            disabled={loading}
          >
            {seconds === 0 ? "Start" : "Resume"}
          </button>
        ) : (
          <button className="btn btn-pause" onClick={handlePause}>
            Pause
          </button>
        )}

        <button
          className="btn btn-save"
          onClick={handleStopAndSave}
          disabled={loading || seconds === 0}
        >
          {loading ? "Recording" : "Stop and save"}
        </button>
      </div>

      <div className="input-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
