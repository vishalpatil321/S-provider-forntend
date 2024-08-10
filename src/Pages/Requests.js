import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { message, Table } from "antd";
import axios from "axios";
import moment from "moment";

const Requests = () => {
    const [data,setData] = useState([]);

    const getRequests = async() => {
        try {
            const res = await axios.get('https://s-provider-backend.onrender.com/api/user-requests',{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token1')}`     
                }
            });
            if(res.data.success){
                setData(res.data.data);
                
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong.');
        }
    };
    
    useEffect(() => {
        getRequests();
    },[]);

    const columns = [
        {
            title:'Id',
            dataIndex:'_id'
        },
        {
            title:'Name',
            dataIndex:'firstName',
            render:(text,record) => (
                <span>
                    {record.servicePInfo[0].firstName}  
                </span>
            )
        },
        {
            title:'Email',
            dataIndex:'email',
            render:(text,record) => (
                <span>
                    {record.userInfo[0].email}  
                </span>
            )
        },
        {
            title:'Date',
            dataIndex:'date',
            render:(text,record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}
                </span>
            )
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        
    ];

    return(
        <Layout>
           
            <Table columns={columns} dataSource={data}/>
        </Layout>
    );
};

export default Requests;