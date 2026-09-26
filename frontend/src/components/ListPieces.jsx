import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPieces, deletePiece } from "../services/api";
import { PieceCard } from "./PieceCard";
import { useNavigate, useParams } from "react-router-dom";

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

  const filteredPieces = pieces.filter((piece) => {
    if (statusFilter === "ALL") return true;
    return piece.status === statusFilter;
  });

  const handleEditPiece = (piece) => {
    navigate(`/edit/${piece.id}`);
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
        <h2>Piano tracker app</h2>
        <br />
        <Link to="/add" className="addPiece-btn">
          Add new piece
        </Link>
      </div>

      <div className="filter">
        <label htmlFor="status-filter" style={{ fontWeight: "bold" }}>
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="ALL">All Statuses</option>
          <option value="WISHLIST">WISHLIST</option>
          <option value="LEARNING">LEARNING</option>
          <option value="FINISHED">FINISHED</option>
        </select>
      </div>

      {filteredPieces.length === 0 ? (
        <p>No pieces found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredPieces.map((piece) => (
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
