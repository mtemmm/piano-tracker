package com.mt.pianotracker.services.impl;

import com.mt.pianotracker.domain.dto.PieceStatisticsDto;
import com.mt.pianotracker.domain.dto.PieceSummaryDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.domain.entities.PracticeSession;
import com.mt.pianotracker.repositories.PieceRepository;
import com.mt.pianotracker.repositories.PracticeSessionRepository;
import com.mt.pianotracker.services.FileStorageService;
import com.mt.pianotracker.services.PieceService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PieceServiceImpl implements PieceService {

    private final PieceRepository pieceRepository;
    private final PracticeSessionRepository practiceSessionRepository;
    private final FileStorageService fileStorageService;

    public PieceServiceImpl(PieceRepository pieceRepository, PracticeSessionRepository practiceSessionRepository, FileStorageService fileStorageService) {
        this.pieceRepository = pieceRepository;
        this.practiceSessionRepository = practiceSessionRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public List<Piece> listPieces() {
        return pieceRepository.findAll();
    }

    @Transactional
    @Override
    public Piece createPiece(Piece piece) {
        if(piece.getId() != null){
            throw new IllegalArgumentException("This piece already has an id.");
        }
        if(piece.getTitle() == null || piece.getTitle().isBlank()){
            throw new IllegalArgumentException("The title must not be null.");
        }
        LocalDateTime now = LocalDateTime.now();
        return pieceRepository.save(new Piece(
                null,
                piece.getTitle(),
                piece.getComposer(),
                piece.getStatus(),
                piece.getRating(),
                piece.getNotes(),
                now,
                null
        ));
    }

    @Override
    public Optional<Piece> getPiece(UUID pieceId) {
        return pieceRepository.findById(pieceId);
    }

    @Override
    public Piece updatePiece(UUID pieceId, Piece piece) {
        if(piece.getTitle() == null) {
            throw new IllegalArgumentException("Piece must have a title");
        }

        Piece existingPiece = pieceRepository.findById(pieceId).orElseThrow(() -> new IllegalArgumentException("Piece not found."));
        existingPiece.setTitle(piece.getTitle());
        existingPiece.setNotes(piece.getNotes());
        existingPiece.setUpdated(LocalDateTime.now());
        existingPiece.setComposer(piece.getComposer());
        existingPiece.setRating(piece.getRating());
        existingPiece.setStatus(piece.getStatus());
        return pieceRepository.save(existingPiece);
    }

    @Override
    @Transactional
    public void deletePiece(UUID pieceId) {
        practiceSessionRepository.deleteByPieceId(pieceId);
        pieceRepository.deleteById(pieceId);
    }

    @Override
    public Long getTotalTimeForPiece(UUID pieceId){
        List<PracticeSession> sessions = practiceSessionRepository.findByPieceIdOrderByStartTimeDesc(pieceId);
        return sessions.stream().mapToLong(PracticeSession::getDurationMinutes).sum();
    }

    @Override
    public PieceStatisticsDto getPiecesSummary() {
        List<PracticeSession> sessions = practiceSessionRepository.findAll();
        Map<UUID, Long> durationPerPiece = sessions.stream()
                .collect(Collectors.groupingBy(
                        s -> s.getPiece().getId(),
                        Collectors.summingLong(PracticeSession::getDurationMinutes)
                ));

        UUID mostPracticedPieceId = durationPerPiece.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
        Long mostPracticedPieceDuration = durationPerPiece.get(mostPracticedPieceId);
        PieceSummaryDto mostPracticedPieceDto = buildPieceSummaryDto(mostPracticedPieceId, mostPracticedPieceDuration);

        UUID leastPracticedPieceId = durationPerPiece.entrySet().stream()
                .min(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
        Long leastPracticedPieceDuration = durationPerPiece.get(leastPracticedPieceId);
        PieceSummaryDto leastPracticedPieceDto = buildPieceSummaryDto(leastPracticedPieceId, leastPracticedPieceDuration);


        UUID highestRatedPieceId = pieceRepository.findHighestRatedPieceId().orElse(null);
        PieceSummaryDto highestRatedPieceDto = buildPieceSummaryDto(highestRatedPieceId, 0L);

        UUID lowestRatedPieceId = pieceRepository.findLowestRatedPieceId().orElse(null);
        PieceSummaryDto lowestRatedPieceDto = buildPieceSummaryDto(lowestRatedPieceId, 0L);

        Long totalPracticeTime = sessions
                .stream()
                .mapToLong(x -> x.getDurationMinutes())
                .sum();
        Long numberOfPieces = pieceRepository.count();
        return new PieceStatisticsDto(
                mostPracticedPieceDto,
                leastPracticedPieceDto,
                highestRatedPieceDto,
                lowestRatedPieceDto,
                totalPracticeTime,
                numberOfPieces
        );
    }

    private PieceSummaryDto buildPieceSummaryDto(UUID pieceId, Long duration) {
        if(pieceId == null) {
            return null;
        }
        Piece piece = pieceRepository.findById(pieceId).orElse(null);
        if(piece == null) {
            return null;
        }
        return new PieceSummaryDto(
                piece.getId(),
                piece.getTitle(),
                piece.getComposer(),
                duration
        );
    }

    @Override
    public String attachSheetMusic(UUID pieceId, MultipartFile file) {
        Piece piece = pieceRepository.findById(pieceId).orElseThrow(() -> new RuntimeException("No pieces found"));
        String url = fileStorageService.uploadFile(file);
        piece.setSheetMusicUrl(url);
        pieceRepository.save(piece);
        return url;
    }

    @Override
    @Transactional
    public void removeSheetMusic(UUID pieceId) {
        Piece piece = pieceRepository.findById(pieceId).orElseThrow(() -> new RuntimeException("No pieces found"));
        if(piece.getSheetMusicUrl() == null)
            return;
        String url = piece.getSheetMusicUrl();
        fileStorageService.deleteFile(url);
        piece.setSheetMusicUrl(null);
        pieceRepository.save(piece);
    }
}
