package com.mt.pianotracker.services;

import com.mt.pianotracker.domain.entities.Piece;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskService {

    List<Piece> listPieces(UUID pieceId);
    Piece createPiece(UUID pieceId, Piece piece);
    Optional<Piece> getPiece(UUID pieceId);
    Piece updatePiece(UUID pieceId, Piece piece);
    void deletePiece(UUID pieceId);

}
