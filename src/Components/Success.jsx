import { useEffect } from "react";

export const Success = ({ success, setSuccess }) => {
  useEffect(() => {
    const Interval = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    return clearTimeout(() => {
      Interval;
    });
  }, [success]);
  return (
    <div className="fade-in success">
      <p className="m-0">Order Placed Successfully!</p>
      {success && <div className="success-tail"></div>}
    </div>
  );
};
