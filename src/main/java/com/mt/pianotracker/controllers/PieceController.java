package com.mt.pianotracker.controllers;


import com.mt.pianotracker.domain.dto.PieceDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.mappers.PieceMapper;
import com.mt.pianotracker.services.PieceService;
import org.apache.catalina.LifecycleState;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pieces")
public class PieceController {

    private final PieceService pieceService;
    private final PieceMapper pieceMapper;

    public PieceController(PieceService pieceService, PieceMapper pieceMapper) {
        this.pieceService = pieceService;
        this.pieceMapper = pieceMapper;
    }

    @GetMapping
    public List<PieceDto> listPieces(){
        System.out.println("--> GET /api/pieces hit!");
        return pieceService.listPieces()
                .stream()
                .map(pieceMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public PieceDto createPiece(@RequestBody PieceDto pieceDto){
        System.out.println("--> POST /api/pieces hit!");
        Piece newPiece = pieceMapper.fromDto(pieceDto);
        Piece resultPiece = pieceService.createPiece(newPiece);
        return pieceMapper.toDto(resultPiece);
    }

}
