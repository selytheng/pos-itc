import { MdOutlineMenu } from "react-icons/md";
import "./OrderTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const OrderTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <section className="content-order-top">
      <div className="order-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="order-top-title">Orders</h2>
      </div>
      <div className="order-top-r">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </section>
  );
};

export default OrderTop;
