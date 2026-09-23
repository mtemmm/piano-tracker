import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPieces, deletePiece } from "../services/api";
import { PieceCard } from "./PieceCard";

export function ListPieces() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleEditPiece = (piece) => {
    console.log("Edit clicked for piece:", piece.title);
  };

  if (loading) return <div>Loading pieces...</div>;
  if (error) return <div>Error loading pieces: {error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>My Piano Pieces</h2>
        <Link
          to="/add"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3182ce",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          + Add New Piece
        </Link>
      </div>

      {pieces.length === 0 ? (
        <p>No pieces found in database.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {pieces.map((piece) => (
            <PieceCard
              key={piece.id}
              piece={piece}
              onDelete={handleDeletePiece}
              onEdit={handleEditPiece}
            />
          ))}
        </div>
      )}
    </div>
  );
}
