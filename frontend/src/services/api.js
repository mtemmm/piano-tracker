const API_URL = "http://localhost:8080/api/pieces";

export const getAllPieces = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed");
  }
  return await response.json();
};

export const createPiece = async (pieceData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pieceData),
  });

  if (!response.ok) {
    throw new Error("Failed to create piece");
  }

  return await response.json();
};

export const deletePiece = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete piece");
  }
};

export const getPieceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch piece details");
  }
  return await response.json();
};

export const updatePiece = async (id, pieceData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pieceData),
  });

  if (!response.ok) {
    throw new Error("Failed to update piece");
  }

  return await response.json();
};
