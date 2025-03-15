'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../shopContext'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
 
  const {setMess} = useShop()
  useEffect(()=>{
    setMess({message:'',type:''});
    const token = localStorage.getItem('JwtToken');
    if(token){
      setIsSignUp(false)
    }
    else{
      setIsSignUp(true)
    }
  },[])

  const toggleForm = () => {
    setIsSignUp(!isSignUp)
    setMess({message:'',type:''});
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? 'signup' : 'signin'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isSignUp ? <SignUpForm /> : <SignInForm />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={toggleForm}
            className="w-full text-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}

function SignInForm() {
  const { handleSignIn , mess } = useShop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      console.error("Email and password are required!");
      return;
    }

    await handleSignIn({ email, password });
    if(mess.type==='success'){
      navigate('/')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     {mess.message && <motion.div 
      className={`h-9 capitalize   ${mess.type === 'success' ? 'text-green-500 bg-green-100': 'text-red-500 bg-orange-100'} w-full gap-2 flex justify-start px-4 items-center  rounded-md`}
      initial={mess.message?{ opacity: 0, scale: 0.9 }:{}}
              animate={{ opacity: 1, scale:1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              >
        <span className={` rounded-full h-6 w-6 flex items-center justify-center ${mess.type === 'success' ? 'text-green-500': 'text-red-500 '} bg-white `}>!</span> <p className=''>{mess.message}</p> 
      </motion.div>}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Sign In
      </button>
    </form>
  );
}



function SignUpForm() {
  const { handleSignUp, mess , setMess } = useShop();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate()

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Clear error if passwords match
    await handleSignUp(formData);
    if(mess.type==='success'){
      navigate('/')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mess.message && <motion.div 
      className={`h-9 capitalize ${mess.type === 'success' ? 'text-green-500 bg-green-100': 'text-red-500 bg-orange-100'} w-full gap-2 flex justify-start px-4 items-center  rounded-md`}
      initial={mess.message?{ opacity: 0, scale: 0.9 }:{}}
              animate={{ opacity: 1, scale:1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              >
        <span className={` rounded-full h-6 w-6 flex items-center justify-center ${mess.type === 'success' ? 'text-green-500': 'text-red-500 '} bg-white `}>!</span> <p className=''>{mess.message}</p> 
      </motion.div>}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="fullname"
          type="text"
          onChange={handleInputChange}
          value={formData.fullname}
          placeholder="Enter your full name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="Create a password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={handleInputChange}
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Sign Up
      </button>
    </form>
  );
}


