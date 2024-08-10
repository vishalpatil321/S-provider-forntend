import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import { message, Row } from "antd";
import ServiceProvider from "../Components/ServiceProvider";
const Home = () => {
    const [data,setData] = useState(null);
    const getUserData = async() => {
        try {
            const res = await axios.get('https://s-provider-backend.onrender.com/api/getAllServiceProviders',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token1')}`,
                },
            });
            if(res.data.success){
                setData(res.data.data);
            };
        } catch (error) {
            console.log(error);
            message.error('Something went wrong.');
        }
    };

    useEffect(() => {
        getUserData();
    },[]);
    return(
       <>
       <Layout>
        <h1 className="text-center text-success heading">Home Page</h1>
        <Row>
            {data && data.map((serviceProvider) => (<ServiceProvider data={serviceProvider} />))}
        </Row>
       </Layout>
       </>
    );
};

export default Home;