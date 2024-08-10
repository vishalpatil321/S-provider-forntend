import './Profile.css';
import Layout from '../../Components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form,Row,Col,Input,TimePicker, message} from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import {showLoading,hideLoading} from '../../Redux/Features/alertSlice';
import moment from 'moment';

const Profile = () =>{
    const params = useParams();
    const {user} = useSelector((state) => state.user);
    const [data,setData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getServicePInfo = async() => {
       try {
         const res = await axios.post('http://localhost:4000/api/serviceP/getServicePInfo',
            {userId:params.id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token1')}`
                }
            }
         );
         if(res.data.success){
            setData(res.data.data);
         }
       } catch (error) {
        console.log(error);
        message.error('Something went wrong');
       }
    };

   
    const updateServicePInfo = async(values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('https://s-provider-backend.onrender.com/api/serviceP/updateServicePInfo',
                {...values,userId:user._id,
                    // timings:[
                    //    moment(values.timings[0]).format('HH:mm'),
                    //    moment(values.timings[1]).format('HH:mm')
                    // ]
                },
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token1')}`
                    }
                })
            dispatch(hideLoading());
            if(res.data.success){
                navigate('/');
                message.success(res.data.message);
            }
            else{
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error('Something went wrong.');
        }
        console.log(values);
    }

    useEffect(() => {
        getServicePInfo();
    },[])

    return(
      <Layout>
          <h1>service Provider Profile page</h1>
          {data && (

          <Form layout='vertical' onFinish={updateServicePInfo} className='m-3'
           initialValues={data}>
             <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='First Name' name='firstName' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours First Name'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Last Name' name='lastName' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours Last Name'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Phone' name='phone' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours Phone Number'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Email' name='email' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours Email Id'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Website' name='website' required rules={[{required:true}]}>
                    <Input type='text' placeholder='If You Have Own Website'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Address' name='address'>
                    <Input type='text' placeholder='Enter Yours Address'></Input>
                </Form.Item>
                </Col>

             </Row>
             <h4 className='m-3'>Proffesional Details</h4>
          
          <Row gutter={20}>
             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Specialization' name='specialization' required rules={[{required:true}]}>
                 <Input type='text' placeholder='Enter Specialization In Work'></Input>
             </Form.Item>
             </Col>

             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Experience' name='experience' required rules={[{required:true}]}>
                 <Input type='text' placeholder='Enter Experience Of Work'></Input>
             </Form.Item>
             </Col>

             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Service Fees' name='feesPerService' required rules={[{required:true}]}>
                 <Input type='text' placeholder='Enter Fees Of Per Serice'></Input>
             </Form.Item>
             </Col>
{/* 
             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Timing' name='timings'>
                 <TimePicker.RangePicker format='HH:mm'/>
             </Form.Item>
             </Col> */}
             <Col xs={24} md={24} lg={8}></Col>
             <Col xs={24} md={24} lg={8}>
             <button className='btn btn-primary form-btn' type='submit'>
                 Submit
             </button>
             </Col>
          </Row>
           </Form>)}
      </Layout>
    );
};

export default Profile;