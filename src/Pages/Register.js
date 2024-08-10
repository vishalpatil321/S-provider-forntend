import './Register.css';
import {Form,Input, message} from 'antd';
import {Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../Redux/Features/alertSlice';
import axios from 'axios';

const Register = () => {
    const dispatch = useDispatch();
     const navigate = useNavigate();
     
     const onFinishHandler = async(values) => {
     console.log(values);
        try {
            dispatch(showLoading());
            const res = await axios.post('https://s-provider-backend.onrender.com/api/register',values);
            dispatch(hideLoading());
            if(res.data.success){
                message.success('Register Successfully');
                navigate('/login');
            }
            else{
                message.error(res.data.message);
            }
            
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    }

    return(
        <div className='form-container'>
           <div className='form-content'>
            <div className='design1'>
              <h1 className='well text-light'>Wellcome to </h1>
              <h3><b className='text-success text-light'><i class="fa-solid fa-screwdriver-wrench text-dark"></i> S</b> Provider</h3>
            <h2 className='text-success text-light'>Register Page</h2>
            </div>

          <Form layout='vertical' onFinish={onFinishHandler} className='form1'>
            <Form.Item label='Name' name='name' className='lable'>
                <Input type='text' required  className='input' placeholder='Enter yours name'></Input>
            </Form.Item>

            <Form.Item label='Phone Number' name='phone' className='lable'>
                <Input type='text' required className='input' placeholder='Enter your Phone Number'></Input>
            </Form.Item>

            <Form.Item label='Email' name='email' className='lable'>
                <Input type='email' required className='input' placeholder='Enter your email id'></Input>
            </Form.Item>

            <Form.Item label='Password' name='password' className='lable'>
                <Input type='password' required className='input' placeholder='Enter password'></Input>
            </Form.Item>
            <Link to='/login'>You can login from here</Link>
            <button className='btn btn-success register-button' type='submit'>Register</button>
          </Form>
          </div>
        </div>
    );
};

export default Register;