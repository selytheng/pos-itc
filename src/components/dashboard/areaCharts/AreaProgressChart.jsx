import React, { useState, useEffect } from "react";
// import "./AreaProgressChart.scss";

const AreaProgressChart = () => {
  const [mostSoldItems, setMostSoldItems] = useState([]);
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    const fetchProductNames = async () => {
      const response = await fetch("http://34.123.7.14/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace with actual access token
        },
      });
      const data = await response.json();
      const names = data.reduce((acc, product) => {
        acc[product.code] = product.name;
        return acc;
      }, {});
      setProductNames(names);
    };

    const fetchMostSoldItems = async () => {
      const response = await fetch("http://34.123.7.14/api/getAllOrders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace with actual access token
        },
      });
      const data = await response.json();

      const itemsSold = data.orders.reduce((acc, order) => {
        order.order_details.forEach((detail) => {
          if (!acc[detail.product_code]) {
            acc[detail.product_code] = {
              code: detail.product_code,
              quantity: 0,
            };
          }
          acc[detail.product_code].quantity += detail.quantity;
        });
        return acc;
      }, {});

      const itemsArray = Object.values(itemsSold).sort(
        (a, b) => b.quantity - a.quantity
      );
      setMostSoldItems(itemsArray);
    };

    fetchProductNames();
    fetchMostSoldItems();
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Most Sold Items</h4>
      </div>
      <div className="progress-bar-list">
        {mostSoldItems.map((item, index) => (
          <div className="progress-bar-item" key={index}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">
                {productNames[item.code] || item.code}
              </p>
              <p className="bar-item-info-value">{item.quantity}</p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  width: `${
                    (item.quantity / mostSoldItems[0].quantity) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChart;
