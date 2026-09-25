package com.mt.pianotracker.repositories;

import com.mt.pianotracker.domain.entities.PracticeSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PracticeSessionRepository extends JpaRepository<PracticeSession, UUID> {

    List<PracticeSession> findByPieceIdOrderByStartTimeDesc(UUID pieceId);
    Optional<PracticeSession> findByPieceIdAndId(UUID pieceId, UUID id);
    void deleteByPieceIdAndId(UUID pieceId, UUID id);
    void deleteByPieceId(UUID pieceId);
}
