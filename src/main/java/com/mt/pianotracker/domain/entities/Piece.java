package com.mt.pianotracker.domain.entities;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "pieces")
public class Piece {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "composer", nullable = false)
    private String composer;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "notes")
    private String notes;

    @Column(name = "created", nullable = false)
    private LocalDateTime created;

    @Column(name = "updated")
    private LocalDateTime updated;

    @Column(name = "sheet_music_url")
    private String sheetMusicUrl;

    public Piece() {
    }

    public Piece(UUID id, String title, String composer, Status status, Integer rating, String notes, LocalDateTime created, LocalDateTime updated) {
        this.notes = notes;
        this.id = id;
        this.title = title;
        this.composer = composer;
        this.status = status;
        this.rating = rating;
        this.created = created;
        this.updated = updated;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComposer() {
        return composer;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }

    public String getSheetMusicUrl() {
        return sheetMusicUrl;
    }

    public void setSheetMusicUrl(String sheetMusicUrl) {
        this.sheetMusicUrl = sheetMusicUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Piece piece = (Piece) o;
        return Objects.equals(id, piece.id) && Objects.equals(title, piece.title) && Objects.equals(composer, piece.composer) && status == piece.status && Objects.equals(rating, piece.rating) && Objects.equals(notes, piece.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, composer, status, rating, notes);
    }

    @Override
    public String toString() {
        return "Piece{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", composer='" + composer + '\'' +
                ", status=" + status +
                ", rating=" + rating +
                ", notes='" + notes + '\'' +
                '}';
    }
}
