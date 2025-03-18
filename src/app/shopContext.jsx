"use client";
import React, { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  CookingPot,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Home,
  LayoutGrid,
} from "lucide-react";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
 const path = process.env.NEXT_PUBLIC_API_URL; 
 //const path = 'http://localhost:3005/'; 
   const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [favs, setFavs] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);
  const [token, setToken] = useState("");
  const [mess, setMess] = useState({message:'', type:''});
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contact, setContact] = useState([]);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes, notificationRes] = await Promise.all([
          axios.get(`${path}user/`),
          axios.get(`${path}order/`),
         // axios.get(`${path}notification/`),
        ]);

        setUsers(usersRes.data);
        setOrders(ordersRes.data);
        //setNotification(notificationRes.data)
       // console.log(notificationRes.data,'Notification');
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 // console.log('Path string',path, process.env.NEXT_PUBLIC_API_URL);
  

  const [categories, setCategories] = useState([
    {
      icon: LayoutGrid,
      name: "All",
      productCount: 120,
      color: "bg-teal-400",
      textColor: "text-slate-100",
    },
    {
      icon: Laptop,
      name: "Electronics",
      productCount: 120,
      color: "bg-amber-400",
      textColor: "text-slate-100",
    },
    {
      icon: Smartphone,
      name: "Accessories",
      productCount: 85,
      color: "bg-orange-400",
      textColor: "text-slate-100",
    },
    {
      icon: Watch,
      name: "Wearable",
      productCount: 60,
      color: "bg-pink-400",
      textColor: "text-slate-100",
    },
    {
      icon: CookingPot,
      name: "Kitchen Appliances",
      productCount: 40,
      color: "bg-violet-400",
      textColor: "text-slate-100",
    },
    {
      icon: Home,
      name: "Home Appliances",
      productCount: 150,
      color: "bg-sky-400",
      textColor: "text-slate-100",
    },
  ]);
  const [brands, setBrands] = useState([{name:''}]);

  // Fetch User Details
  const fetchUserDetails = async (token) => {
    try {
      const { data } = await axios.get(`${path}user/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setUserId(data._id);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${path}product`);
      const data = await response.json();
      setItems(data);
//console.log(data);

      // Extract unique categories from products
      const uniqueCategories = [
        ...new Set(data.map((item) => item.product_category)),
      ];

      // Map categories with existing icons/colors or add defaults
      setCategories((prevCategories) => {
        return uniqueCategories.map((category) => {
          const existingCategory = prevCategories.find(
            (cat) => cat.name === category
          );
          return existingCategory
            ? existingCategory // Keep existing styles if found
            : {
                icon: LayoutGrid,
                name: category,
                productCount: 0,
                color: "bg-gray-400",
                textColor: "text-slate-100",
              };
        });
      });

      // Extract unique brands and update state
      setBrands((prevBrands) => {
        const uniqueBrands = [
    
          ...new Set(data.map((item) => item.product_brand)),
        ];
        return uniqueBrands.map((brand) => {
          const existingBrand = prevBrands.find((b) => b.name === brand);
          return existingBrand || { name: brand, productCount: 0 }; // Adjust as needed
        });
      });
      //console.log(brands);
      
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Fetch Orders, Favorites, and Cart
  const fetchUserData = async (userId) => {
    if (!userId) return;
    try {
      const [orderRes, favRes, cartRes, contactRes] = await Promise.all([
        fetch(`${path}order/${userId}`).then((res) => res.json()),
        fetch(`${path}fav/${userId}`).then((res) => res.json()),
        fetch(`${path}cart/${userId}`).then((res) => res.json()),
        fetch(`${path}contact`).then((res) => res.json()),
      ]);
      setOrder(orderRes);
      setFavs(favRes);
      setCart(cartRes);
      setContact(contactRes);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("JwtToken");
    if (token) {
      setToken(token);
      fetchUserDetails(token);
    } else {
      console.log("No token found. Please log in.");
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [brand, setBrand] = useState("All");
 
  //console.log(items);

  /* const categories = [
  { icon: LayoutGrid, name: "All", productCount: 120, color: "bg-teal-400",textColor:'text-slate-100' },
  { icon: Laptop, name: "Electronics", productCount: 120, color: "bg-amber-400",textColor:'text-slate-100' },
  { icon: Smartphone, name: "Accessories", productCount: 85, color: "bg-orange-400",textColor:'text-slate-100' },
  { icon: Watch, name: "Wearable", productCount: 60, color: "bg-pink-400",textColor:'text-slate-100' },
  { icon: CookingPot , name: "Kitchen Appliances", productCount: 40, color: "bg-violet-400",textColor:'text-slate-100' },
  { icon: Home, name: "Home Appliances", productCount: 150, color: "bg-sky-400" ,textColor:'text-slate-100'},
] */

  const filteredItems = items.filter(
    (item) =>
      (selectedCategory === "All" ||
        item.product_category === selectedCategory) &&
      (brand === "All" ||
        item.product_brand.toLowerCase() === brand.toLowerCase()) &&
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post(path + `user/signup`, data);

      //console.log("Response from backend:", response);
      
      const { token, user ,message } = response.data; // Extract token and user ID
      //console.log(message);
      
      if (token && user) {
        setUserId(user._id);
        setToken(token);
        setMess({message:message, type:'success'})
        localStorage.setItem("JwtToken", token);
       // console.log("Token stored in localStorage successfully!",message);
      } else {
        console.error(
          "Token or User ID is missing in the response:",
          response.data
        );
      }
    } catch (err) {
      setMess({message:err.response?.data.message, type:'fail'})
      console.error("Error during signup:", err.response?.data || err.message);
    }
  };

  const handleSignIn = async (data) => {
    try {
      const response = await axios.post(path + `user/signin`, data);
  
      // Extract necessary data from the response
      const { token, user, message } = response.data;
      //console.log(response.message || message);
      //setMess({message:message, type:'success'})
      if (token && user) {
        setUserId(user._id);
        setToken(token);
        setMess({message:message, type:'success'})
        localStorage.setItem("JwtToken", token);
      //  console.log("Token stored in localStorage successfully!", message);
      } else {
        console.error("Token or User ID is missing in the response:", response.data);
      }
    } catch (err) {
      setMess({message:err.response?.data.message, type:'fail'})
      console.error("Error during signin:", err.response?.data || err.message);
    }
  };
  
  const handleCartUpdate = async (item) => {
    // console.log(item);

    try {
      const response = await axios
        .put(path + `cart/${item._id}`, { item, userId })
        .then((data) => {
          if (data.data.length > 0) {
            setCart(data.data);
            console.log(data);
          }
        });
     // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCartRemove = async (cartId) => {
   // console.log(userId);
    let userid = userId;
    try {
      const res = await axios
        .delete(path + `cart/${cartId}/${userId}`)
        .then((res) => {
          setCart(res.data);
          //console.log(data);
        });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCartClick = async (productId) => {
    try {
      // Fetch the cart data
      const response = await fetch(`${path}cart/${userId}`);
      const data = await response.json();

      // Check if the product is already in the cart
      const isInCart = data.some(
        (item) => item.productId._id === productId && item.userId === userId
        
      );

      if (isInCart) {
        console.log("Product is already present in the Cart");

        // Remove the product from the cart
        const deleteResponse = await axios.delete(`${path}cart/delete`, {
          data: { productId , userId}, // Pass the productId in the body
        });

        if (deleteResponse.data && deleteResponse.data.length > 0) {
          setCart(deleteResponse.data); // Update cart state with the remaining items
          console.log("Cart updated:", deleteResponse.data);
        } else {
          setCart([]); // Clear cart state if the response is empty
          console.log("Cart is now empty.");
        }
      } else {
        console.log("Product is not present in the Cart");

        // Add the product to the cart
        const addResponse = await axios.post(`${path}cart/cartAdd/${userId}`, {
          productId,
        });

        if (addResponse.data && addResponse.data.length > 0) {
          setCart(addResponse.data); // Update cart state with the new cart items
          console.log("Cart updated:", addResponse.data);
        }
      }
    } catch (error) {
      console.error("Error in handleCartClick:", error);
    }
  };

  const handleAddFav = async (productId) => {
   // console.log(productId);

    try {
      // Check if the product is already in the favorites
      const checkProduct = favs.some(
        (item) => item.productId._id === productId && item.userId === userId
      );

      if (checkProduct) {
        console.log("Product is already present in the db");

        // Delete the product from favorites
        const response = await axios.delete(`${path}fav/${userId}`, {
          data: { productId }, // Pass the productId in the body
        });

        if (response.data && response.data.length > 0) {
          setFavs(response.data);
          console.log('new fav set when delete',response.data);
          //res.send('ok')
        } else {
          setFavs([]); // Clear favorites if the response is empty
        }
      } else {
        console.log("Product is not present in the db");

        // Add the product to favorites
        const response = await axios.post(`${path}fav/favAdd`, {
          productId,
          userId,
        });

        if (response.data && response.data.length > 0) {
          setFavs(response.data);
          console.log('new fav set when add',response.data);
        }
      }
    } catch (error) {
      console.error("Error in handleAddFav:", error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        items,setItems,
        userId,
        handleAddFav,
        favs,handleSignIn,
        setFavs,
        brand,
        setBrand,
        handleCartUpdate,
        path,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        handleCartClick,
        filteredItems,
        cart,users,orders,
        categories,
        brands,
        setCart,contact,
        user,mess, setMess,
        token,
        setUser,
        handleCartRemove,
        order,
        setOrder,
        handleSignUp,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const useShop = () => useContext(ShopContext);

export { useShop, ShopContextProvider };
