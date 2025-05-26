// // /* Components/RemainingItems.jsx */
// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import itemsData from "../items.json";
// // import "../App.css";
// // import axios from "axios";

// // export const RemainingItems = () => {
// //   const [items, setItems] = useState({});
// //   const [filter, setFilter] = useState("ALL");

// //   useEffect(() => {
// //     setItems(itemsData);
// //     // axios
// //     //   .get(`${baseURL}products`)
// //     //   .then((res) => setItems(res.data))
// //     //   .catch((err) => console.log(err));
// //   }, []);

// //   const types = ["ALL", ...Object.keys(items)];
// //   const displayedTypes = filter === "ALL" ? Object.keys(items) : [filter];

// //   return (
// //     <div className="all-items">
// //       <h2 className="items-title">Items</h2>

// //       {/* Radio-button-style filter buttons */}
// //       <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
// //         {types.map((type) => (
// //           <label
// //             key={type}
// //             className={`btn ${
// //               filter === type ? "btn-dark" : "btn-outline-dark"
// //             } text-center`}
// //             style={{ whiteSpace: "normal" }}
// //           >
// //             <input
// //               type="radio"
// //               name="itemType"
// //               value={type}
// //               checked={filter === type}
// //               onChange={() => setFilter(type)}
// //               className="radio-input d-none"
// //             />
// //             {type}
// //           </label>
// //         ))}
// //       </div>

// //       <div className="card-container">
// //         {displayedTypes.map((type) =>
// //           items[type]?.map((item, idx) => (
// //             <div className="card" key={`${type}-${idx}`}>
// //               <div className="card-image">
// //                 <img
// //                   src={item.img}
// //                   alt={item.name}
// //                   className="card-image-image"
// //                 />
// //               </div>
// //               <div className="card-body">
// //                 <h3 className="card-name fs-5">
// //                   {item.name}{" "}
// //                   {item.discount > 0 && (
// //                     <span className="badge bg-success fs-6">
// //                       {item.discount}% OFF
// //                     </span>
// //                   )}
// //                 </h3>

// //                 <p className="card-rate mb-3 fs-4 text-danger">
// //                   <del className="fs-5">Rs. {item.mrp}</del> Rs.{" "}
// //                   {Math.round(item.mrp - (item.mrp * item.discount) / 100)}/-
// //                 </p>
// //                 <Link
// //                   to={`/items/${encodeURIComponent(type)}/${encodeURIComponent(
// //                     item.name
// //                   )}`}
// //                   className="btn btn-dark fs-4 mt-auto w-100"
// //                 >
// //                   View Details
// //                 </Link>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // src/Components/RemainingItems.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useItems } from "../contexts/ItemsContext";

// import categories from "../category.json"; // e.g. ["ALL", "Refrigerator", ...]
// import "../App.css";
// // import axios from "axios";

// export const RemainingItems = () => {
//   const { items, loading } = useItems();

//   const [filter, setFilter] = useState("ALL");

//   useEffect(() => {
//     // if you later switch to fetching from backend:
//     // axios.get(`${baseURL}products`)
//     //   .then(res => setItems(res.data))
//     //   .catch(err => console.log(err));

//     // for now, load from static JSON
//     setItems(itemsData);
//   }, []);

//   // For "ALL", show everything; otherwise only that category
//   const displayedItems =
//     filter === "ALL" ? items : items.filter((item) => item.category === filter);

//   return (
//     <div className="all-items">
//       <h2 className="items-title">Items</h2>

//       {/* Category‐buttons */}
//       <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
//         {categories.map((cat) => (
//           <label
//             key={cat}
//             className={`btn ${
//               filter === cat ? "btn-dark" : "btn-outline-dark"
//             }`}
//             style={{ whiteSpace: "normal" }}
//           >
//             <input
//               type="radio"
//               name="itemType"
//               value={cat}
//               checked={filter === cat}
//               onChange={() => setFilter(cat)}
//               className="radio-input d-none"
//             />
//             {cat}
//           </label>
//         ))}
//       </div>

//       {/* Cards */}
//       <div className="card-container">
//         {displayedItems.map((item, idx) => (
//           <div className="card" key={`${item.name}-${idx}`}>
//             <div className="card-image">
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="card-image-image"
//               />
//             </div>
//             <div className="card-body d-flex flex-column">
//               <h3 className="card-name fs-5">
//                 {item.name}{" "}
//                 {item.discount > 0 && (
//                   <span className="badge bg-success fs-6">
//                     {item.discount}% OFF
//                   </span>
//                 )}
//               </h3>

//               <p className="card-rate mb-3 fs-4 text-danger">
//                 <del className="fs-5">Rs. {item.mrp}</del> Rs.{" "}
//                 {Math.round(
//                   item.mrp * (1 - item.discount / 100)
//                 ).toLocaleString()}
//                 /-
//               </p>

//               <Link
//                 to={`/items/${encodeURIComponent(
//                   item.category
//                 )}/${encodeURIComponent(item.name)}`}
//                 className="btn btn-dark fs-4 mt-auto w-100"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}

//         {displayedItems.length === 0 && (
//           <p className="fs-3 text-center w-100">No items in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// src/Components/RemainingItems.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useItems } from "../contexts/ItemsContext.jsx";
import categories from "../category.json"; // ["ALL", "Refrigerator", …]
import "../App.css";

export const RemainingItems = ({ onOrder }) => {
  const { items, loading } = useItems();
  const [filter, setFilter] = useState("ALL");

  if (loading) {
    return <p className="text-center mt-5">Loading items…</p>;
  }

  // Show all or filter by category
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
          displayedItems.map((item, idx) => (
            <div className="card" key={`${item.name}-${idx}`}>
              <div className="card-image">
                <img
                  src={item.img}
                  alt={item.name}
                  className="card-image-image"
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-name fs-5">
                  {item.name}{" "}
                  {item.discount > 0 && (
                    <span className="badge bg-success fs-6">
                      {item.discount}% OFF
                    </span>
                  )}
                </h3>

                <p className="card-rate mb-3 fs-4 text-danger">
                  <del className="fs-5">Rs. {item.mrp}</del> Rs.{" "}
                  {Math.round(
                    item.mrp * (1 - item.discount / 100)
                  ).toLocaleString()}
                  /-
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
          ))
        ) : (
          <p className="fs-1 text-center w-100">No items in this category.</p>
        )}
      </div>
    </div>
  );
};
