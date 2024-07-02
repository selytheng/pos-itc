import { useState, useMemo, useContext } from "react";
import "./OrderPayment.scss";
import PaymentImage from "../../../assets/images/salad.png";
import { FaTrash, FaTimes, FaMoneyCheckAlt } from "react-icons/fa";
import { PaymentContext } from "../../../context/PaymentContext";

const OrderPayment = () => {
  const { isPaymentOpen, openPayment, closePayment } =
    useContext(PaymentContext);
  const [activeOption, setActiveOption] = useState("Dine In");
  const [items, setItems] = useState([
    { id: 1, title: "Hamburger", price: 2.99, qty: 2, instructions: "" },
    { id: 2, title: "Pizza", price: 3.99, qty: 1, instructions: "" },
    { id: 3, title: "Sandwich", price: 2.49, qty: 3, instructions: "" },
  ]);

  // Order payment option
  const handleButtonOrderPaymentOptionClick = (option) => {
    setActiveOption(option);
  };

  // Delete button
  const handleDeleteClick = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Instruction input
  const handleInstructionsChange = (id, instructions) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, instructions } : item))
    );
  };

  // Calculate subtotal
  const subtotal = useMemo(
    () =>
      items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2),
    [items]
  );

  // Format order number
  const formatOrderNumber = (number) => {
    return number.toString().padStart(7, "0");
  };

  return (
    <>
      <button
        className={`payment-toggle-btn ${isPaymentOpen ? "open" : ""}`}
        type="button"
        onClick={isPaymentOpen ? closePayment : openPayment}
      >
        {isPaymentOpen ? <FaTimes size={24} /> : <FaMoneyCheckAlt size={24} />}
      </button>
      <section
        className={`content-order-payment ${isPaymentOpen ? "open" : ""}`}
      >
        <div className="top-order-payment">
          <h2 className="order-number">Orders #{formatOrderNumber(1)}</h2>
          <div className="order-option">
            <button
              className={activeOption === "Dine In" ? "active" : ""}
              onClick={() => handleButtonOrderPaymentOptionClick("Dine In")}
            >
              Dine In
            </button>
            <button
              className={activeOption === "To Go" ? "active" : ""}
              onClick={() => handleButtonOrderPaymentOptionClick("To Go")}
            >
              To Go
            </button>
            <button
              className={activeOption === "Delivery" ? "active" : ""}
              onClick={() => handleButtonOrderPaymentOptionClick("Delivery")}
            >
              Delivery
            </button>
          </div>
          <div className="payment-table">
            <div className="payment-table-top">
              <p className="payment-items-container">Items</p>
              <p className="payment-qty-container">Qty</p>
              <p className="payment-price-container">Price</p>
            </div>
            <div className="payment-table-body-container">
              {items.map((item) => (
                <div key={item.id} className="payment-table-body">
                  <div className="payment-table-body-top">
                    <div className="payment-table-image-title-price">
                      <div className="payment-table-item-image">
                        <img src={PaymentImage} className="payment-image" />
                      </div>
                      <div className="payment-table-item-title-price">
                        <div className="payment-table-item-title">
                          {item.title}
                        </div>
                        <div className="payment-table-item-price">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="payment-table-item-qty-total-price">
                      <div className="payment-table-item-qty-container">
                        <div className="payment-table-item-qty">{item.qty}</div>
                      </div>
                      <div className="payment-table-item-total-price">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="payment-table-body-bot">
                    <div className="payment-instructions-input-container">
                      <input
                        type="text"
                        placeholder="Instructions"
                        value={item.instructions}
                        onChange={(e) =>
                          handleInstructionsChange(item.id, e.target.value)
                        }
                        className="payment-instructions-input"
                      />
                    </div>
                    <div className="payment-delete-button-container">
                      <button
                        className="payment-delete-button"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bot-order-payment">
          <div className="payment-discount">
            <p>Discount</p>
            <p>$ 0</p>
          </div>
          <div className="payment-subtotal">
            <p>SubTotal</p>
            <p>${subtotal}</p>
          </div>
        </div>
        <div className="continue-to-payment-container">
          <button className="continue-to-payment">Continue to Payment</button>
        </div>
      </section>
    </>
  );
};

export default OrderPayment;
