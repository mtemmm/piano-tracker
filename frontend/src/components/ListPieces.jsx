import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllPieces,
  deletePiece,
  uploadSheetMusic,
  deleteSheetMusic,
} from "../services/api";
import { PieceCard } from "./PieceCard";
import "../styles/ListPieces.css";

export function ListPieces() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        setLoading(true);
        const data = await getAllPieces();
        setPieces(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPieces();
  }, []);

  const handleDeletePiece = async (id) => {
    try {
      await deletePiece(id);
      setPieces((prevPieces) => prevPieces.filter((piece) => piece.id !== id));
    } catch (err) {
      alert("Error deleting piece: " + err.message);
    }
  };

  const handleUploadSheetMusic = async (pieceId, file) => {
    const newUrl = await uploadSheetMusic(pieceId, file);
    setPieces((prevPieces) =>
      prevPieces.map((p) =>
        p.id === pieceId ? { ...p, sheetMusicUrl: newUrl } : p,
      ),
    );
  };

  const handleDeleteSheetMusic = async (pieceId) => {
    await deleteSheetMusic(pieceId);
    setPieces((prevPieces) =>
      prevPieces.map((p) =>
        p.id === pieceId ? { ...p, sheetMusicUrl: null } : p,
      ),
    );
  };

  const filteredPieces = pieces.filter((piece) => {
    if (statusFilter === "ALL") return true;
    return piece.status === statusFilter;
  });

  const handleEditPiece = (piece) => {
    navigate(`/edit/${piece.id}`);
  };

  if (loading)
    return <div className="list-pieces-container">Loading pieces...</div>;
  if (error)
    return (
      <div className="list-pieces-container">Error loading pieces: {error}</div>
    );

  return (
    <div className="list-pieces-container">
      <h2 className="main-title">piano practice</h2>
      <h2 className="second-title">- tracker app -</h2>

      <div className="action-buttons-container">
        <Link to="/add" className="addPiece-btn">
          Add new piece
        </Link>
        <Link to="/statistics" className="stats-btn">
          Statistics
        </Link>
        <Link to="/ai-recommendations" className="ai-btn">
          What to play next
        </Link>
      </div>

      <div className="filter-container">
        <label htmlFor="status-filter" className="filter-label">
          Filter by status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All</option>
          <option value="WISHLIST">WISHLIST</option>
          <option value="LEARNING">LEARNING</option>
          <option value="FINISHED">FINISHED</option>
        </select>
      </div>

      {filteredPieces.length === 0 ? (
        <p>No pieces found.</p>
      ) : (
        <div className="pieces-grid">
          {filteredPieces.map((piece) => (
            <PieceCard
              key={piece.id}
              piece={piece}
              onDelete={handleDeletePiece}
              onEdit={handleEditPiece}
              onUploadSheetMusic={handleUploadSheetMusic}
              onDeleteSheetMusic={handleDeleteSheetMusic}
            />
          ))}
        </div>
      )}
    </div>
  );
}
