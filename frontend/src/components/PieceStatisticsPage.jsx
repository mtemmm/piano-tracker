import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPieceStatistics } from "../services/api";
import "../styles/PieceStatisticsPage.css";

export function PieceStatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getPieceStatistics();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatTime = (minutes) => {
    if (minutes === null || minutes === undefined) return "N/A";
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs === 0) return `${mins}m`;
    return `${hrs}h ${mins}m`;
  };

  const renderPieceSummary = (piece, metricLabel) => {
    if (!piece) return <p className="no-data">No data available</p>;
    return (
      <div>
        <div className="stats-piece-title">{piece.title}</div>
        <div className="stats-piece-composer">by {piece.composer}</div>
        {piece.duration !== undefined && piece.duration !== null && (
          <div className="stats-piece-metric">
            {metricLabel}: {formatTime(piece.duration)}
          </div>
        )}
      </div>
    );
  };

  if (loading)
    return <div className="stats-page-container">Loading statistics...</div>;

  if (error)
    return (
      <div className="stats-page-container error-message">
        Error loading statistics: {error}
      </div>
    );

  return (
    <div className="stats-page-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <h2>Piece statistics</h2>

      <div className="stats-grid">
        {/* Total Pieces */}
        <div className="stats-card">
          <span className="stats-card-title">Total Pieces</span>
          <span className="stats-card-main">{stats?.numberOfPieces ?? 0}</span>
        </div>

        <div className="stats-card">
          <span className="stats-card-title">Total Practice Time</span>
          <span className="stats-card-main">
            {formatTime(stats?.totalPracticeTime)}
          </span>
        </div>

        <div className="stats-card">
          <span className="stats-card-title">Most Practiced Piece</span>
          {renderPieceSummary(stats?.mostPracticedPiece, "Practice time")}
        </div>

        <div className="stats-card">
          <span className="stats-card-title">Least Practiced Piece</span>
          {renderPieceSummary(stats?.leastPracticedPiece, "Practice time")}
        </div>

        <div className="stats-card">
          <span className="stats-card-title">Highest Rated Piece</span>
          {renderPieceSummary(stats?.highestRatedPiece, "Rating / Score")}
        </div>

        <div className="stats-card">
          <span className="stats-card-title">Lowest Rated Piece</span>
          {renderPieceSummary(stats?.lowestRatedPiece, "Rating / Score")}
        </div>
      </div>
    </div>
  );
}
