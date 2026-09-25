package com.mt.pianotracker.services;

import com.mt.pianotracker.domain.entities.PracticeSession;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PracticeSessionService {

    List<PracticeSession> listPracticeSessions();
    Optional<PracticeSession> getPracticeSession(UUID pieceId, UUID practiceSessionId);
    PracticeSession createPracticeSession(PracticeSession practiceSession);
    List<PracticeSession> listPracticeSessionForPiece(UUID pieceId);
    void deletePracticeSession(UUID pieceId, UUID practiceSessionId);
}
