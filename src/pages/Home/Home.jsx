import React from 'react'
import "./Home.css"
import Chart from '../../component/Chart/Chart';
import {xAxisData} from "../../ChartDatas"

import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

function Home () {
  return (
    <>
      <div className="home_wrapper">
          <h3 className='reports_title'>Reports</h3>
          <div className="sales_info">
              <div className="order_box">
                  <LocalMallOutlinedIcon className='sales_icon' />
                  <div className="order_box_body">
                    <span>ORDERS</span>
                    <span>5610</span>
                  </div>
              </div>
              <div className="order_box">
                  <ShoppingCartOutlinedIcon className='sales_icon' />
                  <div className="order_box_body">
                    <span>PRODUCTS</span>
                    <span>23</span>
                  </div>
              </div>
              <div className="order_box">
                  <AttachMoneyOutlinedIcon className='sales_icon' />
                  <div className="order_box_body">
                    <span>TRANSACTIONS</span>
                    <span>1942</span>
                  </div>
              </div>
          </div>

          <div className="performance_indicators">
              <h4>Key Performance Indicators</h4>
              <hr />
              <div className="box_wrapper">
                <div className="performance_box">
                    <h5>REVENUE</h5>
                    <span className='performance_count'>$4,800.00</span>
                </div>
                <div className="performance_box">
                    <h5>NET</h5>
                    <span className='performance_count'>$4,900,24</span>
                </div>
                <div className="performance_box">
                    <h5>PENDING ORDERS</h5>
                    <span className='performance_count'>$1,600.50</span>
                </div>
                <div className="performance_box">
                    <h5>DUE</h5>
                    <span className='performance_count'>$6,900.10</span>
                </div>
                <div className="performance_box">
                    <h5>OVERDUE</h5>
                    <span className='performance_count'>$6,500.80</span>
                </div>
              </div>
              <div className="chart_wrapper">
                <Chart grid title="Month Sale" data={xAxisData} dataKey="sale" />
              </div>
          </div>

      </div>
    </>
  )
}

export default Home