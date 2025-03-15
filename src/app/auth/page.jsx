'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../shopContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { setMess } = useShop();
  
  useEffect(() => {
    setMess({ message: '', type: '' });
    const token = localStorage.getItem('JwtToken');
    setIsSignUp(!token);
  }, []);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setMess({ message: '', type: '' });
  };

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
  );
}

function SignInForm() {
  const { handleSignIn, mess } = useShop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await handleSignIn({ email, password });
    setTimeout(()=>{
        if (mess.type === 'success') {
      router.push('/');
    } 
    }, 3000)
   
  };
  useEffect(() => {
    if (mess.type === 'success') {
      router.push('/');
    }
  }, [mess]); // Runs whenever `mess` changes

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mess.message && <Notification message={mess.message} type={mess.type} />}
      <InputField id="email" label="Email" type="email" value={email} onChange={setEmail} />
      <InputField id="password" label="Password" type="password" value={password} onChange={setPassword} />
      <SubmitButton text="Sign In" />
    </form>
  );
}

function SignUpForm() {
  const { handleSignUp, mess } = useShop();
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    await handleSignUp(formData);
    setTimeout(()=>{
        if (mess.type === 'success') {
      router.push('/');
    } 
    }, 3000)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mess.message && <Notification message={mess.message} type={mess.type} />}
      <InputField id="name" name="fullname" label="Full Name" type="text" value={formData.fullname} onChange={handleInputChange} />
      <InputField id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} />
      <InputField id="password" name="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
      <InputField id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <SubmitButton text="Sign Up" />
    </form>
  );
}

function InputField({ id, label, type, value, onChange, name }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
    >
      {text}
    </button>
  );
}

function Notification({ message, type }) {
  return (
    <motion.div
      className={`h-9 capitalize ${type === 'success' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-orange-100'} w-full flex items-center px-4 rounded-md`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`rounded-full h-6 w-6 flex items-center justify-center ${type === 'success' ? 'text-green-500' : 'text-red-500'} bg-white`}>!</span>
      <p>{message}</p>
    </motion.div>
  );
}
