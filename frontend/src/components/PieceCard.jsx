import { useNavigate } from "react-router-dom";
import "../styles/PieceCard.css";
import { getPieceDuration } from "../services/api";
import { useEffect, useState } from "react";

export function PieceCard({ piece, onDelete, onEdit }) {
  const navigate = useNavigate();

  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDuration = async () => {
      if (!piece.id) return;

      try {
        setLoading(true);
        setError(null);

        const durationData = await getPieceDuration(piece.id);
        setDuration(durationData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDuration();
  }, [piece.id]);

  const handleEditClick = () => {
    if (onEdit) onEdit(piece);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(piece.id);
  };

  const handlePracticeClick = () => {
    navigate(`/pieces/${piece.id}`);
  };

  return (
    <div className="piece-card">
      <div className="piece-header">
        <h3 className="piece-title">{piece.title}</h3>
        <p className="piece-composer">{piece.composer}</p>
      </div>

      <div className="piece-body">
        <div className="piece-status">Status: {piece.status}</div>
        <div className="piece-duration">
          Total Practice: {loading ? "Loading..." : `${duration} mins`}
        </div>
        {piece.rating && (
          <div className="piece-rating">
            Rating: {"★".repeat(piece.rating)} {"☆".repeat(5 - piece.rating)}
          </div>
        )}
        {piece.notes && <p className="piece-notes">{piece.notes}</p>}
      </div>

      <div className="piece-actions">
        <button className="btn-practice" onClick={handlePracticeClick}>
          Practice
        </button>
        <button className="btn-edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}
