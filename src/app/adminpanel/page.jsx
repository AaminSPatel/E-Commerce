"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiShoppingCart,
  FiDollarSign,
  FiMenu,
  FiAward,
  FiX,
  FiLogOut,
  FiSettings,
  FiMail,
  FiBell,
  FiMessageSquare,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useShop } from "../shopContext";
import UpdateProductModal from "../components/modelproduct";
import useNotifications from "../components/notificationfetcher";
import Image from "next/image";
import { FaFilter, FaRotate, FaRotateLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { items, users, brandName,brandImage,commonMetaTags,orders, contact, user } = useShop();


  const [filteredOrders, setFilteredOrders] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

useEffect(()=>{
  orders.length && setFilteredOrders(orders)
  items.length &&  setFilteredItems(items)
  users.length && setFilteredUsers(users)
},[items, users, orders])
const handleOrderFilter = (value) => {
 if(value=='*'){
  setFilteredOrders(orders)
 }
 else{ let filtered = orders.filter((order) => 
    order.status === value || 
    order._id === value || 
    (order.userId && order.userId.fullname && order.userId.fullname.toLowerCase().includes(value.toLowerCase()))
  );
  setFilteredOrders(filtered)
}

  console.log( value);
};


 const handleProductFilter = (value) =>{
  if(value=='*'){
    setFilteredItems(items)
  }
else{  let filtered = items.filter((item) => 
    (item.product_name.toLowerCase().includes(value.toLowerCase())) || 
    item._id === value || (item.product_category.toLowerCase().includes(value.toLowerCase())) || (item.product_brand.toLowerCase().includes(value.toLowerCase()))
  );
  setFilteredItems(filtered)
}

 // console.log(filtered, value);
 }

 const handleUserFilter = (value) =>{}



  let pendingOrders = orders.filter((item) => item.status === "Pending");
  //console.log('pending orders',pendingOrders);

  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <FiUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: items.length,
      icon: <FiShoppingBag />,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FiShoppingCart />,
      color: "bg-purple-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      icon: <FiShoppingCart />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Revenue",
      value: "$42,582",
      icon: <FiDollarSign />,
      color: "bg-red-500",
    },
    {
      title: "Avg. Order Value",
      value: "$86.24",
      icon: <FiDollarSign />,
      color: "bg-indigo-500",
    },
  ];

  const barData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const pieData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Books", value: 200 },
    { name: "Home", value: 100 },
  ];

  /*  const notifications = [
    {
      id: 1,
      type: "warning",
      message: "Inventory low for Wireless Headphones",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "achievement",
      message: "Sales target reached for Q1 2023!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      message: "3 orders pending for more than 48 hours",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "achievement",
      message: "New user milestone: 2,500 users registered",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "warning",
      message: "Payment gateway experiencing delays",
      time: "Yesterday",
      read: true,
    },
  ]
 */
  const notification = useNotifications(10000); // Fetch every 10 sec
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  // setNotificationData(useNotifications(10000))
  useEffect(() => {
    setNotificationData(notification);
  }, [notification]);
  const markAsRead = (id) => {
    setNotificationData(
      notificationData.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "Yesterday";
    }
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
  };

  const markAllAsRead = () => {
    setNotificationData(
      notificationData.map((notification) => ({ ...notification, read: true }))
    );
  };

  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState([]);

  const handleUpdate = (newProduct) => {
    setUpdatedProduct(newProduct); // Update state
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openPostModel, setOpenPostModel] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    setIsAuthenticated(true);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // In a real app, you would create a new user here
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  const router = useRouter()

  useEffect(() => {
    //  console.log(user);

    if (user.email === "aamin@gmail.com") {
      setIsAuthenticated(true);
    }
    else{
      router.push('/auth')
    }
  },[user]);
  

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignUp ? "Create an Account" : "Login to Admin Panel"}
          </h2>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <button
              className="text-blue-500 hover:text-blue-700 text-sm"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="bg-gray-900 text-white w-64 flex-shrink-0 z-10"
          >
            <div className="p-4 flex items-center justify-between">
              <h1 className="text-xl font-bold">E-Commerce Admin</h1>
              {windowWidth < 768 && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white"
                >
                  <FiX size={24} />
                </button>
              )}
            </div>
            <nav className="mt-6">
              <div
                className={`p-4 flex items-center cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-gray-800"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <FiHome className="mr-3" />
                <span>Dashboard</span>
              </div>
              <div
                className={`p-4 flex items-center cursor-pointer ${
                  activeTab === "products" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("products")}
              >
                <FiShoppingBag className="mr-3" />
                <span>Products</span>
              </div>
              <div
                className={`p-4 flex items-center cursor-pointer ${
                  activeTab === "orders" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <FiShoppingCart className="mr-3" />
                <span>Orders</span>
              </div>

              <div
                className={`p-4 flex items-center cursor-pointer ${
                  activeTab === "users" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <FiUsers className="mr-3" />
                <span>Users</span>
              </div>
              <div
                className={`p-4 flex items-center cursor-pointer ${
                  activeTab === "settings" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <FiSettings className="mr-3" />
                <span>Settings</span>
              </div>
              <div
                className="p-4 flex items-center cursor-pointer hover:bg-gray-800 mt-auto"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-3" />
                <span>Logout</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {!isSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(true)} className="mr-4">
                  <FiMenu size={24} />
                </button>
              )}
              <h1 className="text-xl font-semibold">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2"
                onClick={() => setActiveTab("messages")}
              >
                <FiMail size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {contact.length}
                </span>
              </button>
              <div className="relative">
                <button
                  className="relative p-2"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FiBell size={20} />
                  {notificationData.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {notificationData.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 overflow-hidden">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notificationData.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notificationData.slice(0, 4).map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                              notification.read ? "opacity-60" : ""
                            }`}
                            onClick={() => markAsRead(notification._id)}
                          >
                            <div className="flex items-start">
                              <div
                                className={`mt-1 mr-3 p-1 rounded-full ${
                                  notification.type === "warning"
                                    ? "bg-yellow-100 text-yellow-500"
                                    : "bg-green-100 text-green-500"
                                }`}
                              >
                                {notification.type === "warning" ? (
                                  <FiBell size={16} />
                                ) : (
                                  <FiAward size={16} />
                                )}
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`text-sm ${
                                    !notification.read ? "font-semibold" : ""
                                  }`}
                                >
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {getTimeAgo(notification.time)}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-2 border-t text-center">
                      <button
                        onClick={() => {
                          setActiveTab("notifications");
                          setShowNotifications(false);
                        }}
                        className="text-sm text-blue-500 hover:text-blue-700 w-full py-1"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="fle items-center ">
                <Image
                  src="/user1.jpg"
                  height={200}
                  width={200}
                  alt="Admin"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="hidden d:inline-block">Aamin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && (
                <div>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md p-6 flex items-center"
                      >
                        <div
                          className={`${stat.color} p-3 rounded-full mr-4 text-white`}
                        >
                          {stat.icon}
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">
                            {stat.title}
                          </h3>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold mb-4">
                        Monthly Sales
                      </h2>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#4F46E5" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold mb-4">
                        Sales by Category
                      </h2>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {pieData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Recent Orders</h2>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => setActiveTab("orders")}
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3  overflow-hidden text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.userId.fullname}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.order_date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Processing"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.total_amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "products" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between  items-center mb-4">
                    <h2 className="text-lg font-semibold">Products</h2>
                    <input
      type="text"
      onChange={(e)=>handleProductFilter(e.target.value)}
      placeholder="Search products..."
      className="border rounded px-3 py-1 max-w-48"
    />
                    <button onClick={()=>{handleProductFilter('*')}} className=" text-black shadow font-bold py-1.5 px-2 rounded">
                      <FaRotateLeft/>
                    </button><button onClick={()=>{setOpenPostModel(true)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded">
                      Add Product
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Brand
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Availability
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((product, i) => (
                          <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {product._id}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_category}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_price}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_brand}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.product_availability}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button  onClick={() => setSelectedProduct(product)} className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer">
                                Edit
                              </button>
                              <button className="text-red-500 hover:text-red-700 cursor-pointer">
                                Delete
                              </button>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {selectedProduct && (
                      <UpdateProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onUpdate={handleUpdate}
                        isUpdate={true}
                      />
                    )}
                  </div>
                  {openPostModel && (
                      <UpdateProductModal
                        product={[]}
                        onClose={() => setOpenPostModel(false)}
                        onUpdate={handleUpdate}
                        isUpdate={false}
                      />
                    )}
                  
                </div>
              )}
              {activeTab === "messages" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Customer Messages</h2>
                    <div className="flex space-x-2">
                      <select className="border rounded px-3 py-1">
                        <option>All Messages</option>
                        <option>Unread</option>
                        <option>Read</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Search messages..."
                        className="border rounded px-3 py-1"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {contact.map((message) => (
                      <motion.div
                        key={message._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          !message.read ? "border-l-4 border-l-blue-500" : ""
                        }`}
                        onClick={() => openMessageModal(message)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                              {message.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{message.name}</h3>
                              <p className="text-sm text-gray-600">
                                {message.email}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {message.createdAt}
                          </div>
                        </div>
                        <h4 className="font-medium mb-1">{message.subject}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "orders" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
<div className="flex flex-row sm:justify-between items-center gap-2 sm:gap-2 mb-4">
  {/* Title */}
  <h2 className="text-lg font-semibold text-center sm:text-left">Orders</h2>

  {/* Filters & Search */}
  <div className="flex flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
    <select className="border rounded px-3 py-2 w-full " onClick={(e)=>{handleOrderFilter(e.target.value)}}>
      <option>All Status </option>
      <option>Pending</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>
    <input
      type="text"
      onChange={(e)=>handleOrderFilter(e.target.value)}
      placeholder="Search orders..."
      className="border rounded px-3 py-1 w-full"
    />
    
    <button onClick={()=>{handleOrderFilter('*')}} className=" text-black shadow font-bold py-1.5 px-2 rounded">
                      <FaRotateLeft/>
                    </button>
  </div>
</div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order._id}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.userId.fullname}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.order_date}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.total_amount}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-500 hover:text-blue-700 mr-2">
                                View
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">All Notifications</h2>
                    <div className="flex space-x-2">
                      <select className="border rounded px-3 py-1">
                        <option>All Types</option>
                        <option>Warnings</option>
                        <option>Achievements</option>
                      </select>
                      <button
                        onClick={markAllAsRead}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {notificationData.map((notification) => (
                      <div
                        key={notification._id}
                        className={`p-4 border rounded-lg ${
                          notification.read ? "bg-white" : "bg-blue-50"
                        } ${
                          notification.type === "warning"
                            ? "border-yellow-200"
                            : "border-green-200"
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`p-2 rounded-full mr-4 ${
                              notification.type === "warning"
                                ? "bg-yellow-100 text-yellow-500"
                                : "bg-green-100 text-green-500"
                            }`}
                          >
                            {notification.type === "warning" ? (
                              <FiBell size={20} />
                            ) : (
                              <FiAward size={20} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3
                                className={`font-medium ${
                                  !notification.read ? "font-semibold" : ""
                                }`}
                              >
                                {notification.message}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {getTimeAgo(notification.time)}
                              </span>
                            </div>
                            <div className="flex justify-between mt-2">
                              <span
                                className={`text-sm px-2 py-1 rounded ${
                                  notification.type === "warning"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {notification.type === "warning"
                                  ? "Warning"
                                  : "Achievement"}
                              </span>
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification._id)}
                                  className="text-sm text-blue-500 hover:text-blue-700"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "users" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Users</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add User
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            City
                          </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.fullname}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.city}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-500 hover:text-blue-700 mr-2">
                                Edit
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4">Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-md font-medium mb-3">
                        Account Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full border rounded-md px-3 py-2"
                            defaultValue="Admin User"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full border rounded-md px-3 py-2"
                            defaultValue="admin@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            className="w-full border rounded-md px-3 py-2"
                            defaultValue="********"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-md font-medium mb-3">
                        Store Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Store Name
                          </label>
                          <input
                            type="text"
                            className="w-full border rounded-md px-3 py-2"
                            defaultValue="My E-Commerce Store"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                          </label>
                          <select className="w-full border rounded-md px-3 py-2">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Timezone
                          </label>
                          <select className="w-full border rounded-md px-3 py-2">
                            <option>UTC-8 (Pacific Time)</option>
                            <option>UTC-5 (Eastern Time)</option>
                            <option>UTC+0 (GMT)</option>
                            <option>UTC+1 (Central European Time)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Save Changes
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Message Modal */}
              {isMessageModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
                  >
                    <div className="p-4 border-b flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">
                          {selectedMessage?.subject}
                        </h3>
                        <p className="text-sm text-gray-600">
                          From: {selectedMessage?.name} (
                          {selectedMessage?.email})
                        </p>
                      </div>
                      <button
                        onClick={() => setIsMessageModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={24} />
                      </button>
                    </div>
                    <div className="p-4 overflow-y-auto flex-grow">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                          {selectedMessage?.name.charAt(0)}
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">{selectedMessage?.message}</p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {selectedMessage?.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                      <div className="flex items-center">
                        <div className="text-gray-500 italic flex-grow">
                          <p>Reply functionality is disabled for this demo.</p>
                        </div>
                        <button
                          onClick={() => setIsMessageModalOpen(false)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
