"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, LogIn } from "lucide-react";
import { useShop } from "../shopContext";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Head from "next/head";
const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);


const PurchaseHistoryItem = ({ order, onEdit }) => {
  // Format the date using date-fns
  const formatDate = (date) => format(new Date(date), "MMMM dd, yyyy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Order Details</h3>
        <span className="text-sm text-gray-500">{formatDate(order.order_date)}</span>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-800 font-semibold mb-2">
          Total Amount: <span className="text-blue-600">${order.total_amount.toFixed(2)}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {order.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md overflow-hidden"
            >
              <Image
        height={200}
        width={200}
                src={item.productId.product_image}
                alt={item.productId.product_name}
                className="w-16 h-16 object-cover rounded "
              />
              <div>
                <p className="font-medium text-gray-800 truncate">
                  {item.productId.product_name}
                </p>
                <p className="text-gray-600 text-sm">
                  Price: ${item.productId.product_price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onEdit(order)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Edit Order
        </button>
      </div>
    </motion.div>
  );
};


const FavoriteItem = ({ item, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
  >
    <Image
        height={200}
        width={200}
      src={item.productId.product_image}
      alt={item.productId.product_name}
      className="w-20 h-20 object-cover rounded"
    />
    <div className="flex-grow">
      <h3 className="font-semibold">{item.productId.product_name}</h3>
      <p className="text-gray-600">
        ${item.productId.product_price.toFixed(2)}
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="text-red-500 hover:text-red-600"
      onClick={() => onRemove(item.productId._id)}
    >
      <Heart size={24} fill="currentColor" />
    </motion.button>
  </motion.div>
);

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("purchases");
  const [favoriteItems, setFavoriteItems] = useState([
    { id: 1, name: "Wireless Earbuds", price: 79.99, image: "/bud1.jpg" },
    { id: 2, name: "Watch", price: 599.99, image: "/watch4.jpg" },
    { id: 3, name: "Lamp", price: 999.99, image: "/acc1.jpg" },
  ]);
  const [userData,setUserData] = useState({})
  const [allOrder, setAllOrder] = useState([]);
  const { favs, handleAddFav, order, setOrder,user, userId,brandName,brandImage,commonMetaTags,  } = useShop();
  const router = useRouter();
  useEffect(() => {
    setFavoriteItems(favs);
  }, [favs]);
 
  
  useEffect(()=>{
    if(user) setUserData(user)
     // console.log('userData',user);
      
  },[user])

  useEffect(() => {
    setAllOrder(order);
  }, [order]);

  const removeFavoriteItem = async (id) => {
    await handleAddFav(id);
    setFavoriteItems((items) =>
      items.filter((item) => item.productId._id !== id)
    );
  };

  const handleEditOrder = (order) => {
    console.log("Editing order:", order);
  };
  

  return (
    <div className=" text-gray-900 bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
       <Head>
    <title>{`Your Account | ${brandName}`}</title>
    <meta name="description" content={`Manage your ${brandName} account, orders, addresses and preferences for shopping in Indore, Ujjain, Bhopal, Dewas, Dhar.`} />
    <meta name="keywords" content={`${brandName} account, order history, manage address, profile settings, Indore shopping account, Ujjain, Bhopal, Dewas, Dhar`} />
    
    <link rel="canonical" href="https://e-commerce-nu-nine.vercel.app/profile" />
    
    {/* Common meta tags */}
    {Object.entries(commonMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
    ))}
</Head>
<div className="container mx-auto my-4 w-full px-6 md:px-12">
  <motion.h1
    className="text-3xl text-center poppin md:text-4xl font-extrabold mt-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    Your Personalized Shopping Hub
  </motion.h1>

  <motion.p
    className="max-w-5xl  text-center mx-auto py-3 text-lg text-gray-600 mt-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    Manage your account, track your orders, and explore personalized recommendations tailored just for you. Enjoy a seamless shopping experience with quick access to your saved preferences, payment options, and order history.
  </motion.p>
</div>

      {userId ? 
      <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Image
      height={200}
      width={200}
            src="/user1.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{userData.fullname}</h1>
            { userData.email !== 'aamin@gmail.com' ?
              
              <p className="text-gray-600">{userData.email}</p> :<Link href='/adminpanel' ><p className="text-yellow-600">{userData.email}</p></Link>  }
          </div>
        </div>
        <div className="flex space-x-4 justify-evenly ">
  <TabButton
    icon={Package}
    label={'Purchase History'}
    isActive={activeTab === "purchases"}
    onClick={() => setActiveTab("purchases")}
  />
  <TabButton
    icon={Heart}
    label={'Favorites'}
    isActive={activeTab === "favorites"}
    onClick={() => setActiveTab("favorites")}
  />
  <TabButton
    icon={Settings}
    label={'Settings'}
    isActive={activeTab === "settings"}
    onClick={() => setActiveTab("settings")}
  />
</div>

      </div>

      {activeTab === "purchases" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
          {allOrder.map((order) => (
            <PurchaseHistoryItem key={order._id} order={order}  onEdit={handleEditOrder}/>
          ))}
        </motion.div>
      )}

      {activeTab === "favorites" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Favorite Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteItems.map((item) => (
              <FavoriteItem
                key={item._id}
                item={item}
                onRemove={removeFavoriteItem}
              />
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "settings" && (
        <Setting/>
      )}
    </div>
      : <motion.div
      className="flex flex-col items-center mx-auto justify-center py-16 text-center bg-white shadow-xl rounded-xl p-6 w-full max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="rounded-full bg-blue-100 p-6 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <LogIn className="h-10 w-10 text-blue-600" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        🚀 Your Journey Starts Here!
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        “Opportunities don’t happen, you create them.”  
        **Join now and unlock exclusive benefits!**
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/auth"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Account & Unlock Features 🚀
        </Link>
      </motion.div>
    </motion.div>}
    </div>
  );
};
/*  
        
        <div className="w-full h-[60vh] flex items-center justify-center bg-gradient-to-r  from-gray-800 to-slate-900 rounded-2xl">
         <div className="bg-gradient-to-r  from-blue-500 to-indigo-600 text-white p-10 rounded-xl shadow-2xl text-center w-full mx-auto max-w-lg">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Your Journey Starts Here!
          </h2>
          <p className="text-lg mb-6">
            “Opportunities don’t happen, you create them.”  
            **Join now and unlock exclusive benefits!**
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-500 transition-all duration-300"
          >
            Create Account & Unlock Features 🚀
          </button>
        </div></div>*/
const Setting = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    town: "",
    pincode: "",
    city: "",
  });

  const {path, userId,user,setUser,brandName,brandImage,commonMetaTags,setUserId, setFavs
    ,setCart,token} = useShop()
  // Fetch existing user data
  useEffect(() => {
   
    if (userId)  setFormData({
      fullname: user.fullname || "",
      mobile: user.mobile || "",
      town: user.town || "",
      pincode: user.pincode || "",
      city: user.city || "",
    }); ;
  }, [userId,user]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${path}user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto"
    >
     
      <h2 className="text-2xl font-bold mb-4">Edit Profile Details</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>


        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Town */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Town</label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </motion.button>
        
      </form>
      {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>{localStorage.setItem("JwtToken",''),
            setUser({})
            setUserId('')
            setFavs([])
            setCart([])
            setFormData({
              fullname:  "",
              mobile: "",
              town:"",
              pincode:  "",
              city:  "",
            });
        }}
          className="py-2 px-4 flex cursor-pointer items-center gap-3 border mt-3 border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
         <LogOut/> Logout
        </motion.button>
    </motion.div>
  );
};




export default ProfileDashboard;
