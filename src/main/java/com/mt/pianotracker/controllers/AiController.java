package com.mt.pianotracker.controllers;


import com.mt.pianotracker.domain.dto.ai.AiRequestDto;
import com.mt.pianotracker.domain.dto.ai.AiResponseDto;
import com.mt.pianotracker.services.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/simple")
    public ResponseEntity<AiResponseDto> getAnswerToSimpleQuestion(){
        return ResponseEntity.ok(aiService.generateResponseEasy("Answer me!"));
    }

    @PostMapping
    public ResponseEntity<AiResponseDto> getRecommedationsAi(
            @RequestBody AiRequestDto request
    ){
        return ResponseEntity.ok(aiService.generateResponse(request.pieceIds()));
    }

}
