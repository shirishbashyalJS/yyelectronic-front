// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "./Components/Header";
import { Notice } from "./Components/Notice";
import { RemainingItems } from "./Components/RemainingItems";
import InfoModal from "./Components/Modal";
import ConfirmationModal from "./Components/ConfirmationModal";
import { Footer } from "./Components/Footer";
import { Success } from "./Components/Success";
import { OrderedItems } from "./Components/OrderedItems";
import { ItemDetail } from "./Components/ItemDetail";
import Admin from "./Components/Admin";
import { ItemsProvider } from "./contexts/ItemsContext";

function App() {
  const [formData, setFormData] = useState({
    phone: "",
    latitude: null,
    longitude: null,
    manualLocation: "",
  });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ordered, setOrdered] = useState([]);
  const baseURL = "http://localhost:8000/";
  // const baseURL = "https://yyelectronic-back.onrender.com/";

  const orderGetRequest = async (contact) => {
    try {
      const res = await axios.get(`${baseURL}order`, { headers: contact });
      const docs = res.data;
      if (Array.isArray(docs) && docs.length > 0 && docs[0].orderItems) {
        setOrdered(docs[0].orderItems);
      } else {
        setOrdered([]);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        console.log("No orders found for this user.");
        setOrdered([]);
      } else {
        console.error("Order fetch failed:", err);
      }
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("contact");
    if (saved) {
      try {
        const contact = JSON.parse(saved);
        if (contact.phone && /^\d{10}$/.test(contact.phone)) {
          setFormData(contact);
          orderGetRequest(contact);
        }
      } catch {}
    }
  }, []);

  const requestContact = (order) => {
    setPendingOrder(order);
    if (formData.phone.length === 10) {
      setPendingOrder({ ...order, ...formData });
      setShowConfirmModal(true);
    } else {
      setShowInfoModal(true);
    }
  };

  const handleContactSubmit = (contact) => {
    // require either manualLocation or both coords
    const hasManual = contact.manualLocation.trim().length > 0;
    const hasGeo = contact.latitude != null && contact.longitude != null;
    if (!hasManual && !hasGeo) {
      alert("Location is required. Please allow location or type address.");
      return;
    }

    setFormData(contact);
    setPendingOrder({ ...pendingOrder, ...contact });
    setShowInfoModal(false);
    setShowConfirmModal(true);
    localStorage.setItem("contact", JSON.stringify(contact));
    orderGetRequest(contact);
  };

  const handleConfirm = () => {
    const {
      img,
      name,
      category,
      quantity,
      mrp,
      rate,
      dp,
      total,
      latitude,
      longitude,
      manualLocation,
      phone,
    } = pendingOrder || {};

    const hasManual = manualLocation.trim().length > 0;
    const hasGeo = latitude != null && longitude != null;
    if (!hasManual && !hasGeo) {
      alert("Location is required before confirming.");
      return;
    }

    const orderItem = { img, name, category, quantity, mrp, rate, dp, total };
    const userDetails = { latitude, longitude, manualLocation, phone };

    axios
      .post(`${baseURL}order`, { orderItem, userDetails })
      .then(() => {
        setOrdered((prev) => [...prev, orderItem]);
        setSuccess(true);
        setPendingOrder(null);
      })
      .catch((err) => console.error("Order POST failed:", err));

    setShowConfirmModal(false);
  };

  return (
    <ItemsProvider>
      <Router>
        <Header ordered={ordered} />

        <InfoModal
          show={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleContactSubmit}
        />
        <ConfirmationModal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          order={pendingOrder}
          onConfirm={handleConfirm}
        />
        {success && <Success success={success} setSuccess={setSuccess} />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Notice
                  formData={formData}
                  setFormData={setFormData}
                  setOrdered={setOrdered}
                />
                <RemainingItems onOrder={requestContact} baseURL={baseURL} />
              </>
            }
          />
          <Route
            path="/cart"
            element={<OrderedItems ordered={ordered} setOrdered={setOrdered} />}
          />
          <Route
            path="/items/:category/:index"
            element={<ItemDetail onOrder={requestContact} baseURL={baseURL} />}
          />
          <Route
            path="/admin"
            element={
              <Admin
                baseURL={baseURL}
                success={success}
                setSuccess={setSuccess}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </Router>
    </ItemsProvider>
  );
}

export default App;
