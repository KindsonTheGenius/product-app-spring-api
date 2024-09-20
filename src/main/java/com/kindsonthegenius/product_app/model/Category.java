package com.kindsonthegenius.product_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "category")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 75)
    private String title;

    @Column(length = 100)
    private String metaTitle;

    @Column(nullable = false, length = 100)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    @JsonIgnore
    private List<SubCategory> subCategories;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;

}