package com.mt.pianotracker.domain.dto.ai;

import java.util.List;
import java.util.UUID;

public record AiRequestDto(
        List<UUID> pieceIds
) {
}
