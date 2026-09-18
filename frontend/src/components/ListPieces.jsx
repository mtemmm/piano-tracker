import { useState, useEffect } from "react";
import { getAllPieces } from "../services/api";

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
  if (loading) {
    return <div>Loading pieces...</div>;
  }
  if (error) {
    return <div>Error loading pieces: {error}</div>;
  }
  return (
    <div>
      <h2>My Piano Pieces</h2>

      {pieces.length === 0 ? (
        <p>No pieces found in database.</p>
      ) : (
        <ul>
          {pieces.map((piece) => (
            <li key={piece.id}>
              <strong>{piece.title}</strong> by {piece.composer || "Unknown"}
              <span> — Status: {piece.status}</span>
              {piece.difficulty && (
                <span> (Difficulty: {piece.difficulty})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
