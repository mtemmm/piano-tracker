import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createPiece, updatePiece, getPieceById } from "../services/api";
import "../styles/AddPieceForm.css";

export function AddPieceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    composer: "",
    status: "WISHLIST",
    rating: 3,
    notes: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchPiece = async () => {
        try {
          const data = await getPieceById(id);
          setFormData({
            title: data.title || "",
            composer: data.composer || "",
            status: data.status || "WISHLIST",
            rating: data.rating || 3,
            notes: data.notes || "",
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPiece();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEditMode) {
        await updatePiece(id, formData);
      } else {
        await createPiece(formData);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading-text">Loading...</div>;

  return (
    <div className="add-piece-container">
      <Link to="/" className="back-btn">
        ← Back to List
      </Link>

      <form onSubmit={handleSubmit} className="add-piece-form">
        <h3>{isEditMode ? "Edit Piece" : "Add New Piece"}</h3>

        {error && <p className="error-message">Error: {error}</p>}

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Composer:</label>
          <input
            type="text"
            name="composer"
            value={formData.composer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="WISHLIST">WISHLIST</option>
            <option value="LEARNING">LEARNING</option>
            <option value="FINISHED">FINISHED</option>
          </select>
        </div>

        <div className="form-group">
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? "Saving..." : isEditMode ? "Update Piece" : "Add Piece"}
        </button>
      </form>
    </div>
  );
}
