package com.mt.pianotracker.domain.dto;

import com.mt.pianotracker.domain.entities.Status;

import java.time.LocalDateTime;
import java.util.UUID;

public record PieceDto(
    UUID id,
    String title,
    String composer,
    Status status,
    Integer rating,
    String notes,
    String sheetMusicUrl
) {
}
