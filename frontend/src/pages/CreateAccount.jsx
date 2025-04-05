import React from "react";
import { useState } from "react";

const CreateAccount = ({ ...props }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
  <div className="min-h-screen bg-[#242424] flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Three Good Things
      </h1>

      <div className="space-y-4">
        <input
          type = "text"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
          placeholder = "Username: "
          className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
        />

        <input
          type = "email"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          placeholder = "Email: "
          className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
        />

        <input
          type = "password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          placeholder = "Password: "
          className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
        />

        <button
          className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Create Account
        </button>
      </div>
    </div>
  </div>
  );
};

export default CreateAccount;