package com.mt.pianotracker.domain.dto.ai;

import java.util.List;

public record GeminiRequestDto(
    List<Content> contents
) {
    public record Content(List<Part> parts) {

    }
    public record Part(String text) {

    }
    public static GeminiRequestDto fromText(String prompt) {
        return new GeminiRequestDto(List.of(
                new Content(List.of(new Part(prompt)))
        ));
    }
}
