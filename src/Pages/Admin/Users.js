import { message, Table } from "antd";
import Layout from "../../Components/Layout";
import axios from 'axios';
import { useEffect, useState } from "react";

const Users = () => {
    const [data , setData] = useState([]);

    const getUsers = async() => {
      try {
        const users = await axios.get('https://s-provider-backend.onrender.com/api/admin/getUsers',{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token1')}`
          }
        });
        if(users.data.success){
          setData(users.data.data);
        }
        console.log(users);
        console.log(data);
      
      } catch (error) {
        console.log(error);
        message.error('Something went wrong.');
      };
    };

    const columns = [
      {
        title:'Name',
        dataIndex:'name'
      },
      {
        title:'Email',
        dataIndex:'email'
      },
      {
        title:'User or Service Provider',
        dataIndex:'userOrServiceProvider',
        render:(text,record) => (
          <span>{record.isServiceProvider ? 'Service Provider':'Costumer'}</span>
        )
      },
      {
        title:'Actions',
        dataIndex:'actions',
        render:(text,record) => (
            <div className="d-flex">
              <button className="btn btn-danger">Block</button>
            </div>
        )
      },
    ]

    useEffect(() => {
      getUsers();
    },[])
    return(
      <Layout>
       <Table columns={columns} dataSource={data}/>
      </Layout>
    );
};

export default Users;