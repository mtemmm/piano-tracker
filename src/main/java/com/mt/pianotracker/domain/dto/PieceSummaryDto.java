package com.mt.pianotracker.domain.dto;

import java.util.UUID;

public record PieceSummaryDto(
        UUID id,
        String title,
        String composer,
        Long duration
) {
}
