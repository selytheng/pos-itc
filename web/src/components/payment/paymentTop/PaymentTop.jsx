import { MdOutlineMenu } from "react-icons/md";
import "./PaymentTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const PaymentTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <div className="content-payment-top">
      <div className="payment-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="payment-top-title">Payments</h2>
      </div>
      <div className="payment-top-r">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </div>
  );
};

export default PaymentTop;
