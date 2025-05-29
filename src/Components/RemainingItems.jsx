import React, { useState } from "react";
import { Link } from "react-router-dom";
import categories from "../category.json"; // ["ALL", "Refrigerator", …]
import "../App.css";
import { useItems } from "../contexts/ItemsContext.jsx";

// Determine profit margin based on DP
function getProfitMargin(dp) {
  if (dp < 3000) return 0.1; // 10%
  if (dp < 10000) return 0.07; // 7%
  if (dp < 20000) return 0.06; // 6%
  return 0.05; // 5%
}

// Calculate selling price: DP + profit
function calculatePrice(dp) {
  const margin = getProfitMargin(dp);
  return parseFloat((dp * (1 + margin)).toFixed(2));
}

export const RemainingItems = ({ onOrder }) => {
  const { items, loading } = useItems();
  const [filter, setFilter] = useState("ALL");
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
  // Filter items by category or show all
  const displayedItems =
    filter === "ALL" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="all-items">
      <h2 className="items-title">Items</h2>

      {/* Category buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <label
            key={cat}
            className={`btn ${
              filter === cat ? "btn-dark" : "btn-outline-dark"
            }`}
            style={{ whiteSpace: "normal" }}
          >
            <input
              type="radio"
              name="itemType"
              value={cat}
              checked={filter === cat}
              onChange={() => setFilter(cat)}
              className="radio-input d-none"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Cards grid */}
      <div className="card-container">
        {displayedItems.length > 0 ? (
          displayedItems.map((item, idx) => {
            const sellingPrice = calculatePrice(item.dp);

            return (
              <div className="card" key={`${item.name}-${idx}`}>
                <div className="card-image">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="card-image-image img-fluid w-100"
                    style={{ objectFit: "contain", maxHeight: "200px" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h3 className="card-name fs-5">
                    {item.name}
                    <span className="badge bg-success ms-2">
                      {Math.round(((item.mrp - sellingPrice) / item.mrp) * 100)}
                      % OFF
                    </span>
                  </h3>

                  <p className="card-rate mb-3 fs-4 text-danger">
                    <del className="fs-5">Rs. {item.mrp.toLocaleString()}</del>{" "}
                    Rs. {sellingPrice.toLocaleString()}/-
                  </p>

                  <Link
                    to={`/items/${encodeURIComponent(
                      item.category
                    )}/${encodeURIComponent(item.name)}`}
                    className="btn btn-dark fs-4 mt-auto w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="fs-1 text-center w-100">No items in this category.</p>
        )}
      </div>
    </div>
  );
};
