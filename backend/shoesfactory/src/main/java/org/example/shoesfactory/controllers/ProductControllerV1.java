package org.example.shoesfactory.controllers;

import org.example.shoesfactory.models.Product;
import org.example.shoesfactory.models.dto.request.ProductRequestDTO;
import org.example.shoesfactory.models.dto.response.ProductTotalRevenueDTO;
import org.example.shoesfactory.services.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductControllerV1 {
    private final ProductService productService;

    @Autowired
    public ProductControllerV1(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createProduct(@RequestBody ProductRequestDTO product) {
        productService.createProduct(product);
        return new ResponseEntity<>("Product created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Integer productId) {
        Product product = productService.getProductById(productId);
        return product != null ? new ResponseEntity<>(product, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Product>> getProductsByTitle(@PathVariable("title") String title) {
        List<Product> products = productService.getProductsByTitle(title);
        return products.isEmpty() ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/article/{article}")
    public ResponseEntity<List<Product>> getProductsByArticle(@PathVariable("article") String article) {
        List<Product> products = productService.getProductsByArticle(article);
        return products.isEmpty() ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/price-range/{min}/{max}")
    public ResponseEntity<List<Product>> getProductsByPriceRange(@PathVariable("min") Double minPrice, @PathVariable("max") Double maxPrice) {
        List<Product> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return products.isEmpty() ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("all/sales")
    public ResponseEntity<List<ProductTotalRevenueDTO>> getTotalPrice() {
        List<ProductTotalRevenueDTO> body = productService.getTotalRevenuePerProduct();
        return body!= null? new ResponseEntity<>(body, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Integer productId, @RequestBody ProductRequestDTO product) {
        Product existingProduct = productService.getProductById(productId);
        if (existingProduct != null) {
            productService.updateProduct(productId, product);
            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer productId) {
        Product existingProduct = productService.getProductById(productId);
        if (existingProduct != null) {
            productService.deleteProduct(productId);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }
}
