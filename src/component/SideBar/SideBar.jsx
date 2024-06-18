import React from 'react'
import "./SideBar.css"
import { Link } from 'react-router-dom';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

function SideBar ({openSideBar, closeMenu}) {

  return (
    <>
        <aside className={ openSideBar ? "openAside" : "closeAside" }>
            <div className="aside_wrapper">

                <div className="asside_menu">
                    <Link to="https://project-pro.ir" className='sidebar_link' onClick={closeMenu}>
                      <AddHomeWorkOutlinedIcon className='sidebar_icon' />
                      <span className='sidebar_section'>Home</span>
                    </Link>
                </div>

                <div className="asside_menu">
                    <Link to="https://project-pro.ir/allUser" className='sidebar_link' onClick={closeMenu}>
                      <GroupOutlinedIcon className='sidebar_icon' />
                      <span className='sidebar_section'>All User</span>
                    </Link>
                </div>

                <div className="asside_menu">
                    <Link to="https://project-pro.ir/newUser" className='sidebar_link' onClick={closeMenu}>
                      <PersonAddOutlinedIcon className='sidebar_icon' />
                      <span className='sidebar_section'>New User</span>
                    </Link>
                </div>

                <div className="asside_menu">
                    <Link to="https://project-pro.ir/product" className='sidebar_link' onClick={closeMenu}>
                      <InventoryOutlinedIcon className='sidebar_icon' />
                      <span className='sidebar_section'>Product</span>
                    </Link>
                </div>
            </div>
        </aside>
    </>
  )
}


export default SideBar