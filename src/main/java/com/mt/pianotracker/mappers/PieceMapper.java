package com.mt.pianotracker.mappers;

import com.mt.pianotracker.domain.dto.PieceDto;
import com.mt.pianotracker.domain.entities.Piece;

public interface PieceMapper {

    Piece fromDto(PieceDto pieceDto);
    PieceDto toDto(Piece piece);

}
