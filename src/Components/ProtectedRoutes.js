import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/Features/alertSlice';
import axios from 'axios';
import { setUser } from '../Redux/Features/userSlice';

export default function ProtectedRoutes({children}){
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    //get user
    const getUser = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.post('https://s-provider-backend.onrender.com/api/getUserData',
                {token:localStorage.getItem('token1')},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token1')}`
                    }

                }
            )
            dispatch(hideLoading());
            if(res.data.success){
                dispatch(setUser(res.data.data));
            }
            else{
                <Navigate to='/login'/>
                localStorage.clear()
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        if(!user){
            getUser();
        }
    },[user,getUser]);

    if(localStorage.getItem('token1')){
        return children;
    }
    else{
        return <Navigate to='/login'></Navigate>
    }
}