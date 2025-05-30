import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography 
} from '@mui/material';
import { createProduct, updateProduct } from '../services/productService';

const ProductForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    image_url: product?.image_url || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {product ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Image URL"
        name="image_url"
        value={formData.image_url}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {product ? 'Update Product' : 'Add Product'}
      </Button>
    </Box>
  );
};

export default ProductForm;