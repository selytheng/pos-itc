// Customer.jsx
import React from "react";
import "../customer/CustomerPage.scss";
import { MdMarkEmailRead } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md"; // Import the icon

const Customer = () => {
  const orders = [
    {
      id: "#20201008",
      time: "10:00PM",
      type: "Regular",
      employee: "Mouylang",
      status: "Complete",
      paymentStatus: "Paid",
      amount: "$200",
    },
    {
      id: "#20201008",
      time: "10:00PM",
      type: "Regular",
      employee: "Mouylang",
      status: "Complete",
      paymentStatus: "Paid",
      amount: "$200",
    },
  ];
  return (
    <div className="customer">
      <div className="header">
        <h1>Customers</h1>
        <div className="search-bar">
          <BiSearchAlt size={24} className="big_search" />

          <input type="text" placeholder="Search for food, meat..." />
        </div>
      </div>
      <div className="info-cards">
        <div className="card email">
          <div className="icon">
            <MdMarkEmailRead />
          </div>
          <div>
            <p>Email</p>
            <span>mouylangpom@gmail.com</span>
          </div>
        </div>
        <div className="card register-since">
          <div className="icon">
            <GiArchiveRegister />
          </div>
          <div>
            <p>Register Since</p>
            <span>mouylangpom@gmail.com</span>
          </div>
        </div>
        <div className="card favorite-branches">
          <div className="icon">
            <FaStore />
          </div>
          <div>
            <p>Favorite Branches</p>
            <span>branch A, B, C</span>
          </div>
        </div>
        <div className="card favorite-items">
          <div className="icon">
            <RiShoppingBag2Fill />
          </div>
          <div>
            <p>Favorite Items</p>
            <span>mouylangpom@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="points">
        <div className="points-card">
          <div className="points-header">
            <MdOutlineAttachMoney className="points-icon" />
            <h2 className="points-title">Total Points</h2>
            <span className="points-total">300</span>
          </div>
          <div className="points-details">
            <div className="points-used">
              <span>Points Used</span>
              <span>150</span>
            </div>
            <div className="points-outstanding">
              <span>Outstanding Points</span>
              <span>150</span>
            </div>
          </div>
        </div>
        <div className="points-card">
          <div className="points-header">
            <MdOutlineAttachMoney className="points-icon" />
            <h2 className="points-title">Total Points</h2>
            <span className="points-total">300</span>
          </div>
          <div className="points-details">
            <div className="points-used">
              <span>Points Used</span>
              <span>150</span>
            </div>
            <div className="points-outstanding">
              <span>Outstanding Points</span>
              <span>150</span>
            </div>
          </div>
        </div>
        <div className="points-card">
          <div className="points-header">
            <MdOutlineAttachMoney className="points-icon" />
            <h2 className="points-title">Total Points</h2>
            <span className="points-total">300</span>
          </div>
          <div className="points-details">
            <div className="points-used">
              <span>Points Used</span>
              <span>150</span>
            </div>
            <div className="points-outstanding">
              <span>Outstanding Points</span>
              <span>150</span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="order-list">
          <div className="order-list-header">
            <h2>Order List</h2>
            <div className="order-list-filters">
              <span>All</span>
              <span>Monthly</span>
              <span>Weekly</span>
              <span>Today</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date/Time</th>
                <th>Order Type</th>
                <th>Employee</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.time}</td>
                  <td>{order.type}</td>
                  <td>{order.employee}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
