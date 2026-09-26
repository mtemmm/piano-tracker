const API_URL = "http://localhost:8080/api/pieces";
const BASE_URL = "http://localhost:8080/api/sessions";

export const getAllPieces = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed");
  }
  return await response.json();
};

export const getPieceDuration = async (id) => {
  const response = await fetch(`${API_URL}/${id}/duration`);
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

export const createPracticeSession = async (pieceId, sessionData) => {
  const response = await fetch(`${BASE_URL}/${pieceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Greška prilikom snimanja sesije.");
  }

  return await response.json();
};

export const fetchSessionsForPiece = async (pieceId) => {
  const response = await fetch(`${BASE_URL}/piece/${pieceId}`);

  if (!response.ok) {
    throw new Error("Greška prilikom dobavljanja sesija.");
  }

  return await response.json();
};

export const deletePracticeSession = async (pieceId, sessionId) => {
  const response = await fetch(`${BASE_URL}/${pieceId}/${sessionId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Greška prilikom brisanja sesije.");
  }
};
