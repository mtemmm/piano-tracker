package com.mt.pianotracker.domain.dto;

public record PieceStatisticsDto(
        PieceSummaryDto mostPracticedPiece,
        PieceSummaryDto leastPracticedPiece,
        PieceSummaryDto highestRatedPiece,
        PieceSummaryDto lowestRatedPiece,
        Long totalPracticeTime,
        Long numberOfPieces
        ) {

}
