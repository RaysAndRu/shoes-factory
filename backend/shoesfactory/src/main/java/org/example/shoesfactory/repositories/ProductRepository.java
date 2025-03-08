package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Процедура для добавления нового продукта
    @Procedure(procedureName = "create_product")
    void createProduct(
            @Param("p_title") String title,
            @Param("p_price") Double price,
            @Param("p_article") String article,
            @Param("p_size") Integer size,
            @Param("p_color") String color
    );

    // Процедура для получения продукта по ID
    @Procedure(procedureName = "get_product_by_id")
    Optional<Product>  getProductById(@Param("p_product_id") Integer productId);

    // Процедура для получения всех продуктов
    @Procedure(procedureName = "get_all_products")
    List<Product> getAllProducts();

    // Процедура для поиска продуктов по названию
    @Procedure(procedureName = "get_products_by_title")
    List<Product> getProductsByTitle(@Param("p_title") String title);

    // Процедура для поиска продуктов по артикулу
    @Procedure(procedureName = "get_products_by_article")
    List<Product> getProductsByArticle(@Param("p_article") String article);

    // Процедура для фильтрации продуктов по цене
    @Procedure(procedureName = "get_products_by_price_range")
    List<Product> getProductsByPriceRange(
            @Param("p_min_price") Double minPrice,
            @Param("p_max_price") Double maxPrice
    );

    // Процедура для обновления информации о продукте
    @Procedure(procedureName = "update_product")
    void updateProduct(
            @Param("p_product_id") Integer productId,
            @Param("p_title") String title,
            @Param("p_price") Double price,
            @Param("p_article") String article,
            @Param("p_size") Integer size,
            @Param("p_color") String color
    );

    // Процедура для удаления продукта
    @Procedure(procedureName = "delete_product")
    void deleteProduct(@Param("p_product_id") Integer productId);

    @Procedure(procedureName = "analyze_total_revenue_per_product")
    List<Object[]> getTotalRevenuePerProduct();
}
