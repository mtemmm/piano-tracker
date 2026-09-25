package com.mt.pianotracker.mappers;

import com.mt.pianotracker.domain.dto.PracticeSessionDto;
import com.mt.pianotracker.domain.entities.PracticeSession;

public interface PracticeSessionMapper {

    PracticeSession fromPracticeSessionDto(PracticeSessionDto practiceSessionDto);
    PracticeSessionDto toPracticeSessionDto(PracticeSession practiceSession);

}
