package com.mt.pianotracker.services.impl;

import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.domain.entities.PracticeSession;
import com.mt.pianotracker.repositories.PieceRepository;
import com.mt.pianotracker.repositories.PracticeSessionRepository;
import com.mt.pianotracker.services.PracticeSessionService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PracticeSessionServiceImpl implements PracticeSessionService {

    private final PieceRepository pieceRepository;
    private final PracticeSessionRepository practiceSessionRepository;

    public PracticeSessionServiceImpl(PieceRepository pieceRepository, PracticeSessionRepository practiceSessionRepository) {
        this.pieceRepository = pieceRepository;
        this.practiceSessionRepository = practiceSessionRepository;
    }

    @Override
    public List<PracticeSession> listPracticeSessions() {
        return practiceSessionRepository.findAll();
    }

    @Override
    public Optional<PracticeSession> getPracticeSession(UUID pieceId, UUID practiceSessionId) {
        return practiceSessionRepository.findByPieceIdAndId(pieceId, practiceSessionId);
    }

    @Transactional
    @Override
    public PracticeSession createPracticeSession(PracticeSession practiceSession) {
        Piece piece = pieceRepository.findById(practiceSession.getPiece().getId()).orElseThrow(()-> new IllegalArgumentException("Piece not found"));
        PracticeSession toAdd = new PracticeSession(
                null,
                piece,
                practiceSession.getStartTime(),
                practiceSession.getEndTime(),
                practiceSession.getNotes()
        );
        return practiceSessionRepository.save(toAdd);
    }

    @Override
    public List<PracticeSession> listPracticeSessionForPiece(UUID pieceId) {
        return practiceSessionRepository.findByPieceIdOrderByStartTimeDesc(pieceId);
    }

    @Transactional
    @Override
    public void deletePracticeSession(UUID pieceId, UUID practiceSessionId) {
        practiceSessionRepository.deleteByPieceIdAndId(pieceId, practiceSessionId);
    }
}
