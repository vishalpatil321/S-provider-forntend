import './ApplyServiceP.css';
import Layout from '../Components/Layout'
import { Form,Row,Col,Input,TimePicker, message} from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {showLoading,hideLoading} from '../Redux/Features/alertSlice';
import axios from 'axios';

const ApplyServiceP = () => {
    const {user} = useSelector(state => state.user);
     const dispatch = useDispatch();
     const navigate = useNavigate();
    const handleSubmit = async(values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('https://s-provider-backend.onrender.com/api/apply-provide-service',
                {...values,userId:user._id},
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
    return(
       <Layout>
           <h2 className='text-center heading' style={{color:'green'}}>Apply Service</h2>
           <h4 className='m-3' style={{color:'green'}}>Personal Details</h4>
           <Form layout='vertical' onFinish={handleSubmit} className='m-3'>
             <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='First Name' name='firstName' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours First Name' className='input'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Last Name' name='lastName' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours Last Name' className='input'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Phone' name='phone' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours Phone Number' className='input'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Email' name='email' required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Yours Email Id' className='input'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Website' name='website' required rules={[{required:true}]}>
                    <Input type='text' placeholder='If You Have Own Website' className='input'></Input>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Address' name='address'>
                    <Input type='text' placeholder='Enter Yours Address' className='input'></Input>
                </Form.Item>
                </Col>

             </Row>
             <h4 className='m-3' style={{color:'green'}}>Proffesional Details</h4>
          
          <Row gutter={20}>
             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Specialization' name='specialization' required rules={[{required:true}]}>
                 <Input type='text' placeholder='Enter Specialization In Work' className='input'></Input>
             </Form.Item>
             </Col>

             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Experience' name='experience' required rules={[{required:true}]}>
                 <Input type='text' placeholder='Enter Experience Of Work' className='input'></Input>
             </Form.Item>
             </Col>

             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Service Fees' name='feesPerService' required rules={[{required:true}]}>
                 <Input type='text' placeholder='Enter Fees Of Per Serice' className='input'></Input>
             </Form.Item>
             </Col>

             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Timing' name='timings' >
                 <TimePicker.RangePicker format='HH:mm' className='input'/>
             </Form.Item>
             </Col>
             <Col xs={24} md={24} lg={8}></Col>
             <Col xs={24} md={24} lg={8}>
             <button className='btn btn-primary form-btn submit-button' type='submit'>
                 Submit
             </button>
             </Col>
          </Row>
           </Form>
         
       </Layout>
    );
};

export default ApplyServiceP;