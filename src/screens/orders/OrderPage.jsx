import { useState } from "react";
import {
  OrderTop,
  OrderMenu,
  OrderItems,
  OrderPayment,
} from "../../components";
import "./OrderPage.scss";
import { PaymentProvider } from "../../context/PaymentContext";

const OrderPage = () => {
  // useState has two props
  // First prop (selectedMenu) shows new selected menu
  // Second prop (setSelectedMenu) shows current selected menu
  const [selectedMenu, setSelectedMenu] = useState("Foods");

  return (
    <PaymentProvider>
      <div className="content-area">
        <OrderTop />
        <OrderMenu onSelectMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        <div className="order-area">
          <div className="item-area">
            {/* Display the items for the selected menu */}
            <OrderItems selectedMenu={selectedMenu} />
          </div>
          <div className="payment-area">
            <OrderPayment />
          </div>
        </div>
      </div>
    </PaymentProvider>
  );
};

export default OrderPage;
