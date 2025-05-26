// import React, { useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";

// export default function InfoModal({
//   show,
//   onClose,
//   formData,
//   setFormData,
//   onSubmit,
// }) {
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) =>
//         setFormData((prev) => ({
//           ...prev,
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//         })),
//       () => alert("Location access denied or unavailable")
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!/^\d{10}$/.test(formData.phone)) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }
//     onSubmit(formData);
//     setError("");
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title className="fs-2">Enter Your Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="phone" className="mb-3">
//             <Form.Label className="fs-3">
//               Phone <span className="text-danger fs-2">*</span>
//             </Form.Label>
//             <Form.Control
//               type="tel"
//               name="phone"
//               className="fs-3"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="10-digit phone"
//               required
//             />
//             {error && (
//               <Form.Text className="text-danger fs-4">{error}</Form.Text>
//             )}
//           </Form.Group>
//           <Form.Group controlId="location" className="mb-3">
//             <Form.Label>Location (optional)</Form.Label>
//             <div className="d-flex">
//               <Button
//                 variant="outline-secondary"
//                 onClick={handleLocation}
//                 className="me-2 fs-3"
//               >
//                 Use My Location
//               </Button>
//               <Form.Control
//                 type="text"
//                 name="manualLocation"
//                 className="fs-3"
//                 value={formData.manualLocation || ""}
//                 onChange={handleChange}
//                 placeholder="Or type address"
//               />
//             </div>
//           </Form.Group>
//           <div className="text-end">
//             <Button variant="secondary" onClick={onClose} className="me-2 fs-3">
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit" className="fs-3">
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function InfoModal({
  show,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setFormData((prev) => ({
          ...prev,
          latitude: coords.latitude,
          longitude: coords.longitude,
        })),
      () => alert("Location access denied or unavailable")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    onSubmit(formData);
    setError("");
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-2">Enter Your Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="phone" className="mb-3">
            <Form.Label className="fs-3">
              Phone <span className="text-danger fs-2">*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              className="fs-3"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone"
              required
            />
            {error && (
              <Form.Text className="text-danger fs-4">{error}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="location" className="mb-3">
            <Form.Label className="fs-3">
              Location <span className="text-danger fs-2">*</span>
            </Form.Label>
            <div className="d-flex">
              <Button
                variant="outline-secondary"
                onClick={handleLocation}
                className="me-2 fs-3"
              >
                Use My Location
              </Button>
              <Form.Control
                type="text"
                name="manualLocation"
                className="fs-3"
                value={formData.manualLocation || ""}
                onChange={handleChange}
                placeholder="Or type address"
              />
            </div>
          </Form.Group>
          <div className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2 fs-3">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="fs-3">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
