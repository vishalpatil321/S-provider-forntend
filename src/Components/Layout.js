import React, { useState } from 'react';
import './Layout.css';
import  {adminMenu, userMenu}  from '../Components/Menu';
import {message ,Badge} from 'antd';
import { Link , useLocation,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate();
    const location = useLocation();
    const [menu,setMenu] = useState(false);

    const logOutHandler = () => {
      localStorage.clear();
      message.success('Logout successfully');
      navigate('/login');
    };

    //service provider menu//
    const servicePmenu = [
      {
        name:'Home',
        path:'/',
        icon:'fa-solid fa-house'
      },
      {
       name:'Requests',
       path:'/serviceP-requests',
       icon:'fa-solid fa-list'
     },
     {
       name:'Profile',
       path:`/serviceP/profile/${user?._id}`,
       icon:'fa-solid fa-user'
     },
    
   ];

   const sideBarMenu = user?.isAdmin 
   ? adminMenu 
   : user?.isServiceProvider
   ? servicePmenu
   : userMenu;

    return(
        <>
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                  <div className='logo'>
                    <h6><i class="fa-solid fa-screwdriver-wrench text-dark"></i> S Priovider</h6>
                    <hr/>
                    </div>
                  <div className='menu'>
                    {sideBarMenu.map((item) => {
                        const isActive = location.pathname === item.path;
                        return(
                            <>
                             <div className={`menu-item ${isActive && 'active'}`}>
                                <i className={item.icon}></i>
                                <Link to={item.path} onClick={() => setMenu(false)}>{item.name}</Link>
                             </div>
                            </>
                        )
                    })
                    }
                    <div className={`menu-item`} onClick={logOutHandler}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                             </div>
                  </div>
                </div>
                <div className='content'>
                  <div className='header'>
                    <div className='header-content'>
                    <Link to='/profile'><b>{user?.name}</b></Link>
                    <Badge count={user && user.notification.length} onClick={() => {navigate('/notifications')}} className='mt-4'>
                      <i class='fa-solid fa-bell text-center bell' style={{cursor:'pointer'}}></i>
                    </Badge>
                      
                    </div>
                  </div>
                  <div className='body p-3'>{children}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Layout;