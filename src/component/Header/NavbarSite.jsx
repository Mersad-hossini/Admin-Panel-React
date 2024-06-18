import React from 'react'
import "./NavbarSite.css"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function NavbarSite ({toggleMenu, navIcon}) {
  return (
    <>
        <nav>
            <div className="container">
                <div className="left-side-mediumSize">
                    <Link to="https://project-pro.ir">
                        <span>Mersad Web</span>
                    </Link>
                </div>
                <div className="right-side">
                    <NotificationsIcon className='nav_icon' />
                    <SettingsIcon className='nav_icon' />
                    <LanguageIcon className='nav_icon' />
                    <img className='user_img' src="images/user1.jpeg" />
                </div>
                <div className="left-side-smallSize">
                    <Link to="https://project-pro.ir">
                        <span>Mersad Web</span>
                    </Link>
                    {navIcon ? (
                        <CloseIcon className='line_bar_menu' onClick={toggleMenu} />
                    ) : (
                        <ClearAllIcon className='line_bar_menu' onClick={toggleMenu} />
                    )}
                </div>
            </div>
        </nav>
    </>
  )
}

export default NavbarSite