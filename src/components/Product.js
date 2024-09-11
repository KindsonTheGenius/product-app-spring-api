import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Grid, Typography, Paper, Box, Card } from '@mui/material';

const ProductDetails = ({ product }) => {
  return (
      <Box         
        sx={{
            width: '60%',               
            margin: '0 auto',             
            padding: '20px',           
            border: '1px solid #ccc',     
            borderRadius: '8px',         
          }}
        p={3}>
        <Typography variant="h5" gutterBottom>
          Product Details
        </Typography>
          <hr></hr>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{fontWeight: 'bold' }}>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{product.content}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Category:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{product.category?.title}</Typography> 
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Description:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{product.summary}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Sub Category:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{product.subCategory?.description}</Typography>
          </Grid>
        </Grid>
      </Box>
  );
};

const Product = () => {

    const {productId} = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/product/${productId}`).then(response => {
          console.log(response.data)
          setProduct(response.data)
        }).catch((error) => {
          console.log("There was an error fetching the products", error)
        })
    }, [productId]);

  return (
    <div>
    {product ? (
      <ProductDetails product={product} />
    ) : (
      <Typography variant="h6">Loading product details...</Typography>
    )}
  </div>
  )
}

export default Product
