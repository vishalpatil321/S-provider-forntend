import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { DatePicker, message, TimePicker } from "antd";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {showLoading,hideLoading} from '../Redux/Features/alertSlice';

const BookingPage = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user)
    const [data, setData] = useState(null);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const params = useParams();
    const getUserData = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/serviceP/getServiceProviderById',
                { servicePId: params.servicePId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token1')}`,
                    },
                });
            if (res.data.success) {
                setData(res.data.data);
                console.log(res.data.data);
            };
        } catch (error) {
            console.log(error);
            message.error('Something went wrong.');
        }
    };

    const handleBooking = async() => {
       try {
         dispatch(showLoading());
         const res = await axios.post('https://s-provider-backend.onrender.com/api/book-serviceP',
            {
                servicePId:params.servicePId,
                userId:user._id,
                servicePInfo:data,
                date:date,
                userInfo:user,
                time:time
            },
           {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token1')}`
            }
        }
         )
         dispatch(hideLoading());
         if(res.data.success){
            message.success(res.data.message);
         
         }
         
       } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong.');
       }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center">Booking Page</h2>
                {data && (
                    <div className="d-flex" style={{justifyContent:'space-evenly'}}>
                        <div className="mt-2">
                        <h4>Mr.{data.firstName} {data.lastName}</h4>
                        <h4>Experience : {data.experience}</h4>
                        <h4>Specialization : {data.specialization}</h4>
                        <h4>Address : {data.address}</h4>
                        <h4>Phone Number : {data.phone}</h4>
                        <h4>Email Id : {data.email}</h4>
                        <h4>Fees Per service : {data.feesPerService}</h4>
                        <button className="btn btn-dark mt-1" onClick={handleBooking}>Book Now</button>
                     </div>
                        

                    </div>
                )}

            </div>
        </Layout>
    );
};

export default BookingPage;