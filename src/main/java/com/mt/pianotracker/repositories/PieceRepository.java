package com.mt.pianotracker.repositories;

import com.mt.pianotracker.domain.entities.Piece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface PieceRepository extends JpaRepository<Piece, UUID> {

    @Query("""
        SELECT p.id
        FROM Piece p
        WHERE p.rating IS NOT NULL
        ORDER BY p.rating DESC
        LIMIT 1
    """)
    Optional<UUID> findHighestRatedPieceId();

    @Query("""
        SELECT p.id
        FROM Piece p
        WHERE p.rating IS NOT NULL
        ORDER BY p.rating ASC
        LIMIT 1
    """)
    Optional<UUID> findLowestRatedPieceId();

}
