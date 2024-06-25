import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeItem, setActiveItem] = useState("");

  // Closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">t-store.</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li
              className={`menu-item ${
                activeItem === "Dashboard" ? "active" : ""
              }`}>
              <Link
                to="/dashboard"
                className="menu-link"
                onClick={() => handleItemClick("Dashboard")}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li
              className={`menu-item ${
                activeItem === "Statistics" ? "active" : ""
              }`}>
              <Link
                to="/statistics"
                className="menu-link"
                onClick={() => handleItemClick("Statistics")}>
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Statistics</span>
              </Link>
            </li>
            <li
              className={`menu-item ${
                activeItem === "Payment" ? "active" : ""
              }`}>
              <Link
                to="/payment"
                className="menu-link"
                onClick={() => handleItemClick("Payment")}>
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney size={20} />
                </span>
                <span className="menu-link-text">Payment</span>
              </Link>
            </li>
            <li
              className={`menu-item ${
                activeItem === "Orders" ? "active" : ""
              }`}>
              <Link
                to="/order"
                className="menu-link"
                onClick={() => handleItemClick("Orders")}>
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={20} />
                </span>
                <span className="menu-link-text">Orders</span>
              </Link>
            </li>
            <li
              className={`menu-item ${
                activeItem === "Products" ? "active" : ""
              }`}>
              <Link
                to="/product"
                className="menu-link"
                onClick={() => handleItemClick("Products")}>
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Products</span>
              </Link>
            </li>
            <li
              className={`menu-item ${
                activeItem === "Customer" ? "active" : ""
              }`}>
              <Link
                to="/customer"
                className="menu-link"
                onClick={() => handleItemClick("Customer")}>
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Customer</span>
              </Link>
            </li>
            <li
              className={`menu-item ${activeItem === "User" ? "active" : ""}`}>
              <Link
                to="/user"
                className="menu-link"
                onClick={() => handleItemClick("User")}>
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">User</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
