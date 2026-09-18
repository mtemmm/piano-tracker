const API_URL = "http://localhost:8080/api/pieces";

export const getAllPieces = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed");
  }
  return await response.json();
};
