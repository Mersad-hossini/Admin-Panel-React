import React, { useState, useEffect } from 'react'
import "./Product.css"
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../../component/Loading/Loading';
import { DataGrid } from '@mui/x-data-grid';
import ModalInput from '../../component/Modal/ModalInput';
import { Button, InputLabel, MenuItem, Alert, Select } from '@mui/material'
import { Link } from 'react-router-dom';

function Product () {

  let [getProduct, setGetProduct] = useState([])
  let [loading, setLoading] = useState(true)
  let [product, setProduct] = useState("")
  let [stock, setStock] = useState("")
  let [status, setStatus] = useState("")
  let [price, setPrice] = useState("")
  let [alert, setAlert] = useState({ show: false, severity: '', message: '' });
  
  // For Real time show us product
  let [getData, setGetData] = useState(false)

    // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = (params) => setOpen(true);
  const handleClose = () => setOpen(false);

  // Post Product Data
  const submitProduct = async (e) => {
    e.preventDefault()

    let productInfo = {
      product,
      stock,
      status,
      price,
    }
    await fetch('https://mersad-panel-default-rtdb.firebaseio.com/product.json', {
      method: 'POST',
      body: JSON.stringify(productInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
        if(res.ok) {
          setAlert({ show: true, severity: 'success', message: 'Product successfully added!' });
          handleClose()
          setProduct("")
          setStock("")
          setStatus("")
          setPrice("")
          setGetData(prev => !prev)
        } else {
          setAlert({ show: true, severity: 'success', message: 'Error adding Product data!!' });
        }
    })
    .catch(() => {
      setAlert({ show: true, severity: 'error', message: 'Network error (Use VPN)' });
    });
  }

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, severity: '', message: '' });
      }, 3000);
      handleClose()
      return () => clearTimeout(timer);
    }
  }, [alert]);

    // Get Product Api
    useEffect(() => {
      let fetchData = async () => {
        try {
          let response = await fetch('https://mersad-panel-default-rtdb.firebaseio.com/product.json');
          let data = await response.json();
          if (data) {
            let formattedData = Object.entries(data).map(([id, productData]) => ({
              id, 
              ...productData
            }));
            setGetProduct(formattedData);
          } else {
            setGetProduct([]); 
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          setGetProduct([]); 
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [getData]);


    // Delete Product
    const deleteProduct = async (productId) => {
      await fetch(`https://mersad-panel-default-rtdb.firebaseio.com/product/${productId}.json`, {
        method:"DELETE"
      })
      setGetData(prev => !prev)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 130
    },
    {
      field: 'product',
      headerName: 'Product',
      width: 130
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 130
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 130
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
          return (
              <div className='actions_icon' style={{margin: '0'}}>
                <Link to={`https://project-pro.ir/product/${params.row.id}`}>
                  <button className='product_list_edit'>Edit</button>
                </Link>
                <DeleteIcon onClick={() => {deleteProduct(params.row.id)}} className="product_list_delete"/>
              </div>
          )
      }
    },
  ]

  return (
    <div className='product_wrapper'>
      {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="add_product_button">
            <Button variant="contained" onClick={handleOpen}>Add New Product</Button>
          </div>
          {getProduct.length === 0 ? (
            <Alert severity='error' className='product_alert'>No products available.</Alert>
          ) : (
            <DataGrid
              rows={getProduct}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[2, 4 , 5, 10, 15]}
              checkboxSelection
              style={{fontSize:'16px', fontWeight:"400", height:"74vh"}}
            />
          )}
        </>
      )}

      <ModalInput open={open} onClose={handleClose}>
        <form autoComplete='off' onSubmit={submitProduct}>
          <div className="add_product">
            <input type="text" placeholder='Product' value={product} onChange={e => setProduct(e.target.value)} required />
          </div>

          <div className="add_product">
            <input type="text" placeholder='Stock' value={stock} onChange={e => setStock(e.target.value)} required />
          </div>

          <div className="add_product">
            <input type="text" placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} required />
          </div>

          <div className="add_product">
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={e => setStatus(e.target.value)}
              label="Status"
              style={{ width: '100%' }}
              required
            >
              <MenuItem value={"Active"}><em>Active</em></MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
            </Select>
          </div>

          <Button style={{ width: '500px' }} type="submit" variant="contained">Add Product</Button>
        </form>
      </ModalInput>
    </div>
  );
}

export default Product