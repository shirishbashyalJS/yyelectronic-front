// src/Components/Admin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Success } from "./Success";

export default function Admin({ baseURL, success, setSuccess }) {
  const [orders, setOrders] = useState([]);
  // const [items, setItems] = useState([]);
  // const [changeRateItem, setChangeRateItem] = useState(null);
  // const [updatedRate, setUpdatedRate] = useState("");
  const navigate = useNavigate();

  // on mount: auth + fetch orders + fetch products
  useEffect(() => {
    const password = prompt("Enter Admin Password");
    if (!password) return navigate("/");

    // fetch orders
    axios
      .get(`${baseURL}admin`, { headers: { password } })
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => {
        alert("Unauthorized or server error");
        navigate("/");
      });

    // fetch products
  }, [baseURL, navigate]);

  // mark order complete...
  const handleComplete = (orderDoc) => {
    const confirmAmt = parseInt(prompt("Enter the amount of order"), 10);
    const actualAmt = Math.round(
      orderDoc.orderItems.reduce((sum, { total }) => sum + total, 0)
    );
    if (confirmAmt === actualAmt) {
      axios
        .delete(`${baseURL}order/delete/${orderDoc._id}`)
        .then(() => {
          setSuccess(true);
          setOrders((prev) => prev.filter((o) => o._id !== orderDoc._1d));
        })
        .catch((e) => alert("Error completing order"));
    } else {
      alert("Wrong Order Amount");
    }
  };

  // this now actually PUTs the change to the backend
  // const handleRateChange = () => {
  //   if (!changeRateItem || updatedRate === "") return;

  //   axios
  //     .put(`${baseURL}products/${changeRateItem._id}`, {
  //       rate: Number(updatedRate),
  //     })
  //     .then((res) => {
  //       // update the local items array
  //       setItems((prev) =>
  //         prev.map((itm) => (itm._id === changeRateItem._id ? res.data : itm))
  //       );
  //       // reset the UI
  //       setChangeRateItem(null);
  //       setUpdatedRate("");
  //       setSuccess(true);
  //     })
  //     .catch((err) => {
  //       console.error("Error saving new rate:", err);
  //       alert("Could not update rate");
  //     });
  // };

  return (
    <div className="admin mt-5 container-fluid">
      {success && <Success success={success} setSuccess={setSuccess} />}
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      {/* — ORDERS SECTION — */}
      <h1 className="text-center">Orders</h1>
      <div className="orders">
        {orders.map((orderDoc, idx) => (
          <div
            key={idx}
            className="order mb-5 text-center pt-5 pb-5"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div className="userdetail fs-1">
              <h1>User Detail</h1>
              <p>Contact: {orderDoc.user.phone}</p>
              <p>Manual Location: {orderDoc.user.manualLocation}</p>
              <p>Latitude: {orderDoc.user.latitude}</p>
              <p>Longitude: {orderDoc.user.longitude}</p>
              <button
                className="fs-2 btn btn-light"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${orderDoc.user.latitude},${orderDoc.user.longitude}`
                  )
                }
              >
                Open Location
              </button>
            </div>
            <div className="orderItems mt-5 fs-1">
              <h1>Order Items</h1>
              {orderDoc.orderItems.map((o, i) => (
                <div className="items fs-1" key={i}>
                  <p>Item: {o.name}</p>
                  <p>Rate: {o.rate}</p>
                  <p>DP: {o.dp}</p>
                  <p>
                    Quantity: {o.quantity} {o.unit}
                  </p>
                  <p>Total Amount: {o.total}</p>
                  <p>Profit: {Math.round((o.rate - o.dp) * o.quantity)}</p>
                  <hr />
                </div>
              ))}
              <div className="total-amt fs-1">
                TOTAL: Rs{" "}
                {orderDoc.orderItems.reduce((sum, { total }) => sum + total, 0)}
                /-
              </div>
            </div>
            <button
              className="btn btn-dark btn-lg"
              onClick={() => handleComplete(orderDoc)}
            >
              Completed
            </button>
          </div>
        ))}
      </div>

      {/* — PRODUCTS / RATE SECTION — */}
      {/* <div className="items-rate container mt-5">
        <h1 className="text-center">Manage Product Rates</h1>
        {items.map((itm) => (
          <div className="indi fs-1 mt-3" key={itm._id}>
            <hr />
            <p className="name fs-2">{itm.name}</p>
            <div className="curr-rate">Current Rate: Rs {itm.rate}</div>
            <div className="change-rate mt-2">
              <button
                className="btn btn-danger btn-lg"
                onClick={() => {
                  setChangeRateItem(itm);
                  setUpdatedRate(itm.rate);
                }}
              >
                Change Rate
              </button>
              {changeRateItem?._id === itm._id && (
                <div className="change fs-2 mt-2">
                  <label>
                    New Rate:{" "}
                    <input
                      type="number"
                      value={updatedRate}
                      onChange={(e) => setUpdatedRate(e.target.value)}
                    />
                  </label>{" "}
                  <button
                    className="btn btn-success btn-lg ms-2"
                    onClick={handleRateChange}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
