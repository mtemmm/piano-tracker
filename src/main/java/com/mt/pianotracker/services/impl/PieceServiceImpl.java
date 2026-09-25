package com.mt.pianotracker.services.impl;

import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.domain.entities.PracticeSession;
import com.mt.pianotracker.repositories.PieceRepository;
import com.mt.pianotracker.repositories.PracticeSessionRepository;
import com.mt.pianotracker.services.PieceService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class PieceServiceImpl implements PieceService {

    private final PieceRepository pieceRepository;
    private final PracticeSessionRepository practiceSessionRepository;

    public PieceServiceImpl(PieceRepository pieceRepository, PracticeSessionRepository practiceSessionRepository) {
        this.pieceRepository = pieceRepository;
        this.practiceSessionRepository = practiceSessionRepository;
    }

    @Override
    public List<Piece> listPieces() {
        return pieceRepository.findAll();
    }

    @Transactional
    @Override
    public Piece createPiece(Piece piece) {
        if(piece.getId() != null){
            throw new IllegalArgumentException("This piece already has an id.");
        }
        if(piece.getTitle() == null || piece.getTitle().isBlank()){
            throw new IllegalArgumentException("The title must not be null.");
        }
        LocalDateTime now = LocalDateTime.now();
        return pieceRepository.save(new Piece(
                null,
                piece.getTitle(),
                piece.getComposer(),
                piece.getStatus(),
                piece.getRating(),
                piece.getNotes(),
                now,
                null
        ));
    }

    @Override
    public Optional<Piece> getPiece(UUID pieceId) {
        return pieceRepository.findById(pieceId);
    }

    @Override
    public Piece updatePiece(UUID pieceId, Piece piece) {
        if(piece.getTitle() == null) {
            throw new IllegalArgumentException("Piece must have a title");
        }

        Piece existingPiece = pieceRepository.findById(pieceId).orElseThrow(() -> new IllegalArgumentException("Piece not found."));
        existingPiece.setTitle(piece.getTitle());
        existingPiece.setNotes(piece.getNotes());
        existingPiece.setUpdated(LocalDateTime.now());
        existingPiece.setComposer(piece.getComposer());
        existingPiece.setRating(piece.getRating());
        existingPiece.setStatus(piece.getStatus());
        return pieceRepository.save(existingPiece);
    }

    @Override
    public void deletePiece(UUID pieceId) {
        practiceSessionRepository.deleteByPieceId(pieceId);
        pieceRepository.deleteById(pieceId);
    }
}
