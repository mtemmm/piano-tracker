package com.mt.pianotracker.controllers;


import com.mt.pianotracker.domain.dto.PracticeSessionDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.domain.entities.PracticeSession;
import com.mt.pianotracker.mappers.PracticeSessionMapper;
import com.mt.pianotracker.services.PracticeSessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:5173")
public class PracticeSessionController {

    private final PracticeSessionService practiceSessionService;
    private final PracticeSessionMapper practiceSessionMapper;

    public PracticeSessionController(PracticeSessionService practiceSessionService, PracticeSessionMapper practiceSessionMapper) {
        this.practiceSessionService = practiceSessionService;
        this.practiceSessionMapper = practiceSessionMapper;
    }

    @GetMapping
    public List<PracticeSessionDto> listSessions() {
        return practiceSessionService.listPracticeSessions()
                .stream()
                .map(practiceSessionMapper::toPracticeSessionDto)
                .toList();
    }

    @GetMapping("/{piece_id}")
    public List<PracticeSessionDto> listSessionsForPiece(@PathVariable("piece_id") UUID piece_id) {
        return practiceSessionService.listPracticeSessionForPiece(piece_id)
                .stream()
                .map(practiceSessionMapper::toPracticeSessionDto)
                .toList();
    }

    @PostMapping("/{piece_id}")
    public ResponseEntity<PracticeSessionDto> createPracticeSession(
            @PathVariable("piece_id") UUID piece_id,
            @RequestBody PracticeSessionDto practiceSessionDto) {

        PracticeSession session = practiceSessionMapper.fromPracticeSessionDto(practiceSessionDto);
        session.getPiece().setId(piece_id);
        PracticeSession savedSession = practiceSessionService.createPracticeSession(session);
        return new ResponseEntity<>(practiceSessionMapper.toPracticeSessionDto(savedSession), HttpStatus.CREATED);
    }

    @DeleteMapping("/{piece_id}/{id}")
    public void deletePracticeSession(
            @PathVariable("piece_id") UUID piece_id,
            @PathVariable("id") UUID id
    ){
        practiceSessionService.deletePracticeSession(piece_id, id);
    }

}
