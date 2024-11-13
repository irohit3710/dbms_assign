import React from 'react'
import Modal from 'react-responsive-modal';
import { MdDelete } from "react-icons/md";
import { UserService } from '../../service/userService';
import toast from 'react-hot-toast';

const DeleteUserModal = ({ isModalDeleteOpen, setIsModalDeleteOpen, userData,deleteHandle }) => {
    console.log(userData)
    const closeModal = ()=>{
        setIsModalDeleteOpen(false);
    }

    
    return (
        <Modal open={isModalDeleteOpen} onClose={closeModal} center>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 flex flex-col items-center">
                <div>
                    <p>Are you sure to delete this user?</p>
                </div>
                <div className='bg-red-500 p-4 rounded-full'>
                    <MdDelete color='white' size={40}/>
                </div>
                <div className='flex flex-row justify-between w-full'>
                    <button className='p-2 rounded-3xl bg-slate-300 text-black' onClick={closeModal}>Cancel</button>
                    <button className='p-2 rounded-3xl bg-red-500 text-white' onClick={()=>{deleteHandle(userData.id)}}>Delete</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteUserModal