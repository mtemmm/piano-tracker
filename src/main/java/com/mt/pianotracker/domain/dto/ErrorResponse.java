package com.mt.pianotracker.domain.dto;

public record ErrorResponse(
        int statusCode,
        String message,
        String details
) {
}