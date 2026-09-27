const API_URL = "http://localhost:8080/api/pieces";
const BASE_URL = "http://localhost:8080/api/sessions";
const AI_URL = "http://localhost:8080/api/ai";
const STATISTICS_URL = "http://localhost:8080/api/piece-statistics";

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
    throw new Error(errorData.message || "Error while creating a session");
  }

  return await response.json();
};

export const fetchSessionsForPiece = async (pieceId) => {
  const response = await fetch(`${BASE_URL}/piece/${pieceId}`);

  if (!response.ok) {
    throw new Error("Failed to get sessions for this piece");
  }

  return await response.json();
};

export const deletePracticeSession = async (pieceId, sessionId) => {
  const response = await fetch(`${BASE_URL}/${pieceId}/${sessionId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error while deleting session");
  }
};

export const uploadSheetMusic = async (pieceId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/${pieceId}/sheet-music`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to upload sheet music");
  }
  return await response.text();
};

export const deleteSheetMusic = async (pieceId) => {
  const response = await fetch(`${API_URL}/${pieceId}/sheet-music`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete sheet music");
  }
};

export const getAiRecommendations = async (pieceIds) => {
  const response = await fetch(AI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pieceIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI recommendations");
  }

  return await response.json();
};

export const getPieceStatistics = async () => {
  const response = await fetch(STATISTICS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch piece statistics");
  }
  return await response.json();
};
