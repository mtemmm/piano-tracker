package com.mt.pianotracker.services.impl;

import com.mt.pianotracker.domain.dto.ai.AiRequestDto;
import com.mt.pianotracker.domain.dto.ai.AiResponseDto;
import com.mt.pianotracker.domain.dto.ai.GeminiRequestDto;
import com.mt.pianotracker.domain.dto.ai.GeminiResponseDto;
import com.mt.pianotracker.domain.entities.Piece;
import com.mt.pianotracker.repositories.PieceRepository;
import com.mt.pianotracker.services.AiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AiServiceImpl implements AiService {

    private final PieceRepository pieceRepository;
    private final RestClient restClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;


    public AiServiceImpl(PieceRepository pieceRepository) {
        this.pieceRepository = pieceRepository;
        this.restClient = RestClient.create();
    }

    @Override
    public AiResponseDto generateResponse(List<UUID> request) {
        List<Piece> pieces = pieceRepository.findAllById(request);
        String piecesFormatted = pieces.stream()
                .map(x -> String.format("%s by %s rated %s out of 5 \n",
                        x.getTitle(),
                        x.getComposer(),
                        x.getRating()
                        ))
                .collect(Collectors.joining());
        String prompt = """
                You are an expert piano mentor and repertoire consultant.
                The user wants recommendations based on the following classical piano pieces they have studied:
                
                %s
                
                Please recommend 2-3 new pieces that would be a natural progression in difficulty and style.
                For each piece, provide a 1-2 sentence explanation of why it fits. Keep the formatting clean with Markdown.
                """.formatted(piecesFormatted);
        return generateResponseEasy(prompt);
    }

    @Override
    public AiResponseDto generateResponseEasy(String request) {
        GeminiRequestDto requestBody = GeminiRequestDto.fromText(request);
        try {
            GeminiResponseDto response = restClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(GeminiResponseDto.class);

            if (response != null) {
                return new AiResponseDto(response.extractText());
            }
        } catch (Exception e) {
            System.out.println("FULL URI: " + apiUrl + "?key=" + apiKey);
            return new AiResponseDto("Error communicating with Gemini " + e.getMessage());
        }
        return new AiResponseDto("Failed");
    }
}
