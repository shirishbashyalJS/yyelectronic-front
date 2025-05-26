// export const OrderedItems = ({ ordered, setOrdered }) => {
//   return (
//     <div className="order-items">
//       <p className="items-title mt-5">Ordered Items</p>
//       {ordered.length > 0 ? (
//         ordered.map((order, index) => {
//           return (
//             <div className="order-item" key={index}>
//               <p className="fs-4">
//                 {order.name}(pending) : Rs {order.total}
//               </p>
//             </div>
//           );
//         })
//       ) : (
//         <p className="fs-1">No Order Placed</p>
//       )}
//     </div>
//   );
// };

// import React from "react";

// export const OrderedItems = ({ ordered, setOrdered }) => {
//   return (
//     <div className="container mt-5">
//       <h2 className="text-primary mb-4">🚚 Your Orders</h2>

//       {ordered && ordered.length > 0 ? (
//         <div className="row g-4">
//           {ordered.map((order, index) => (
//             <div className="col-sm-6 col-lg-4" key={index}>
//               <div className="card h-100 shadow-sm border-0">
//                 <img
//                   src={order.img}
//                   className="card-img-top object-fit-cover"
//                   alt={order.name}
//                   style={{ height: "200px" }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title mb-3">{order.name}</h5>

//                   <div className="mb-2 fs-1">
//                     <span className="badge bg-info text-dark me-2">
//                       Qty: {order.quantity}
//                     </span>
//                     <span className="badge bg-secondary me-2">
//                       Rate: Rs {order.rate.toLocaleString()} /-
//                     </span>
//                     {order.discount > 0 && (
//                       <span className="badge bg-success">
//                         {order.discount}% OFF
//                       </span>
//                     )}
//                   </div>

//                   <div className="mt-auto text-end">
//                     <h4 className="text-success">
//                       Rs {order.total.toLocaleString()} /-
//                     </h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-5">
//           <i className="bi bi-cart fs-1 text-muted"></i>
//           <p className="fs-2 text-muted mt-3">No Orders Placed</p>
//         </div>
//       )}
//     </div>
//   );
// };

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const OrderedItems = ({ ordered, setOrdered }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-dark mb-4">🚚 Your Orders</h2>

      {ordered && ordered.length > 0 ? (
        <div className="d-flex flex-wrap gap-3">
          {ordered.map((order, index) => (
            <div
              className="d-flex align-items-center shadow-sm border rounded overflow-hidden"
              key={index}
              style={{ maxWidth: "100%", maxHeight: "150px", width: "100%" }}
            >
              <div style={{ flex: "0 0 150px", maxHeight: "150px" }}>
                <img
                  src={order.img}
                  alt={order.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="p-3 d-flex flex-column justify-content-between"
                style={{ flex: "1" }}
              >
                <div className="fs-1">
                  <h4 className="mb-2">{order.name}</h4>
                  <div>
                    <span className="badge bg-info text-dark me-2">
                      Qty: {order.quantity}
                    </span>
                    <span className="badge bg-secondary me-2">
                      Rate: Rs {order.rate.toLocaleString()} /-
                    </span>
                    {order.discount > 0 && (
                      <span className="badge bg-success">
                        {order.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-end">
                  <h5 className="text-success mb-0">
                    Rs {order.total.toLocaleString()} /-
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-cart fs-1 text-muted"></i>
          <p className="fs-2 text-muted mt-3">No Orders Placed</p>
        </div>
      )}
    </div>
  );
};
