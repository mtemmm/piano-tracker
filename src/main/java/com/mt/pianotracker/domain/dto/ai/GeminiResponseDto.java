package com.mt.pianotracker.domain.dto.ai;

import java.util.List;

public record GeminiResponseDto(
    List<Candidate> candidates
) {
    public record Candidate(Content content) {

    }
    public record Content(List<Part> parts) {

    }
    public record Part(String text) {

    }

    public String extractText() {
        if (candidates != null && !candidates.isEmpty()) {
            Candidate firstCandidate = candidates.get(0);
            if (firstCandidate.content() != null
                    && firstCandidate.content().parts() != null
                    && !firstCandidate.content().parts().isEmpty()) {
                return firstCandidate.content().parts().get(0).text();
            }
        }
        return "No recommendation generated.";
    }
}
