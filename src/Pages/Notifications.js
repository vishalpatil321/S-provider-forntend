import { useSelector } from 'react-redux';
import Layout from '../Components/Layout';
import './Notifications.css';
import {message, Tabs} from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../Redux/Features/alertSlice';

const Notifications = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    console.log(user);

    const handleMarkRead = async() => {
       try {
        dispatch(showLoading());
         const res = await axios.post('http://localhost:4000/api/get-notifications',
            {userId:user._id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token1')}`
                }
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
                window.location.reload();
            }
            else{
                message.error(res.data.message)
            }
       } catch (error) {
        dispatch(hideLoading());
         console.log(error);
         message.error('Something went wrong.');
       };
    };

    const handleDeleteRead = async() => {
       try {
        dispatch(showLoading());
        const res = await axios.post('https://s-provider-backend.onrender.com/api/delete-notifications',
            {userId:user._id},
          {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token1')}`
            }
        }
        );
        dispatch(hideLoading)
        if(res.data.success){
            message.success(res.data.message);
            window.location.reload();
        }
        else{
            message.error(res.data.message);
        }
       } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong.');
       };
    };

    return(
       <Layout>
        
            <h2 className='p-3 text-center heading' style={{color:'green'}}>Notifications</h2>
            <Tabs style={{color:'green'}} className='notification-container'>
                <Tabs.TabPane tab='Unread' key={0} >
                    <div className='d-flex justify-content-end'>
                        <h5 className='p-2' onClick={handleMarkRead} style={{cursor:'pointer'}}>Mark all read</h5>
                    </div>
                    {user?.notification.map((notificationMsg) => (
                        <div className='card text-center p-2' onClick={() => navigate(notificationMsg.onClickPath)} style={{cursor:'pointer',color:'rgb(76, 198, 76)'}}>
                            <div className='card-text notification p-1'>
                            <i className='fa-solid fa-bell'></i><h6 className='p-2'>{notificationMsg.message}</h6>
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='read' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h5 className='p-2 text-success' onClick={handleDeleteRead} style={{cursor:'pointer'}}>Delete all read</h5>
                    </div>
                    {user?.seenNotification.map((notificationMsg) => (
                        <div className='card text-center p-2' onClick={() => navigate(notificationMsg.onClickPath)} style={{cursor:'pointer'}}>
                            <div className='card-text notification p-1'>
                            <i className='fa-solid fa-eye'></i><h6 className='p-2'>{notificationMsg.message}</h6>
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        
       </Layout>
    );
};

export default Notifications;