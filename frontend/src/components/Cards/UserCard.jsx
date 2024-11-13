// src/components/UserCard.js
import React from 'react';

function UserCard({ name, username, email }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Name : {name}</h2>
        <p className="text-gray-600"><span className='font-bold'>Username :</span> {username}</p>
        <p className="text-gray-700 mt-4"><span className='font-bold'>Email :</span> {email}</p>
      </div>
    </div>
  );
}

export default UserCard;
