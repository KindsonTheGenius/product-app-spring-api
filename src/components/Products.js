import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Paper, Box, 
    IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} 
    from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function Products() {

  const [page, setPage] = useState(0);  // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [products, setProducts] = useState(null)  

  const [deleteId, setDeleteId] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    brand: '',
    acquisitionDate: '',
    price: ''
  })

  const [editProduct, setEditProduct] = useState({
    id: null,
    name: '',
    description: '',
    brand: '',
    acquisitionDate: '',
    price: ''
  })

  const handleClickOpenEdit = (product) => {
    setEditProduct(product)
    setOpenEdit(true)
  }


  const handleChange = (e) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value});
  }

  const handleChangeEdit = (e) => {
    setEditProduct({...editProduct, [e.target.name]: e.target.value})
  }

  const handleConfirmOpen = (id) => {
    setDeleteId(id)
    setConfirmOpen(true)
  }
  const handleConfirmClose = (id) => {
    setDeleteId(null)
    setConfirmOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleDelete = async (id)  => {
    try {
        await axios.delete(`http://localhost:8081/product/${id}`);
        setProducts(products.filter(product => product.id !== id));
        handleConfirmClose()
    } catch (error) {
        console.log('Error occured deleting the product: ', error);
        alert('There was an error deleting the prduct! Please try again.');
    }
  };

  const handleEditProduct = async () => {
    try {
        const response = await axios.put(`http://localhost:8081/product/${editProduct.id}`, {
            ...editProduct,
            price: parseFloat(editProduct.price),
        });
        setProducts(products.map(product => 
            product.id === editProduct.id ? response.data : product
        ));
        handleCloseEdit();
    } catch (error) {
        console.log('Error occured updating the product', error)
        alert('There was an error updating the product! Please try again');
    }
  }

  const handleAddProduct = async () => {
    try {
        const response = await axios.post('http://localhost:8081/products', {
            ...newProduct,
            price: parseFloat(newProduct.price)
        });
        setProducts([...products, response.data])
        setNewProduct({
            name: '',
            description: '',
            brand: '',
            acquisitionDate: '',
            price: '',
          });
          handleClose();
    }catch(error){
        console.log('There was an error adding the product!', error)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8080/products').then(response => {
      console.log('here ...') 
      setProducts(response.data)
        console.log(response.data)
    }).catch((error) => {
      console.log("There was an error fetching the products", error)
    })
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);  // Reset the table to the first page whenever rows per page changes
};


  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="20%"
  >
    <TableContainer component={Paper} style={{width:'70%', margin:'4%'}}>

    <Box display="flex" justifyContent="flex-start">
        <Button variant='contained' onClick={handleClickOpen}> Add New</Button>
    </Box>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Acquisition Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            { products !== null? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
            <TableRow
            key={product.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right">{product.id}</TableCell>
            <TableCell align="right">{product.name}</TableCell>
            <TableCell align="right">{product.description}</TableCell>
            <TableCell align="right">{product.brand}</TableCell>
            <TableCell align="right">{product.acquisitionDate}</TableCell>
            <TableCell align="right">{product.price}</TableCell>
            <TableCell align='center'>
                <IconButton color='secondary' onClick={() => handleConfirmOpen(product.id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color='secondary' onClick={() => handleClickOpenEdit(product)}>
                    <EditIcon />
                </IconButton>
            </TableCell>
          </TableRow>
            ) ): (<TableRow><TableCell>Loading... </TableCell></TableRow>)}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={products!= null? products.length: 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}  // Options for rows per page
    />
    </TableContainer>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteId);
            }}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>


       {/* Modal Dialog for Adding New Product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={newProduct.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            value={newProduct.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="acquisitionDate"
            label="Acquisition Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newProduct.acquisitionDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

    {/* Modal Dialog for Editing Product */}
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={editProduct.name}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editProduct.description}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            value={editProduct.brand}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="acquisitionDate"
            label="Acquisition Date"
            type="date"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
              value={editProduct.acquisitionDate}
              onChange={handleChangeEdit}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={editProduct.price}
              onChange={handleChangeEdit}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Cancel
            </Button>
            <Button color="primary" variant="contained"  onClick={handleEditProduct} >
              Update Product
            </Button>
          </DialogActions>
        </Dialog>  

    </Box>
  )


}
