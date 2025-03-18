import { useState, useEffect } from "react";
import { useShop } from "../shopContext";

const fetchNotifications = async (path) => {
  try {
    const response = await fetch(`${path}notification`, {
      method: "GET",
      mode: "cors", // ✅ Important for CORS
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

const useNotifications = (interval = 15000) => {
  const [notifications, setNotifications] = useState([]);
  const { path } = useShop();

  useEffect(() => {
    if (!path) return; // ✅ Prevent running if path is undefined

    const getNotifications = async () => {
      const newNotifications = await fetchNotifications(path);
      setNotifications(newNotifications);
    };

    getNotifications(); // Fetch immediately
    const intervalId = setInterval(getNotifications, interval); // Fetch at intervals

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [interval, path]); // ✅ Added `path` to dependencies

  return notifications;
};

export default useNotifications;
