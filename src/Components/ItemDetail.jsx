// src/Components/ItemDetail.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";
import { useItems } from "../contexts/ItemsContext.jsx";

// Determine profit margin based on DP
function getDetailProfitMargin(dp) {
  if (dp < 3000) return 0.1;
  if (dp < 10000) return 0.07;
  if (dp < 20000) return 0.06;
  return 0.05;
}

// Calculate selling price: DP + profit
function calculateDetailPrice(dp) {
  const margin = getDetailProfitMargin(dp);
  return parseFloat((dp * (1 + margin)).toFixed(2));
}

export const ItemDetail = ({ onOrder, baseURL }) => {
  const { items, loading } = useItems(); // hook #1
  const { category, index } = useParams();
  const [quantity, setQuantity] = useState(1);
  const decodedCategory = decodeURIComponent(category);
  const decodedName = decodeURIComponent(index);
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-grow"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const item = items.find(
    (el) => el.category === decodedCategory && el.name === decodedName
  );

  if (!item) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">Item not found</h2>
        <Link to="/" className="btn btn-outline-secondary mt-3 fs-4">
          ← Back to Items
        </Link>
      </div>
    );
  }

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const sellingPrice = calculateDetailPrice(item.dp);
  const total = quantity * sellingPrice;

  return (
    <div className="container my-5">
      <Link to="/" className="btn btn-dark-outline mb-4 fs-4">
        ← Back to Items
      </Link>

      <div className="card shadow-lg rounded overflow-hidden">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={item.img}
              className="img-fluid h-100 w-100 object-fit-cover"
              alt={item.name}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body p-4 d-flex flex-column">
              <h1 className="card-title display-6 mb-3">{item.name}</h1>

              <div className="mb-4">
                <span className="badge bg-warning text-dark fs-4 p-3">
                  Rs {sellingPrice.toLocaleString()} /-
                </span>
              </div>

              <h3 className="mb-2">Key Features:</h3>
              <div className="mb-4">
                {item.features.map((feat, i) => (
                  <span
                    key={i}
                    className="badge bg-info text-dark me-2 mb-2 text-wrap fs-3"
                    style={{ whiteSpace: "normal", display: "inline-block" }}
                  >
                    {feat}
                  </span>
                ))}
              </div>

              <div className="row mb-4">
                <div className="col-sm-6 mb-3">
                  <h3>✔ Warranty</h3>
                  <p className="mb-0 fs-3">{item.warranty}</p>
                </div>
                <div className="col-sm-6 mb-3">
                  <h3>✖ Non-Warranty</h3>
                  <p className="mb-0 fs-3">{item["non-warranty"]}</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <button
                  className="btn btn-outline-secondary fs-4 me-3"
                  onClick={decrement}
                >
                  –
                </button>
                <span className="fs-3">{quantity}</span>
                <button
                  className="btn btn-outline-secondary fs-4 ms-3"
                  onClick={increment}
                >
                  +
                </button>
              </div>

              <h4 className="fs-3 mb-3">
                Total: Rs {total.toLocaleString()} /-
              </h4>

              <button
                className="btn btn-primary btn-lg mt-auto"
                onClick={() =>
                  onOrder({
                    img: item.img,
                    name: item.name,
                    category: item.category,
                    quantity,
                    mrp: item.mrp,
                    rate: sellingPrice,
                    total: Math.round(total),
                    dp: item.dp,
                  })
                }
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
