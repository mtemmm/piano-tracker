package com.mt.pianotracker.controllers;

import com.mt.pianotracker.domain.dto.PieceStatisticsDto;
import com.mt.pianotracker.services.PieceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/piece-statistics")
@CrossOrigin(origins = "http://localhost:5173")
public class PieceStatisticsController {

    private final PieceService pieceService;

    public PieceStatisticsController(PieceService pieceService) {
        this.pieceService = pieceService;
    }

    @GetMapping
    public ResponseEntity<PieceStatisticsDto> getPieceStatistics(){
        return ResponseEntity.ok(pieceService.getPiecesSummary());
    }

}
