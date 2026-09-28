import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPieces, getAiRecommendations } from "../services/api";
import "../styles/AiRecommendationsPage.css";

export function AiRecommendationsPage() {
  const [pieces, setPieces] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loadingPieces, setLoadingPieces] = useState(true);

  const [recommendations, setRecommendations] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        setLoadingPieces(true);
        const data = await getAllPieces();
        setPieces(data);
      } catch (err) {
        setError("Failed to load pieces: " + err.message);
      } finally {
        setLoadingPieces(false);
      }
    };
    fetchPieces();
  }, []);

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === pieces.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pieces.map((p) => p.id));
    }
  };

  const handleSubmit = async () => {
    if (selectedIds.length === 0) return;

    try {
      setLoadingAi(true);
      setError(null);
      const result = await getAiRecommendations(selectedIds);
      setRecommendations(result);
    } catch (err) {
      setError("Error getting AI recommendations: " + err.message);
    } finally {
      setLoadingAi(false);
    }
  };

  const getRawAiText = () => {
    if (!recommendations) return "";
    if (typeof recommendations === "string") return recommendations;
    return recommendations.response || JSON.stringify(recommendations, null, 2);
  };

  if (loadingPieces)
    return <div className="loading-text">Loading your pieces...</div>;

  return (
    <div className="ai-page-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <h1 className="main-titleAI">Get recommendations</h1>
      <p className="ai-subtitle">Select the pieces you like:</p>

      {pieces.length === 0 ? (
        <p className="no-pieces-msg">You don't have any pieces selected yet.</p>
      ) : (
        <div className="selection-box">
          <div className="selection-header">
            <button onClick={handleSelectAll} className="btn-select-all">
              {selectedIds.length === pieces.length
                ? "Deselect All"
                : "Select All"}
            </button>
            <span className="selection-count">
              Selected: <strong>{selectedIds.length}</strong> / {pieces.length}
            </span>
          </div>

          <div className="pieces-list">
            {pieces.map((piece) => (
              <label key={piece.id} className="piece-checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(piece.id)}
                  onChange={() => handleToggleSelect(piece.id)}
                  className="custom-checkbox"
                />
                <span className="piece-item-info">
                  <strong>{piece.title}</strong> — <em>{piece.composer}</em> (
                  {piece.status})
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={selectedIds.length === 0 || loadingAi}
        className="submit-ai-btn"
      >
        {loadingAi ? "Analyzing..." : "Get recommendations"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {recommendations && (
        <div className="ai-response-container">
          <h3 className="ai-response-title">AI recommendations</h3>
          <div className="ai-response-text">{getRawAiText()}</div>
        </div>
      )}
    </div>
  );
}
