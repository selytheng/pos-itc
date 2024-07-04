import { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentBody.scss";
import { FaTrash, FaMoneyBill, FaCreditCard } from "react-icons/fa";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  if (error) {
    return <div>{error}</div>;
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
                    <tbody>
                      {selectedOrder.order_details.map((detail) => (
                        <tr key={detail.id}>
                          <td>{detail.product_code}</td>
                          <td>{detail.quantity}</td>
                          <td>{detail.unit_price}</td>
                          <td>
                            {(detail.quantity * detail.unit_price).toFixed(2)}
                          </td>
                          <td>
                            <FaTrash className="delete-button" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cancel-order-button-container">
                    <button className="cancel-order-button">
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
                  <div className="tip-text">Add Tip</div>
                  <div className="tip-button-container">
                    <button className="tip-button">$1</button>
                    <button className="tip-button">$5</button>
                    <button className="tip-button">$10</button>
                    <button className="tip-button">$15</button>
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
                  />
                </div>

                <div className="total-subcontainer">
                  <div className="subtotal-container">
                    <div className="subtotal">SUBTOTAL</div>
                    <div className="subtotal">$12</div>
                  </div>
                  <div className="tips-container">
                    <div className="tips">TIPS</div>
                    <div className="tips">$5</div>
                  </div>
                  <div className="tax-container">
                    <div className="tax">TAX (10%)</div>
                    <div className="tax">$12</div>
                  </div>
                </div>

                <div className="total-received-container">
                  <div className="total-container">
                    <div className="total">TOTAL</div>
                    <div className="total">$12</div>
                  </div>
                  <div className="received-container">
                    <div className="received">RECEIVED</div>
                    <div className="received">$12</div>
                  </div>
                </div>

                <div className="change-container">
                  <div className="change">CHANGE</div>
                  <div className="change">$12</div>
                </div>

                <div className="complete-button-container">
                  <button>Complete Order</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="order-list-title">Order List</h1>
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
        </>
      )}
    </div>
  );
};

export default OrdersList;
