package com.mt.pianotracker.mappers.impl;

import com.mt.pianotracker.domain.dto.PracticeSessionDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.domain.entities.PracticeSession;
import com.mt.pianotracker.mappers.PracticeSessionMapper;
import org.springframework.stereotype.Component;

@Component
public class PracticeSessionMapperImpl implements PracticeSessionMapper {

    @Override
    public PracticeSession fromPracticeSessionDto(PracticeSessionDto practiceSessionDto) {
        Piece piece = new Piece();
        piece.setId(practiceSessionDto.pieceId());
        return new PracticeSession(
                practiceSessionDto.id(),
                piece,
                practiceSessionDto.startTime(),
                practiceSessionDto.endTime(),
                practiceSessionDto.notes()
        );
    }

    @Override
    public PracticeSessionDto toPracticeSessionDto(PracticeSession practiceSession) {
        return new PracticeSessionDto(
                practiceSession.getId(),
                practiceSession.getPiece().getId(),
                practiceSession.getStartTime(),
                practiceSession.getEndTime(),
                practiceSession.getDurationMinutes(),
                practiceSession.getNotes()
        );
    }
}
