import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const menuBar = user ? 
    <div className="flex align-middle justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-5 text-xl w-full">
        <div className="w-1/3 text-white text-sm lg:text-lg break-all">Hi {user.username}!</div>
        <Link className="cursor-pointer w-1/3" to="/">
            <div className="text-white text-sm italic flex justify-center font-serif lg:text-xl">Superapp</div>
        </Link>
        <div className="w-1/3 cursor-pointer text-white flex flex-row-reverse text-sm lg:text-lg"onClick={logout}>Logout</div>
    </div>
   : 
    <div className="flex bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-5 text-xl w-full">
        <div className="w-1/3">
            <Link className="cursor-pointer text-2xl italic font-serif" to="/">Superapp</Link>
        </div>
        <div className="w-1/3"></div>
        <div className="w-1/3 flex flex-row-reverse">
            <Link className="cursor-pointer" to="/register">Register</Link>
            <Link className="cursor-pointer pr-5" to="/login">Login</Link>
        </div>
    </div>
  ;

  return menuBar;
}

export default MenuBar;