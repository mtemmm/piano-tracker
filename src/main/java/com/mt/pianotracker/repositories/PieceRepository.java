package com.mt.pianotracker.repositories;

import com.mt.pianotracker.domain.entities.Piece;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PieceRepository extends JpaRepository<Piece, UUID> {



}
