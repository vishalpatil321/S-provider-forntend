import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { message, Table } from "antd";
import moment from 'moment';
import axios from "axios";

const ServicePRequests = () => {

    const [data,setData] = useState([]);

    const getRequests = async() => {
        try {
            const res = await axios.get('https://s-provider-backend.onrender.com/api/serviceP/getUserRequests',{
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

    const handleStatus = async(record,status) => {
          try {
            const res = await axios.post('https://s-provider-backend.onrender.com/api/serviceP/update-status',{
                requestId:record._id,status
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token1')}`
                }
            });
            if(res.data.success){
                 message.success(res.data.message);
                 getRequests();
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
            title:'Name',
            dataIndex:'name',
            render:(text,record) => (
                <div>
                    <h5>{record.userInfo[0].name}</h5>
                </div>
            )
        },
        {
            title:'Phone',
            dataIndex:'phone',
            render:(text,record) => (
                <span>
                    {record.userInfo[0].phone} 
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
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record) => (
                <div className="d-flex">
                    {record.status === 'pending' && (
                        <div className="d-flex">
                            <button className="btn btn-success" onClick={() =>handleStatus(record,'accept')}>Accept</button>
                            <button className="btn btn-danger" style={{marginLeft:'5px'}} onClick={() =>handleStatus(record,'reject')}>Reject</button>
                       </div>)}
                </div>
            )
        }
        
    ]

    return(
      
        <Layout>
            <h1>Requests page</h1>
            <Table columns={columns} dataSource={data}/>
        </Layout>
    
    );
};

export default ServicePRequests;
