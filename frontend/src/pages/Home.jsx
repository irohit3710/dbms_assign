import React, { useEffect, useState } from 'react'
import { UserService } from '../service/userService';

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUserDetails =async (email) => {
    await UserService.getUserByEmail(email).then((res)=>{
      if(res.status==200){
        TransformStream.success('Got user details');
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  const getAllUsers =async ()=>{
    await UserService.getAllUsers().then((res)=>{
      if(res.status==200){
        setUsers(res.data.users);
        console.log("Got all users");
      }
    })
  }

  useEffect(()=>{
    getAllUsers();
  },[]);

  return (
    <>
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Database Management System</h1>
          <p className="mb-6">Discover our services and how we can help you grow your business.</p>
          <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-slate-300 duration-300">
            Get Started
          </button>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold'>User Details</h1>
      </div>
    </>
  );
}

export default Home