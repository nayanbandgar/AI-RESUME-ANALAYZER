import React from 'react';

const Sidebar = () => {
  return (
    <div class="bg-gray-500 h-screen w-64 px-5 py-5">
        <h1 class="text-2xl font-bold mb-4">Sidebar</h1>
        <ul>                                          
            <li class="mb-2"><a href="#" class="text-gray-300 hover:text-white">DashBoard</a></li>
            <li class="mb-2"><a href="#" class="text-gray-300 hover:text-white">Resumes Analyzer</a></li>
            <li class="mb-2"><a href="#" class="text-gray-300 hover:text-white">Analytics</a></li>
            <li class="mb-2"><a href="#" class="text-gray-300 hover:text-white">Settings</a></li>
        </ul>
    </div>
  );
}       

export default Sidebar;