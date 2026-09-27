import { useNavigate } from "react-router-dom";
import "../styles/PieceCard.css";
import { getPieceDuration } from "../services/api";
import { useEffect, useState, useRef } from "react";

export function PieceCard({
  piece,
  onDelete,
  onEdit,
  onUploadSheetMusic,
  onDeleteSheetMusic,
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (onUploadSheetMusic) {
      try {
        setUploading(true);
        await onUploadSheetMusic(piece.id, file);
      } catch (err) {
        alert("Failed to upload sheet music " + err.message);
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    }
  };

  const handleDeleteSheetClick = async () => {
    if (onDeleteSheetMusic) {
      try {
        setUploading(true);
        await onDeleteSheetMusic(piece.id);
      } catch (err) {
        alert("Failed to delete sheet music: " + err.message);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="piece-card">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".pdf,image/*"
      />

      <div className="piece-header">
        <h3 className="piece-title">{piece.title}</h3>
        <p className="piece-composer">{piece.composer}</p>
      </div>

      <div className="piece-body">
        <div className="piece-status">Status: {piece.status}</div>
        <div className="piece-duration">
          Total practice: {loading ? "Loading..." : `${duration} mins`}
        </div>
        {piece.rating && (
          <div className="piece-rating">
            Rating: {"★".repeat(piece.rating)} {"☆".repeat(5 - piece.rating)}
          </div>
        )}
        {piece.notes && <p className="piece-notes">{piece.notes}</p>}

        <div className="piece-sheet-music-status">
          {piece.sheetMusicUrl ? (
            <div className="sheet-music-link-container">
              <a
                href={piece.sheetMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-sheet"
              >
                View Sheet Music
              </a>
              <button
                className="btn-delete-sheet"
                onClick={handleDeleteSheetClick}
                disabled={uploading}
                title="Delete sheet music"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              className="btn-upload-sheet"
              onClick={handleUploadClick}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload sheet music"}
            </button>
          )}
        </div>
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
