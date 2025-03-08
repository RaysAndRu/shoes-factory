package org.example.shoesfactory.models.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiErrorResponseDTO implements Serializable {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String path;
}
