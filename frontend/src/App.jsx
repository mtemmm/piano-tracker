import { Routes, Route } from "react-router-dom";
import { ListPieces } from "./components/ListPieces";
import { AddPieceForm } from "./components/AddPieceForm";
import { PieceDetails } from "./components/PieceDetails"; // DODATO
import { AiRecommendationsPage } from "./components/AiRecommendationsPage";

export default function App() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Routes>
        <Route path="/" element={<ListPieces />} />
        <Route path="/add" element={<AddPieceForm />} />
        <Route path="/edit/:id" element={<AddPieceForm />} />
        <Route path="/pieces/:id" element={<PieceDetails />} />
        <Route path="/ai-recommendations" element={<AiRecommendationsPage />} />
      </Routes>
    </div>
  );
}
