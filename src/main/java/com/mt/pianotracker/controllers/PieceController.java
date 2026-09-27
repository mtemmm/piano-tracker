package com.mt.pianotracker.controllers;


import com.mt.pianotracker.domain.dto.PieceDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.mappers.PieceMapper;
import com.mt.pianotracker.services.FileStorageService;
import com.mt.pianotracker.services.PieceService;
import org.apache.catalina.LifecycleState;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pieces")
@CrossOrigin(origins = "http://localhost:5173")
public class PieceController {

    private final PieceService pieceService;
    private final PieceMapper pieceMapper;
    private final FileStorageService fileStorageService;

    public PieceController(PieceService pieceService, PieceMapper pieceMapper, FileStorageService fileStorageService) {
        this.pieceService = pieceService;
        this.pieceMapper = pieceMapper;
        this.fileStorageService = fileStorageService;
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
        //System.out.println("--> POST /api/pieces hit!");
        Piece newPiece = pieceMapper.fromDto(pieceDto);
        Piece resultPiece = pieceService.createPiece(newPiece);
        return pieceMapper.toDto(resultPiece);
    }

    @GetMapping("/{id}")
    public PieceDto getPiece(@PathVariable("id") UUID pieceId){
        return pieceMapper.toDto(pieceService.getPiece(pieceId).orElse(null));
    }

    @DeleteMapping("/{id}")
    public void deletePiece(@PathVariable("id") UUID pieceId){
        pieceService.deletePiece(pieceId);
    }

    @PutMapping("/{id}")
    public PieceDto updatePiece(@PathVariable("id") UUID pieceId,
            @RequestBody PieceDto pieceDto){
        return pieceMapper.toDto(pieceService.updatePiece(pieceId, pieceMapper.fromDto(pieceDto)));
    }

    @GetMapping("/{id}/duration")
    public Long getDuration(@PathVariable("id") UUID pieceId){
        return pieceService.getTotalTimeForPiece(pieceId);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file){
        String url = fileStorageService.uploadFile(file);
        return ResponseEntity.ok(url);
    }

    @PostMapping("{id}/sheet-music")
    public ResponseEntity<String> uploadSheetMusic(
            @PathVariable("id") UUID pieceId,
            @RequestParam("file") MultipartFile file
    ){
        String url = pieceService.attachSheetMusic(pieceId, file);
        return ResponseEntity.ok(url);
    }

    @DeleteMapping("{id}/sheet-music")
    public void deleteSheetMusic(@PathVariable("id") UUID pieceId){
        pieceService.removeSheetMusic(pieceId);
    }

}
