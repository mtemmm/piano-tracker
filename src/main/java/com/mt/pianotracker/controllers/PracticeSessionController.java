package com.mt.pianotracker.controllers;


import com.mt.pianotracker.domain.dto.PracticeSessionDto;
import com.mt.pianotracker.domain.entities.PracticeSession;
import com.mt.pianotracker.mappers.PracticeSessionMapper;
import com.mt.pianotracker.services.PracticeSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/{piece_id}/sessions")
@CrossOrigin(origins = "http://localhost:5173")
public class PracticeSessionController {

    private final PracticeSessionService practiceSessionService;
    private final PracticeSessionMapper practiceSessionMapper;

    public PracticeSessionController(PracticeSessionService practiceSessionService, PracticeSessionMapper practiceSessionMapper) {
        this.practiceSessionService = practiceSessionService;
        this.practiceSessionMapper = practiceSessionMapper;
    }




    @GetMapping
    public List<PracticeSessionDto> listSessionsForPiece(@PathVariable UUID piece_id) {
        return practiceSessionService.listPracticeSessionForPiece(piece_id)
                .stream()
                .map(practiceSessionMapper::toPracticeSessionDto)
                .toList();
    }

}
