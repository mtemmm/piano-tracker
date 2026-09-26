import { useNavigate } from "react-router-dom";
import "../styles/PieceCard.css";

export function PieceCard({ piece, onDelete, onEdit }) {
  const navigate = useNavigate();

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
