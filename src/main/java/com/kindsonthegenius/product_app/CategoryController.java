package com.kindsonthegenius.product_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/category/{id}")
    public Category getCategory(@PathVariable("id") Long id){
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/category/{id}")
    public Category updateCategory(@RequestBody() Category category, @PathVariable("id") Long id){
        return categoryService.save(category);
    }

    @PostMapping("/categories")
    public Category addNew(@RequestBody() Category category){
        return categoryService.save(category);
    }

    @DeleteMapping("/category/{id}")
    public void deleteCategory(@PathVariable("id") Long id){
        categoryService.deleteCategory(id);
    }

}
