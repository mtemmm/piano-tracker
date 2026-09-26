package com.mt.pianotracker.services;

import com.mt.pianotracker.domain.dto.ai.AiRequestDto;
import com.mt.pianotracker.domain.dto.ai.AiResponseDto;

import java.util.List;
import java.util.UUID;

public interface AiService {

    AiResponseDto generateResponse(List<UUID> request);
    AiResponseDto generateResponseEasy(String request);

}
