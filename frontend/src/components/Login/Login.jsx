import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaDatabase } from "react-icons/fa";
import { UserService } from '../../service/userService';
import toast from 'react-hot-toast'

const Login = () => {
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

    const handleLogin =async (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("first")
        await UserService.userSignIn(userData).then((res)=>{
            // if(res.status==200){
                // }
                console.log(res.data.token);
                localStorage.setItem('authKey',res.data.token);
                toast.success('Login success');
                navigate('/');
                console.log("Signin success");
            })
            .catch((error)=>{
            toast.error('Login error');
            console.log(error);
        })
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Database Management System</h2>
                    <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                name='username'
                                value={userData.username}
                                onChange={(e)=>{handleChangeInput(e)}}
                            />
                            {errors.username && <p className='text-red-500 text-sm'>Username is required</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                name='password'
                                value={userData.password}
                                onChange={(e)=>{handleChangeInput(e)}}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 duration-300"
                            onClick={(e)=>{handleLogin(e)}}

                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Don't have an account?</p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-blue-600 hover:underline"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login