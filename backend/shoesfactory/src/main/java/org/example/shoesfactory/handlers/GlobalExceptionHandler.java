package org.example.shoesfactory.handlers;

import jakarta.persistence.EntityNotFoundException;

import org.example.shoesfactory.models.dto.response.ApiErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<Object> handleResourceNotFoundException(Exception ex, WebRequest request) {
        String errorMessage = ex.getMessage();
        ApiErrorResponseDTO errorResponse = new ApiErrorResponseDTO();
        errorResponse.setTimestamp(LocalDateTime.now());
        errorResponse.setStatus(404);
        errorResponse.setError( errorMessage);
        errorResponse.setPath( request.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class, AccountStatusException.class, AccountExpiredException.class, InsufficientAuthenticationException.class})
    public ResponseEntity<Object> handleAuthenticationException(Exception ex, WebRequest request) {
        String errorMessage = "Unauthorized";
        if (ex instanceof UsernameNotFoundException){
            errorMessage = "User not found";
        }
        else if (ex instanceof BadCredentialsException){
            errorMessage = "Invalid credentials";
        }
        else if (ex instanceof AccountStatusException){
            errorMessage = "Account status is not active";
        }
        else if (ex instanceof AccountExpiredException){
            errorMessage = "Account expired";
        }
        else if (ex instanceof InsufficientAuthenticationException){
            errorMessage = "Insufficient authentication";
        }

        ApiErrorResponseDTO errorResponse = new ApiErrorResponseDTO();
        errorResponse.setTimestamp(LocalDateTime.now());
        errorResponse.setStatus(401);
        errorResponse.setError(errorMessage);
        errorResponse.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(Exception ex, WebRequest request) {
        String errorMessage = "Forbidden";
        ApiErrorResponseDTO errorResponse = new ApiErrorResponseDTO();
        errorResponse.setTimestamp(LocalDateTime.now());
        errorResponse.setStatus(403);
        errorResponse.setError(errorMessage);
        errorResponse.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

}
