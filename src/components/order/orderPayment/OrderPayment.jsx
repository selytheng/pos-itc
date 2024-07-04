import { useState, useMemo, useContext } from "react";
import "./OrderPayment.scss";
import { FaTrash, FaTimes, FaMoneyCheckAlt } from "react-icons/fa";
import { PaymentContext } from "../../../context/PaymentContext";

const OrderPayment = () => {
  const {
    isPaymentOpen,
    openPayment,
    closePayment,
    items,
    removeItemFromOrder,
    updateItemQuantity,
    clearCart, // Destructure clearCart from the context
  } = useContext(PaymentContext);
  const [activeOption, setActiveOption] = useState("Dine In");
  const [orderNumber, setOrderNumber] = useState(1);
  const [editableQty, setEditableQty] = useState({});
  const [initialQty, setInitialQty] = useState({});
  const token = localStorage.getItem("access_token");

  // Order payment option
  const handleButtonOrderPaymentOptionClick = (option) => {
    setActiveOption(option);
  };

  // Delete button
  const handleDeleteClick = (productCode) => {
    removeItemFromOrder(productCode);
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

  // Fetch cashier ID
  const fetchCashierId = async () => {
    try {
      const response = await fetch("http://34.123.7.14/api/auth/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Failed to fetch cashier ID:", error);
      return null;
    }
  };

  // Handle create an order click
  const handleCreateAnOrderClick = async () => {
    const cashierId = await fetchCashierId();

    if (!cashierId) {
      console.error("Failed to get cashier ID.");
      return;
    }

    const orderItems = items.map((item) => ({
      product_code: item.code,
      quantity: item.qty,
    }));

    try {
      const response = await fetch("http://34.123.7.14/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cashier_id: cashierId,
          items: orderItems,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created:", data);
        setOrderNumber((prevOrderNumber) => prevOrderNumber + 1); // Increment the order number for the next order
        clearCart(); // Clear the cart after successfully creating an order
      } else {
        console.error("Failed to create order:", await response.text());
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handle quantity click to make it editable
  const handleQtyClick = (productCode) => {
    setEditableQty((prevEditableQty) => ({
      ...prevEditableQty,
      [productCode]: true,
    }));
    setInitialQty((prevInitialQty) => ({
      ...prevInitialQty,
      [productCode]: items.find((item) => item.code === productCode).qty,
    }));
  };

  // Handle quantity change
  const handleQtyChange = (e, productCode) => {
    let newQty = e.target.value ? parseInt(e.target.value, 10) : "";
    const item = items.find((item) => item.code === productCode);
    if (newQty > item.stock) {
      newQty = item.stock;
    }
    updateItemQuantity(productCode, newQty);
  };

  // Handle blur event to exit edit mode
  const handleQtyBlur = (productCode) => {
    if (items.find((item) => item.code === productCode).qty === "") {
      updateItemQuantity(productCode, initialQty[productCode]);
    }
    setEditableQty((prevEditableQty) => ({
      ...prevEditableQty,
      [productCode]: false,
    }));
  };

  // Handle keydown event to exit edit mode on Enter key
  const handleQtyKeyDown = (e, productCode) => {
    if (e.key === "Enter") {
      if (items.find((item) => item.code === productCode).qty === "") {
        updateItemQuantity(productCode, initialQty[productCode]);
      }
      e.target.blur();
    }
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
          <h2 className="order-number">
            Orders #{formatOrderNumber(orderNumber)}
          </h2>
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
                <div key={item.code} className="payment-table-body">
                  <div className="payment-table-body-top">
                    <div className="payment-table-image-title-price">
                      <div className="payment-table-item-image">
                        <img
                          src={`http://34.123.7.14/${item.image}`}
                          alt={item.title}
                          className="payment-image"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "/path/to/fallback-image.png")
                          }
                        />
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
                      <div
                        className="payment-table-item-qty-container"
                        onClick={() => handleQtyClick(item.code)}
                      >
                        {editableQty[item.code] ? (
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleQtyChange(e, item.code)}
                            onBlur={() => handleQtyBlur(item.code)}
                            onKeyDown={(e) => handleQtyKeyDown(e, item.code)}
                            autoFocus
                            min="0"
                          />
                        ) : (
                          <div className="payment-table-item-qty">
                            {item.qty}
                          </div>
                        )}
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
                        className="payment-instructions-input"
                      />
                    </div>
                    <div className="payment-delete-button-container">
                      <button
                        className="payment-delete-button"
                        onClick={() => handleDeleteClick(item.code)}
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
          <button
            className="continue-to-payment"
            onClick={handleCreateAnOrderClick}
          >
            Create an order
          </button>
        </div>
      </section>
    </>
  );
};

export default OrderPayment;
