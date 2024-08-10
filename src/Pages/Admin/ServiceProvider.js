import { message, Table } from "antd";
import Layout from "../../Components/Layout";
import axios from 'axios';
import { useEffect, useState } from "react";

const ServiceProviders = () => {
  const [data , setData] = useState([]);
  const getServiceProviders = async() => {
    try {
      const serviceProviders = await axios.get('http://localhost:4000/api/admin/getServiceProviders',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token1')}`,
        }
      });
      if(serviceProviders.data.success){
        setData(serviceProviders.data.data);
      }
    
    } catch (error) {
      console.log(error);
      message.error('Something went wrong.');
    };
  };

  const handleApprove = async(record,status) => {
    try {
      const res = await axios.post('https://s-provider-backend.onrender.com/api/admin/changeAccountStatus',
        {servicePId:record._id,userId:record.userId,status:status},
        {
           headers:{
            Authorization:`Bearer ${localStorage.getItem('token1')}`
           }
        });
        if(res.data.success){
          message.success(res.data.message);
          window.location.reload();
        }
    } catch (error) {
        console.log(error);
        message.error('Something went wrong.');
    }
  }

  const columns = [
    {
      title:'Name',
      dataIndex:'name',
      render:(text,record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:'Status',
      dataIndex:'status',
    },
    {
      title:'Phone',
      dataIndex:'phone'
    },
    {
      title:'Actions',
      dataIndex:'action',
      render:(text,record) => (
          <div className="d-flex">
            {record.status === 'Pending' ? <button className="btn btn-success" onClick={() => {handleApprove(record,'approved')}}>Approve</button> 
            : 
            <button className="btn btn-danger">Reject</button>
            }
          </div>
      )
    },
  ]

  useEffect(() => {
    getServiceProviders();
  },[])
    return(
      <Layout>
        <Table columns={columns} dataSource={data}/>
      </Layout>
    );
};

export default ServiceProviders;