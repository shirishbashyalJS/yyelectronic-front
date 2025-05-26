import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

export const Header = ({ ordered }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning pt-4 pb-4">
      <div className="container-fluid container d-flex justify-content-around">
        <NavLink
          className="navbar-brand navbar-brand-section hover-big
"
          to="/"
        >
          <img src="/ganesh.png" style={{ height: 35 }} alt="" />
          <span className="header-title ">
            <h1 className="fs-1">YY Electronics</h1>
          </span>
        </NavLink>
        <NavLink to="/cart" className="cart-nav">
          <div className="ordered-number">
            <p>{ordered.length}</p>
          </div>
          <FaCartArrowDown className="fs-1 hover-big" fill="black" />
        </NavLink>
      </div>
    </nav>
  );
};
