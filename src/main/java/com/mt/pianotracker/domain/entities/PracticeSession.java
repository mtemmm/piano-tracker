package com.mt.pianotracker.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "practice_session")
public class PracticeSession {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "piece_id", nullable = false)
    private Piece piece;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "notes")
    private String notes;

    public PracticeSession(){
    }

    public PracticeSession(UUID id, Piece piece, LocalDateTime startTime, LocalDateTime endTime, String notes) {
        this.id = id;
        this.piece = piece;
        this.startTime = startTime;
        this.endTime = endTime;
        this.notes = notes;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Piece getPiece() {
        return piece;
    }

    public void setPiece(Piece piece) {
        this.piece = piece;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public long getDurationMinutes() {
        if (startTime != null && endTime != null) {
            return java.time.Duration.between(startTime, endTime).toMinutes();
        }
        return 0;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PracticeSession that = (PracticeSession) o;
        return Objects.equals(id, that.id) && Objects.equals(piece, that.piece) && Objects.equals(startTime, that.startTime) && Objects.equals(endTime, that.endTime) && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, piece, startTime, endTime, notes);
    }

    @Override
    public String toString() {
        return "PracticeSession{" +
                "id=" + id +
                ", piece=" + piece +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", notes='" + notes + '\'' +
                '}';
    }
}
