import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPieceById,
  fetchSessionsForPiece,
  deletePracticeSession,
} from "../services/api";
import PracticeTimer from "./PracticeTimer";
import "../styles/PieceDetails.css";

export function PieceDetails() {
  const { id } = useParams();
  const [piece, setPiece] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [pieceData, sessionsData] = await Promise.all([
          getPieceById(id),
          fetchSessionsForPiece(id),
        ]);
        setPiece(pieceData);
        setSessions(sessionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSessionSaved = (newSession) => {
    setSessions((prev) => [newSession, ...prev]);
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;
    try {
      await deletePracticeSession(id, sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (err) {
      alert("Error while deleting the session" + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!piece) return <div>Piece not found.</div>;

  return (
    <div className="piece-details-container">
      <Link to="/" className="back-link">
        Back to the piece list
      </Link>

      <div className="piece-header">
        <h2>{piece.title}</h2>
        <p className="composer">Composer: {piece.composer || "Unknown"}</p>
      </div>

      <div className="piece-details-grid">
        <div className="timer-section">
          <PracticeTimer pieceId={id} onSessionSaved={handleSessionSaved} />
        </div>

        <div className="sessions-history-section">
          <h3>Practice history</h3>
          {sessions.length === 0 ? (
            <p>Nothing recorded yet</p>
          ) : (
            <ul className="sessions-list">
              {sessions.map((session) => (
                <li key={session.id} className="session-item">
                  <div className="session-info">
                    <span className="session-date">
                      {new Date(session.startTime).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="session-duration">
                      ⏱️{" "}
                      {session.durationMinutes
                        ? `${session.durationMinutes} min`
                        : "Less than a min"}
                    </span>
                    {session.notes && (
                      <p className="session-notes">"{session.notes}"</p>
                    )}
                  </div>
                  <button
                    className="btn-delete-session"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
