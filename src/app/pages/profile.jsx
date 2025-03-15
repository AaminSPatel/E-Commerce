"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings } from "lucide-react";
import { useShop } from "../shopContext";
import { format } from "date-fns";

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
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
              className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md"
            >
              <img
                src={item.productId.product_image}
                alt={item.productId.product_name}
                className="w-16 h-16 object-cover rounded"
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
    <img
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
  const { favs, handleAddFav, order, setOrder,user } = useShop();

  useEffect(() => {
    setFavoriteItems(favs);
  }, [favs]);
 
  
  useEffect(()=>{
    if(user) setUserData(user)
      console.log('userData',user);
      
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="/user1.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{userData.fullname}</h1>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <TabButton
              icon={Package}
              label="Purchase History"
              isActive={activeTab === "purchases"}
              onClick={() => setActiveTab("purchases")}
            />
            <TabButton
              icon={Heart}
              label="Favorites"
              isActive={activeTab === "favorites"}
              onClick={() => setActiveTab("favorites")}
            />
            <TabButton
              icon={Settings}
              label="Settings"
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
    </div>
  );
};


const Setting = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Edit Profile Details</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue="John Doe"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue="john.doe@example.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </motion.button>
            </form>
          </motion.div>
        );
      case "orders":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Order Settings</h2>
            <div>
              <p className="text-sm text-gray-700 mb-4">
                You can delete or manage your orders here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Order
              </motion.button>
            </div>
          </motion.div>
        );
      case "theme":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Choose a theme for your account.
              </p>
              <div className="flex gap-4">
                <button className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">
                  Light Theme
                </button>
                <button className="py-2 px-4 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-900">
                  Dark Theme
                </button>
              </div>
            </div>
          </motion.div>
        );
      case "security":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Password & Security</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </motion.button>
            </form>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "profile"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Edit Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("orders")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "orders"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Order Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("theme")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "theme"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Theme Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("security")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "security"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Password & Security
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="w-full md:w-3/4">{renderSection()}</div>
    </div>
  );
};



export default ProfileDashboard;
