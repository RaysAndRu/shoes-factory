package org.example.shoesfactory.models.dto.request;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO implements Serializable {
    private String title;
    private Double price;
    private String article;
    private Integer size;
    private String color;
}
