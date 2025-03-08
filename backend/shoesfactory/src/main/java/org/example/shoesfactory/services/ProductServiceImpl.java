package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.shoesfactory.models.Product;
import org.example.shoesfactory.models.dto.request.ProductRequestDTO;
import org.example.shoesfactory.models.dto.response.ProductTotalRevenueDTO;
import org.example.shoesfactory.repositories.ProductRepository;
import org.example.shoesfactory.services.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void createProduct(ProductRequestDTO product) {
        // Используем процедуру из репозитория для создания продукта
        productRepository.createProduct(
                product.getTitle(),
                product.getPrice(),
                product.getArticle(),
                product.getSize(),
                product.getColor()
        );
    }

    @Override
    @Transactional
    public Product getProductById(Integer productId) {
        // Используем метод репозитория для получения продукта
        return productRepository.getProductById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));
    }

    @Override
    @Transactional
    public List<Product> getAllProducts() {
        // Получаем список всех продуктов
        return productRepository.getAllProducts();
    }

    @Override
    @Transactional
    public List<Product> getProductsByTitle(String title) {
        // Получаем список продуктов по названию
        return productRepository.getProductsByTitle(title);
    }

    @Override
    @Transactional
    public List<Product> getProductsByArticle(String article) {
        // Получаем список продуктов по артикулу
        return productRepository.getProductsByArticle(article);
    }

    @Override
    @Transactional
    public List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        // Получаем список продуктов по диапазону цен
        return productRepository.getProductsByPriceRange(minPrice, maxPrice);
    }

    @Override
    @Transactional
    public List<ProductTotalRevenueDTO> getTotalRevenuePerProduct() {
        List<Object[]> results = productRepository.getTotalRevenuePerProduct();
        return results.stream()
                .map(row -> new ProductTotalRevenueDTO(
                        ((Integer) row[0]),
                        (String) row[1],
                        ((Number) row[2]).doubleValue()
                ))
                .toList();
    }

    @Override
    public void updateProduct(Integer id, ProductRequestDTO product) {
        // Обновляем продукт с помощью процедуры репозитория
        productRepository.updateProduct(
                id,
                product.getTitle(),
                product.getPrice(),
                product.getArticle(),
                product.getSize(),
                product.getColor()
        );
    }

    @Override
    public void deleteProduct(Integer productId) {
        // Удаляем продукт с помощью процедуры репозитория
        productRepository.deleteProduct(productId);
    }
}
