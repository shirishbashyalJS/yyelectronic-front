// src/contexts/ItemsContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ItemsContext = createContext([]);

// Provider component
export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const baseURL = "https://yyelectronic-back.onrender.com/";
  const baseURL = "http://localhost:8000/";

  useEffect(() => {
    axios
      .get(`${baseURL}products`)
      .then((res) => {
        setItems(res.data); // assume backend returns an array
      })
      .catch((err) => console.error("Failed loading items:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ItemsContext.Provider value={{ items, loading }}>
      {children}
    </ItemsContext.Provider>
  );
}

// Custom hook: ✅ THIS is what you import elsewhere
export function useItems() {
  return useContext(ItemsContext);
}
