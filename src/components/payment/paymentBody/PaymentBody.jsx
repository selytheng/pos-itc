import { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentBody.scss";
import { FaTrash, FaMoneyBill, FaCreditCard } from "react-icons/fa";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelError, setCancelError] = useState(null);
  const [selectedTip, setSelectedTip] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://34.123.7.14/api/getAllOrders");
        const sortedOrders = response.data.orders.sort((a, b) => b.id - a.id);
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      const newSubtotal = selectedOrder.order_details.reduce(
        (sum, detail) => sum + detail.quantity * detail.unit_price,
        0
      );
      const newTax = newSubtotal * 0.1;
      const discountAmount = promoCode === "JULY" ? 0.1 : 0;
      const discountedSubtotal = newSubtotal * (1 - discountAmount);
      const newTotal = discountedSubtotal + newTax + selectedTip;
      setSubtotal(discountedSubtotal.toFixed(2));
      setTax(newTax.toFixed(2));
      setTotal(newTotal.toFixed(2));
      setChange((parseFloat(receivedAmount) - newTotal).toFixed(2));
      setDiscount(discountAmount * 100); // Set discount percentage for display
    }
  }, [selectedOrder, selectedTip, receivedAmount, promoCode]);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCancelOrder = async () => {
    try {
      await axios.delete(`http://34.123.7.14/api/orders/${selectedOrder.id}`);
      // Remove the canceled order from the list
      setOrders(orders.filter((order) => order.id !== selectedOrder.id));
      setSelectedOrder(null); // Clear the selected order
    } catch (err) {
      setCancelError("Failed to cancel order");
    }
  };

  const handleDeleteProduct = async (detailId) => {
    try {
      // Delete the product from the order
      await axios.delete(
        `http://34.123.7.14/api/orders/${selectedOrder.id}/details/${detailId}`
      );

      // Remove the product from the selected order details
      const updatedOrderDetails = selectedOrder.order_details.filter(
        (detail) => detail.id !== detailId
      );
      const updatedOrder = {
        ...selectedOrder,
        order_details: updatedOrderDetails,
      };

      if (updatedOrderDetails.length === 0) {
        // If there are no more products, delete the entire order
        await axios.delete(`http://34.123.7.14/api/orders/${selectedOrder.id}`);
        // Remove the canceled order from the list
        setOrders(orders.filter((order) => order.id !== selectedOrder.id));
        setSelectedOrder(null); // Clear the selected order
      } else {
        // Update the selected order state and the list
        setSelectedOrder(updatedOrder);
        setOrders(
          orders.map((order) =>
            order.id === selectedOrder.id ? updatedOrder : order
          )
        );
      }
    } catch (err) {
      setCancelError("Failed to delete product");
    }
  };

  const handleTipClick = (amount) => {
    setSelectedTip(amount);
  };

  const handleReceivedAmountChange = (e) => {
    setReceivedAmount(e.target.value);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleCompleteOrder = () => {
    // Handle order completion logic
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (cancelError) {
    return <div>{cancelError}</div>;
  }

  const formatOrderId = (id) => `#${id.toString().padStart(7, "0")}`;

  return (
    <div className="payment-body">
      {selectedOrder ? (
        <>
          <div className="details-container">
            <div className="left-side">
              <button
                className="back-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Back to Order List
              </button>
              <div className="order-details-content">
                <div className="order-details">
                  <h2>Order {formatOrderId(selectedOrder.id)}</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="table-tbody">
                      {selectedOrder.order_details.map((detail) => (
                        <tr key={detail.id}>
                          <td>{detail.product_code}</td>
                          <td>{detail.quantity}</td>
                          <td>{detail.unit_price}</td>
                          <td>
                            {(detail.quantity * detail.unit_price).toFixed(2)}
                          </td>
                          <td>
                            <FaTrash
                              className="delete-button"
                              onClick={() => handleDeleteProduct(detail.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cancel-order-button-container">
                    <button
                      className="cancel-order-button"
                      onClick={handleCancelOrder}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side">
              <div className="payment-details">
                <div className="title-container">
                  <h2>Payment</h2>
                </div>

                <div className="tip-container">
                  <div className="tip-text">Tip</div>
                  <div className="tip-button-container">
                    <button
                      className={`tip-button ${
                        selectedTip === 0 ? "selected" : ""
                      }`}
                      onClick={() => handleTipClick(0)}
                    >
                      $0
                    </button>
                    <button
                      className={`tip-button ${
                        selectedTip === 5 ? "selected" : ""
                      }`}
                      onClick={() => handleTipClick(5)}
                    >
                      $5
                    </button>
                    <button
                      className={`tip-button ${
                        selectedTip === 10 ? "selected" : ""
                      }`}
                      onClick={() => handleTipClick(10)}
                    >
                      $10
                    </button>
                    <button
                      className={`tip-button ${
                        selectedTip === 15 ? "selected" : ""
                      }`}
                      onClick={() => handleTipClick(15)}
                    >
                      $15
                    </button>
                  </div>
                </div>

                <div className="payment-container">
                  <div className="payment-option-container">
                    <h2 className="title">Payment Options</h2>
                    <div className="payment-option-button-container">
                      <button className="payment-option-button">
                        <FaMoneyBill size={18} />
                        <div>CASH</div>
                      </button>
                      <button className="payment-option-button">
                        <FaCreditCard size={18} />
                        <div>CARD</div>
                      </button>
                    </div>
                  </div>

                  <div className="promo-code-container">
                    <h2 className="title">Promotion code</h2>
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="Promotion code"
                        className="promo-code"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="receive-amount-container">
                  <div className="receive-amount-text">Received : </div>
                  <input
                    type="text"
                    placeholder="Received Amount"
                    className="receive-amount-input"
                    value={receivedAmount}
                    onChange={handleReceivedAmountChange}
                  />
                </div>

                <div className="total-subcontainer">
                  <div className="subtotal-container">
                    <div className="subtotal">SUBTOTAL</div>
                    <div className="subtotal">${subtotal}</div>
                  </div>
                  <div className="tax-container">
                    <div className="tax">TAX (10%)</div>
                    <div className="tax">${tax}</div>
                  </div>
                  <div className="tips-container">
                    <div className="tips">TIPS</div>
                    <div className="tips">${selectedTip}</div>
                  </div>
                  <div className="promotion-container">
                    <div className="promotion">PROMOTION</div>
                    <div className="promotion">{discount}%</div>
                  </div>
                </div>

                <div className="total-received-container">
                  <div className="total-container">
                    <div className="total">TOTAL</div>
                    <div className="total">${total}</div>
                  </div>
                  <div className="received-container">
                    <div className="received">RECEIVED</div>
                    <div className="received">${receivedAmount}</div>
                  </div>
                </div>

                <div className="change-container">
                  <div className="change">CHANGE</div>
                  <div className="change">${change}</div>
                </div>

                <div className="complete-button-container">
                  <button
                    className="complete-button"
                    onClick={handleCompleteOrder}
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="order-list-container">
          <h1 className="order-list-title">Order List</h1>
          <div className="order-list-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Receipt Number</th>
                  <th>Cashier Name</th>
                  <th>Total Price</th>
                  <th>Payment Status</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    className="order-list-tr"
                    key={order.id}
                    onClick={() => handleRowClick(order)}
                  >
                    <td>{formatOrderId(order.id)}</td>
                    <td>{order.receipt_number}</td>
                    <td>{order.cashier.name}</td>
                    <td>{order.total_price}</td>
                    <td>Paid</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
