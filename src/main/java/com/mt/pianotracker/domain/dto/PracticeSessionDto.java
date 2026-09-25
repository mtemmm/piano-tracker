package com.mt.pianotracker.domain.dto;

import com.mt.pianotracker.domain.entities.Piece;

import java.time.LocalDateTime;
import java.util.UUID;

public record PracticeSessionDto(
        UUID id,
        UUID pieceId,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Long duration,
        String notes

) {
}
