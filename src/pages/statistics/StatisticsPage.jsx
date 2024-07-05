// import { useEffect } from "react";
import "../statistics/StatisticsPage.scss";
import { Pie } from "react-chartjs-2";
// import user_img from "../../assets/images/girl.png"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlinePeople,
} from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
  const stats = [
    {
      icon: <MdOutlineAttachMoney />,
      change: "+35.40%",
      value: "$10,234.100",
      label: "Total Revenue",
    },
    {
      icon: <MdOutlineBarChart />,
      change: "+35.40%",
      value: "23,456",
      label: "Total Item Order",
    },
    {
      icon: <MdOutlinePeople />,
      change: "+35.40%",
      value: "1234",
      label: "Total Customer",
    },
  ];

  const orders = [
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Complete",
    },
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Preparing",
    },
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Pending",
    },
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Complete",
    },
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Complete",
    },
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Complete",
    },
    {
      customer: "Mouylang",
      menu: "Salads with salmon mushroom noodle",
      total: 120,
      status: "Complete",
    },
  ];

  const data = {
    labels: ["Dine In", "To Go", "Delivery"],
    datasets: [
      {
        data: [200, 200, 200],
        backgroundColor: ["#ffcc3e", "#4ce13f", "#475be8"],
        hoverBackgroundColor: ["#ffcc3e", "#4ce13f", "#475be8"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Statistics</h1>
        <div className="search-bar">
          <BiSearchAlt size={24} className="big_search" />

          <input type="text" placeholder="Search for food, meat..." />
        </div>
      </header>

      <div className="statistics">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="cards">
              <div className="icon">{stat.icon}</div>
              <span className="change">{stat.change}</span>
            </div>
            <div className="details">
              <span className="value">{stat.value}</span>
              <span className="label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="two_cards">
        <div className="order-report">
          <div className="header">
            <h1>Order Report</h1>
            <button className="filter-button">Filter Order</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Menu</th>
                <th>Total Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.customer}</td>
                  <td>{order.menu}</td>
                  <td>${order.total}</td>
                  <td className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-report-chart">
          <div className="header">
            <h2>Order Report</h2>
            <span>Today</span>
          </div>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
