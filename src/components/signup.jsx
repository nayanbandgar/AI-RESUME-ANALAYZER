import React from 'react';

const Signup = () => {          
    return (
        <div class="flex items-center justify-center h-screen">
        <div class="bg-gray-500 h-90 w-90 px-5 py-5 justify-center ">
            enter your email:
            <input type="email" class="border-2 border-gray-300 rounded-lg px-4 py-2 mt-2 mb-4 w-full" placeholder="Email" />
            enter your password:
            <input type="password" class="border-2 border-gray-300 rounded-lg px-4 py-2 mt-2 mb-4 w-full" placeholder="Password" />  
            <button class="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">Signup</button>
        </div>
        </div>
    );
}                 



export default Signup;