package com.kindsonthegenius.product_app;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import java.util.List;
@Entity
@Table(name = "sub_category")
@Data
@JsonIgnoreProperties()
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "categoryid", insertable = false, updatable = false)
    private Category category;
    private Long categoryid;

}
