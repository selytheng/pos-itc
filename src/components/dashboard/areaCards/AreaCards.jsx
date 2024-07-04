import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [todaysSales, setTodaysSales] = useState(0);
  const [totalOrdered, setTotalOrdered] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);

  useEffect(() => {
    const fetchTodaysSales = async () => {
      try {
        const response = await fetch("http://34.123.7.14/api/total-sales", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setTodaysSales(result.total_sales);
      } catch (error) {
        console.error("Error fetching today's sales", error);
      }
    };

    const fetchTotalOrdered = async () => {
      try {
        const response = await fetch("http://34.123.7.14/api/total-items", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setTotalOrdered(result.total_ordered);
      } catch (error) {
        console.error("Error fetching total ordered items", error);
      }
    };

    const fetchTodaysRevenue = async () => {
      try {
        const response = await fetch("http://34.123.7.14/api/getAllOrders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const orders = result.orders;
        const todaysDate = new Date().toISOString().split("T")[0];

        const todaysOrders = orders.filter(
          (order) => order.created_at.split("T")[0] === todaysDate
        );

        const revenue = todaysOrders.reduce(
          (acc, order) => acc + order.total_price,
          0
        );

        setTodaysRevenue(revenue);
      } catch (error) {
        console.error("Error fetching today's revenue", error);
      }
    };

    fetchTodaysSales();
    fetchTotalOrdered();
    fetchTodaysRevenue();
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#ffcc3e"]}
        percentFillValue={80}
        cardInfo={{
          title: "Total Sales",
          value: `$${(todaysSales / 1000).toFixed(1)}K`,
          text: `Total ordered: ${totalOrdered} items.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Todays Revenue",
          value: `$${(todaysRevenue / 1000).toFixed(1)}K`,
          text: "Available to payout",
        }}
      />
    </section>
  );
};

export default AreaCards;
