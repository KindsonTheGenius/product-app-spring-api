package com.kindsonthegenius.product_app.controllers;

import com.kindsonthegenius.product_app.services.ProductService;
import com.kindsonthegenius.product_app.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001/")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/products")
    @CrossOrigin
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping("/product/{id}")
    @CrossOrigin
    public Product getProduct(@PathVariable("id") Long id){
        return productService.getProduct(id);
    }

    @PutMapping("/product/{id}")
    @CrossOrigin
    public Product updateProduct(@RequestBody() Product product, @PathVariable("id") Long id){
        return productService.updateProduct(product);
    }

    @CrossOrigin
    @PostMapping("/products")
    public ResponseEntity<Product> addNew(@RequestBody() Product product){
        Product newProduct = productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    @CrossOrigin
    @DeleteMapping("/product/{id}")
    public void deleteProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
    }

}
