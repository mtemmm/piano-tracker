import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const renderPieceSummary = (piece, metricLabel, isRating = false) => {
    if (!piece) return <p className="no-data">No data available</p>;

    const metricValue = isRating
      ? piece.rating
        ? `⭐ ${piece.rating} / 5`
        : null
      : piece.duration !== undefined && piece.duration !== null
        ? formatTime(piece.duration)
        : null;

    return (
      <div className="stats-piece-info">
        <div className="stats-piece-title">{piece.title}</div>
        <div className="stats-piece-composer">
          by {piece.composer || "Unknown"}
        </div>
        {metricValue && (
          <div className="stats-piece-metric">
            {metricLabel}: {metricValue}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="loading-text">Loading...</div>;

  if (error)
    return (
      <div className="stats-page-container">
        <div className="error-message">Error loading statistics: {error}</div>
      </div>
    );

  return (
    <div className="stats-page-container">
      <Link to="/" className="back-btn">
        ← Back to List
      </Link>

      <h2 className="stats-page-title">Piece statistics</h2>

      <div className="stats-grid">
        {/* Total Pieces */}
        <div className="stats-card">
          <span className="stats-card-title">Number of pieces</span>
          <span className="stats-card-main">{stats?.numberOfPieces ?? 0}</span>
        </div>

        <div className="stats-card">
          <span className="stats-card-title">Total practice time</span>
          <span className="stats-card-main">
            {formatTime(stats?.totalPracticeTime)}
          </span>
        </div>

        {/* Most Practiced Piece */}
        <div className="stats-card">
          <span className="stats-card-title">Most Practiced Piece</span>
          {renderPieceSummary(stats?.mostPracticedPiece, "Practice time")}
        </div>

        {/* Least Practiced Piece */}
        <div className="stats-card">
          <span className="stats-card-title">Least Practiced Piece</span>
          {renderPieceSummary(stats?.leastPracticedPiece, "Practice time")}
        </div>

        {/* Highest Rated Piece */}
        <div className="stats-card">
          <span className="stats-card-title">Highest Rated Piece</span>
          {renderPieceSummary(stats?.highestRatedPiece, "Rating", true)}
        </div>

        {/* Lowest Rated Piece */}
        <div className="stats-card">
          <span className="stats-card-title">Lowest Rated Piece</span>
          {renderPieceSummary(stats?.lowestRatedPiece, "Rating", true)}
        </div>
      </div>
    </div>
  );
}
