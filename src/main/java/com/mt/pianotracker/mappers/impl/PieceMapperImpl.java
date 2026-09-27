package com.mt.pianotracker.mappers.impl;

import com.mt.pianotracker.domain.dto.PieceDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.mappers.PieceMapper;
import org.springframework.stereotype.Component;

@Component
public class PieceMapperImpl implements PieceMapper {

    @Override
    public Piece fromDto(PieceDto pieceDto) {
        return new Piece(pieceDto.id(), pieceDto.title(), pieceDto.composer(), pieceDto.status(), pieceDto.rating(), pieceDto.notes(), null, null);
    }

    @Override
    public PieceDto toDto(Piece piece) {
        return new PieceDto(piece.getId(), piece.getTitle(), piece.getComposer(), piece.getStatus(), piece.getRating(), piece.getNotes(), piece.getSheetMusicUrl());
    }

}
