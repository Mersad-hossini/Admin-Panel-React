import React, { useState, useEffect } from 'react';
import "./MainProduct.css"
import Chart from '../../component/Chart/Chart';
import {productsData} from "../../ChartDatas"
import { useParams } from 'react-router-dom';
import Loading from '../../component/Loading/Loading';
import { Button, MenuItem, Alert, Select } from '@mui/material'

function MainProduct () {

    const [mainProduct, setMainProduct] = useState(null);
    const params = useParams();
    let [loading, setLoading] = useState(true)
    let [product, setProduct] = useState("")
    let [stock, setStock] = useState("")
    let [status, setStatus] = useState("")
    let [price, setPrice] = useState("")

    // For Real time show us product
    let [getData, setGetData] = useState(false)

    useEffect(() => {
        let fetchData = async () => {
          try {
            let response = await fetch('https://mersad-panel-default-rtdb.firebaseio.com/product.json');
            let data = await response.json();
            let formattedData = Object.entries(data).map(([id, productData]) => ({
              id, // Unique ID
              ...productData
            }));
            setMainProduct(formattedData.find(product => {
                return product.id === params.productId
            }))
            setGetData(prev => !prev)
          } catch (error) {
            console.error('Error fetching Product:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [getData]);

      const productEditHandler = async (e) => {
        e.preventDefault()

        let productInfo = {
            product,
            stock,
            status,
            price,
        }
        
        await fetch(`https://mersad-panel-default-rtdb.firebaseio.com/product/${params.productId}.json`, {
            method: 'PUT',
            body: JSON.stringify(productInfo),
            headers: {
            'Content-Type': 'application/json',
            },
        })
            setGetData(prev => !prev)
      }

    return (
        <div className='main_product_wrapper'>
          {loading ? (
            <Loading />
          ) : (
            !mainProduct ? (
              <Alert severity='error' className='user_alert'>The Product isn't available.</Alert>
            ) : (
              <>
                <div className="product_info">
                  <Chart title="Sales In Week" data={productsData} dataKey="sales" />
                </div>
                
                <div className="product_info">
                  <div className="product_name">
                    <h3>{mainProduct.product}</h3>
                  </div>
    
                  <div className="product_attribute">
                    <h3>Id</h3>
                    <span>{mainProduct.id}</span>
                  </div>
    
                  <div className="product_attribute">
                    <h3>Salse</h3>
                    <span>{mainProduct.stock}</span>
                  </div>
    
                  <div className="product_attribute">
                    <h3>Status</h3>
                    <span>{mainProduct.status}</span>
                  </div>
    
                  <div className="product_attribute">
                    <h3>Price</h3>
                    <span>{mainProduct.price}</span>
                  </div>
                </div>
    
                <div className="product_update">
                  <form className='update_form_product' onSubmit={productEditHandler}>
                    <input
                      type="text"
                      placeholder='Product Name'
                      required
                      value={product}
                      onChange={e => setProduct(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder='Stock'
                      required
                      value={stock}
                      onChange={e => setStock(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder='Price'
                      required
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      label="Status"
                      required
                      className='select_box_product_status'
                    >
                      <MenuItem className='select_box_option' value={"Active"}><em>Active</em></MenuItem>
                      <MenuItem className='select_box_option' value={"Inactive"}><em>Inactive</em></MenuItem>
                    </Select>
                    <Button className='product_button_update' type="submit" variant="contained">Update Product</Button>
                  </form>
                </div>
              </>
            )
          )}
        </div>
      );
}

export default MainProduct;