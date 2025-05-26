// import React from "react";
// import { Button, Modal, ListGroup } from "react-bootstrap";

// export default function ConfirmationModal({ show, onClose, order, onConfirm }) {
//   if (!order) return null;
//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title className="fs-2">Confirm Your Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p className="fs-4">Please review your order details:</p>
//         <ListGroup variant="flush">
//           <ListGroup.Item className="fs-4">
//             <strong className="fs-3">Item:</strong> {order.name}
//           </ListGroup.Item>
//           <ListGroup.Item className="fs-4">
//             <strong className="fs-3">Quantity:</strong> {order.quantity}
//           </ListGroup.Item>
//           <ListGroup.Item className="fs-4">
//             <strong className="fs-3">Total:</strong> Rs {order.total}
//           </ListGroup.Item>
//           <ListGroup.Item className="fs-4">
//             <strong className="fs-3">Phone:</strong> {order.phone}
//           </ListGroup.Item>
//         </ListGroup>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" className="fs-4" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="success" className="fs-4" onClick={onConfirm}>
//           Confirm Order
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

import React from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";

export default function ConfirmationModal({ show, onClose, order, onConfirm }) {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-2">Confirm Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fs-4">Please review your order details:</p>
        <ListGroup variant="flush">
          <ListGroup.Item className="fs-4">
            <strong className="fs-3">Item:</strong> {order.name}
          </ListGroup.Item>
          <ListGroup.Item className="fs-4">
            <strong className="fs-3">Quantity:</strong> {order.quantity}
          </ListGroup.Item>
          <ListGroup.Item className="fs-4">
            <strong className="fs-3">Total:</strong> Rs {order.total}
          </ListGroup.Item>
          <ListGroup.Item className="fs-4">
            <strong className="fs-3">Phone:</strong> {order.phone}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="fs-4" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" className="fs-4" onClick={onConfirm}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
