import {Form,Input,message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../Redux/Features/alertSlice';
import axios from 'axios';
import './Login.css';
import { ColorFactory } from 'antd/es/color-picker/color';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinishHandler = async(values) => {
      try {
      
        const res = await axios.post('https://s-provider-backend.onrender.com/api/login',values);
        window.location.reload();
        dispatch(hideLoading());
        if(res.data.success){
            localStorage.setItem('token1',res.data.token);
            message.success('Login Successfully');
            navigate('/');
        }
        else{
            message.error(res.data.message);
        }
      } catch (error) {
       
        console.log(error);
        message.error('Something went wrong');
      }
    }

    return(
        <div className='form-container2'>
          <div className='form-content2'>
            <div className='design2'>
              <h1 className='well2'>Wellcome to</h1>
              <h3><b className='text-success'><i class="fa-solid fa-screwdriver-wrench text-dark"></i> S</b> Provider</h3>
            <h2 className='text-success'>Login Page</h2>
            </div>
        
      <Form layout='vertical' onFinish={onFinishHandler} className='form2'>

        <Form.Item label=' ' name='email' className='lable'>
            <Input type='email' required className='input' placeholder='Enter yours email id'></Input>
        </Form.Item>

        <Form.Item  label=' ' name='password' className='lable'>
            <Input type='password' required className='input' placeholder='Enter password'></Input>
        </Form.Item>
        <Link to='/register' className='text-light'>You can register or signup from hear</Link>
        <button className='btn btn-light login-button' type='submit'>Login</button>
      </Form>
      </div>
    </div>
    );
};

export default Login;
