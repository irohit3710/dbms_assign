// src/components/UserEditModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { UserService } from '../../service/userService';
import toast from 'react-hot-toast';

function UserEditModal({ isModalOpen, setIsModalOpen, initialData,handleUpdate }) {
    console.log(initialData)
    const [formData, setFormData] = useState({
        name: initialData.name,
        username: initialData.username,
        email: initialData.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateData = async () => {
        const payload = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
        }
        handleUpdate(payload, initialData.id);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    }

    const InitialiseFormData = () => {
        setFormData({
            name: initialData.name,
            username: initialData.username,
            email: initialData.email,
        });
    }

    useEffect(() => {
        InitialiseFormData();
    }, [initialData])

    if (!isModalOpen) return null;

    return (
        <Modal open={isModalOpen} onClose={closeModal} center>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Edit User Details</h2>

                {/* Input fields for name, username, and email */}
                <div className="space-y-2">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Cancel and Update buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={() => { closeModal() }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateData}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Update
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default UserEditModal;
