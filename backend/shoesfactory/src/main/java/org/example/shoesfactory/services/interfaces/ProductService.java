package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.Product;
import org.example.shoesfactory.models.dto.request.ProductRequestDTO;
import org.example.shoesfactory.models.dto.response.ProductTotalRevenueDTO;

import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface ProductService {
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void createProduct(ProductRequestDTO product);

    @PreAuthorize("hasRole('ROLE_READER')")
    Product getProductById(Integer productId) ;

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Product> getAllProducts();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Product> getProductsByTitle(String title);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Product> getProductsByArticle(String article);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ProductTotalRevenueDTO>  getTotalRevenuePerProduct();

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void updateProduct(Integer id,ProductRequestDTO product);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void deleteProduct(Integer productId) ;
}
