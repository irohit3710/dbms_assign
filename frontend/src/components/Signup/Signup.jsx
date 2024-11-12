import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../service/userService';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        name:"",
        password:"",
        email:"",
    });

    const [errors, setErrors] = useState({
        username: false,
        name:false,
        password:false,
        email:false,
    })

    const handleChangeInput = (e) => {
        e.preventDefault();
        // Handle signup logic here

        console.log(e.target.value," ",e.target.name)

        setErrors({
            ...errors,
            [e.target.name]: false,
        });

        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };



    

    const handleSignup =async (e) => {
        e.preventDefault();
        // Handle signup logic here

        await UserService.userSignUp(userData).then((res)=>{
            if(res.status==200){
                toast.success('Signup success');
                navigate('/login');
                console.log("Signup success");
            }
        })
        .catch((error)=>{
            toast.error('Signup error');
            console.log(error);
        })
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Database Management System</h2>
                    <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                name='name'
                                value={userData.name}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                onChange={(e)=>{handleChangeInput(e)}}
                            />
                            {errors.name && <p className='text-red-500 text-sm'>Name is required</p>}
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                type="text"
                                name='username'
                                value={userData.username}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                onChange={(e)=>{handleChangeInput(e)}}
                            />
                            {errors.username && <p className='text-red-500 text-sm'>Username is required</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                name='email'
                                value={userData.email}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                onChange={(e)=>{handleChangeInput(e)}}
                            />
                            {errors.email && <p className='text-red-500 text-sm'>Email is required</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                name='password'
                                value={userData.password}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                onChange={(e)=>{handleChangeInput(e)}}
                            />
                            {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 duration-300"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Already have an account?</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup