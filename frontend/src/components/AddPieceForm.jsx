import { useState } from "react";
import { createPiece } from "../services/api";
import "../styles/AddPieceForm.css";

export function AddPieceForm({ onPieceAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    composer: "",
    status: "WISHLIST",
    rating: 3,
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      const createdPiece = await createPiece(formData);

      setFormData({
        title: "",
        composer: "",
        status: "WISHLIST",
        rating: 3,
        notes: "",
      });

      if (onPieceAdded) {
        onPieceAdded(createdPiece);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-piece-form">
      <h3>Add New Piece</h3>

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
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <button type="submit" disabled={submitting} className="submit-btn">
        {submitting ? "Saving..." : "Add Piece"}
      </button>
    </form>
  );
}
