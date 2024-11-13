import React, { useEffect, useState } from 'react';
import { UserService } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserCard from '../components/Cards/UserCard';
import { CiMenuKebab } from "react-icons/ci";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import UserEditModal from '../components/Modals/UserEditModal';
import DeleteUserModal from '../components/Modals/DeleteUserModal';


const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
  });

  const toggleDropdown = (index) => {
    setIsOpen(isOpen === index ? null : index); // Toggle dropdown visibility
  };

  const getAllUsers = async () => {
    try {
      const res = await UserService.getAllUsers();
      if (res.status === 200) {
        setUsers(res.data.user);
        console.log("Got all users");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserById = async () => {
    try {
      const res = await UserService.getUserById();
      if (res.status === 200) {
        setUserDetails(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userAuthenticated = () => {
    if (!localStorage.getItem("authKey")) {
      toast.error('User is not authenticated');
      navigate('/login');
    }
  };

  const logout = () => {
    localStorage.removeItem("authKey");
    navigate('/login');
  };

  const scrollDown = () => {
    window.scrollBy({
      top: 50, // Scroll down by 300 pixels
      left: 0,
      behavior: "smooth" // Smooth scrolling
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (user) => {
    const data = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };
    setFormData(data);
    setIsModalOpen(true);
  };


  const handleDelete = (user) => {
    const data = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };
    setFormData(data);
    setIsModalDeleteOpen(true);
  }

  const handleUpdate = async (payload, id) => {
    console.log('payload updaye : ', payload);
    console.log('payload id : ', id);
    await UserService.updateUser(payload, id).then((res) => {
      if (res.status == 200) {
        toast.success('Data updated');
      }
    })
      .catch((err) => {
        console.log(err);
      })
    setIsModalOpen(false);
    getAllUsers();
  };

  const deleteHandle =async (id)=>{
    await UserService.deleteUser(id).then((res)=>{
        if(res.status==200){
            toast.success('User deleted');
        }
    })
    .catch((error)=>{
        console.log(error);
    })
    setIsModalDeleteOpen(false);
    getAllUsers();
}

  useEffect(() => {
    getAllUsers();
    userAuthenticated();
    getUserById();
  }, []); // Add proper dependencies if needed

  return (
    <>
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Database Management System</h1>
          <p className="mb-6">Discover our services and how we can help you grow your business.</p>
          <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-slate-300 duration-300" onClick={scrollDown}>
            Get Started
          </button>
        </div>
      </div>

      <div className='px-10 mt-5'>
        <h1 className='text-3xl font-bold'>Logged in user</h1>
        {userDetails && <UserCard name={userDetails.name} username={userDetails.username} email={userDetails.email} />}
      </div>

      <div className='px-10 mt-5'>
        <h1 className='text-3xl font-bold'>All Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="text-white text-left">
                <th className="bg-blue-600 border-2 border-l-white py-3 px-6 font-semibold">S. No</th>
                <th className="bg-blue-600 border-2 border-l-white py-3 px-6 font-semibold">Name</th>
                <th className="bg-blue-600 border-2 border-l-white py-3 px-6 font-semibold">Email</th>
                <th className="bg-blue-600 border-2 border-l-white py-3 px-6 font-semibold">Username</th>
                <th className="bg-blue-600 border-2 border-l-white py-3 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 && users.map((user, index) => (
                <tr key={index} className="even:bg-gray-100 hover:bg-gray-200 duration-150">
                  <td className="py-4 px-6 border-b">{index + 1}</td>
                  <td className="py-4 px-6 border-b">{user.name}</td>
                  <td className="py-4 px-6 border-b">{user.email}</td>
                  <td className="py-4 px-6 border-b">{user.username}</td>
                  <td className="py-4 px-6 border-b">
                    <CiMenuKebab onClick={() => toggleDropdown(index)} className="cursor-pointer" />
                    {isOpen === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
                        <ul className="text-sm text-gray-700">
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleOpenModal(user)}
                            data-modal-target="popup-modal" data-modal-toggle="popup-modal"
                          >
                            Update
                          </li>
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => { handleDelete(user) }}
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserEditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        initialData={formData}
        handleUpdate={handleUpdate}
      />
      <DeleteUserModal
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        userData={formData}
        deleteHandle={deleteHandle}
      />
    </>
  );
};

export default Home;
