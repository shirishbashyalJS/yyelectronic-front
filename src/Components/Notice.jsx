import { CiLogout } from "react-icons/ci";

export const Notice = ({ setFormData, formData, setOrdered }) => {
  const handleLogout = () => {
    localStorage.removeItem("contact");
    setFormData({
      phone: "",
      latitude: null,
      longitude: null,
      manualLocation: "",
    });
    setOrdered([]);
  };
  return (
    <div className="notice text-center px-5" style={{ marginTop: "5rem" }}>
      {formData.phone.length === 10 && (
        <button
          className="btn btn-outline-dark btn-lg log-out"
          onClick={handleLogout}
        >
          <CiLogout className="fs-3" />
        </button>
      )}
      <h1 className="fs-4">
        YY Electronics offers durable electronic products with warranty at the
        best prices. Your online order will be confirmed via phone call.
        Currently, we deliver only in Rupandehi. We accept Cash on Delivery or
        QR payments. Delivery charges apply and will be informed in advance. For
        more details, feel free to contact us.{" "}
        <a href="tel:+977-9766282901" className="fs-4">
          Call us at +977-9766282901
        </a>{" "}
        Or{" "}
        <a href="tel:+977-9763663479" className="fs-4">
          Call us at +977-9763663479
        </a>
      </h1>
    </div>
  );
};
