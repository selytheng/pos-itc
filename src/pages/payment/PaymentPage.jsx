import React from "react";
import "../payment/PaymentPage.scss";
// import logo from "../../assets/images/logo.png";
import { FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

const PaymentPage = () => {
  return (
    <div className="payment-container">
      <main className="content">
        <div className="header">
          <h1>Payments</h1>
          <div className="search-bar">
            <BiSearchAlt size={24} className="big_search" />
            <input type="text" placeholder="Search for food, meat..." />
          </div>
        </div>
        <section className="payment-details">
          <div className="order-info">
            <div className="order-header">
              <h2 style={{ fontSize: "16px" }}>ORDER #23042002</h2>
              <span>Table: 1</span>
              <span>Time: 20:20 PM</span>
            </div>
            <table className="order-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>SUBTOTAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Salads with salmon</td>
                  <td>$2.99</td>
                  <td>1</td>
                  <td>$2.99</td>
                  <td>
                    <FaTrash className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Salads with salmon</td>
                  <td>$2.99</td>
                  <td>1</td>
                  <td>$2.99</td>
                  <td>
                    <FaTrash className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Salads with salmon</td>
                  <td>$2.99</td>
                  <td>1</td>
                  <td>$2.99</td>
                  <td>
                    <FaTrash className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Salads with salmon</td>
                  <td>$2.99</td>
                  <td>1</td>
                  <td>$2.99</td>
                  <td>
                    <FaTrash className="delete-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="cancel-order-button">CANCEL ORDER</button>
          </div>
          <div className="payment-summary">
            <h3>PAYMENT AMOUNT</h3>
            <p className="amount">$11.96</p>
            <div className="tips-section">
              <button>$5</button>
              <button>$10</button>
              <button>$10</button>
            </div>
            <div className="payment-methods">
              <button className="cash-button">CASH</button>
              <button className="card-button">CARD</button>
              <button className="voucher-button">VOUCHER</button>
            </div>
            <div className="additional-charges">
              <div className="charge">
                <span>ADD CARD RECEIVER</span>
                <span>$15</span>
              </div>
              <div className="charge">
                <span>SUBTOTAL</span>
                <span>$11.96</span>
              </div>
              <div className="charge">
                <span>TIPS</span>
                <span>$5.00</span>
              </div>
              <div className="charge">
                <span>SERVICE CHARGE</span>
                <span>$3.50</span>
              </div>
            </div>
            <div className="total">
              <span>TOTAL</span>
              <span style={{ color: "red" }}>$20.46</span>
            </div>
            <button className="pay-button">PAY NOW</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaymentPage;
