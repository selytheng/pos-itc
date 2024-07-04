// import { useEffect, useState } from "react";
// import AreaCard from "./AreaCard";
// import "./AreaCards.scss";

// const AreaCards = () => {
//   const [todaysSales, setTodaysSales] = useState(0);
//   const [totalOrdered, setTotalOrdered] = useState(0);
//   const [todaysRevenue, setTodaysRevenue] = useState(0);
//   const [topEmployee, setTopEmployee] = useState({
//     name: "N/A",
//     averageOrderValue: 0,
//     ordersHandled: 0,
//   });

//   useEffect(() => {
//     const fetchTodaysSales = async () => {
//       try {
//         const response = await fetch("http://34.123.7.14/api/total-sales", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         setTodaysSales(result.total_sales);
//       } catch (error) {
//         console.error("Error fetching today's sales", error);
//       }
//     };

//     const fetchTotalOrdered = async () => {
//       try {
//         const response = await fetch("http://34.123.7.14/api/total-items", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         setTotalOrdered(result.total_ordered);
//       } catch (error) {
//         console.error("Error fetching total ordered items", error);
//       }
//     };

//     const fetchTodaysRevenueAndTopEmployee = async () => {
//       try {
//         const response = await fetch("http://34.123.7.14/api/getAllOrders", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         const orders = result.orders;
//         const todaysDate = new Date().toISOString().split("T")[0];

//         const todaysOrders = orders.filter(
//           (order) => order.created_at.split("T")[0] === todaysDate
//         );

//         const revenue = todaysOrders.reduce(
//           (acc, order) => acc + order.total_price,
//           0
//         );

//         setTodaysRevenue(revenue);

//         // Calculate average total_price per order for each employee
//         const employeeSales = {};
//         todaysOrders.forEach((order) => {
//           const { employee_name, total_price } = order;
//           if (!employeeSales[employee_name]) {
//             employeeSales[employee_name] = { total: 0, count: 0 };
//           }
//           employeeSales[employee_name].total += total_price;
//           employeeSales[employee_name].count += 1;
//         });

//         let bestEmployee = {
//           name: "N/A",
//           averageOrderValue: 0,
//           ordersHandled: 0,
//         };
//         for (const [name, { total, count }] of Object.entries(employeeSales)) {
//           const averageOrderValue = total / count;
//           if (averageOrderValue > bestEmployee.averageOrderValue) {
//             bestEmployee = { name, averageOrderValue, ordersHandled: count };
//           }
//         }

//         setTopEmployee(bestEmployee);
//       } catch (error) {
//         console.error("Error fetching today's revenue and top employee", error);
//       }
//     };

//     fetchTodaysSales();
//     fetchTotalOrdered();
//     fetchTodaysRevenueAndTopEmployee();
//   }, []);

//   return (
//     <section className="content-area-cards">
//       <AreaCard
//         colors={["#e4e8ef", "#ffcc3e"]}
//         percentFillValue={`${totalOrdered}`}
//         cardInfo={{
//           title: "Total Sales",
//           value: `$${(todaysSales / 1000).toFixed(1)}K`,
//           text: `Total orders: ${totalOrdered} times.`,
//         }}
//       />
//       <AreaCard
//         colors={["#e4e8ef", "#4ce13f"]}
//         percentFillValue={`${(todaysRevenue / 10000).toFixed(0)}`}
//         cardInfo={{
//           title: "Today's Revenue",
//           value: `$${(todaysRevenue / 1000).toFixed(1)}K`,
//           text: "69% Overall",
//         }}
//       />
//       <AreaCard
//         colors={["#e4e8ef", "#475be8"]}
//         percentFillValue={`${(topEmployee.averageOrderValue / 10).toFixed(0)}`}
//         cardInfo={{
//           title: "Average Sale",
//           value: `$${(topEmployee.averageOrderValue / 1000).toFixed(1)}K`,
//           text: `Handled ${topEmployee.ordersHandled} orders`,
//         }}
//       />
//       <AreaCard
//         colors={["#e4e8ef", "#475be8"]}
//         percentFillValue={`${(topEmployee.averageOrderValue / 10).toFixed(0)}`}
//         cardInfo={{
//           title: "Top Performing Employee",
//           value: `$${(topEmployee.averageOrderValue / 1000).toFixed(1)}K`,
//           text: `Handled ${topEmployee.ordersHandled} orders`,
//         }}
//       />
//     </section>
//   );
// };

// export default AreaCards;
import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [todaysSales, setTodaysSales] = useState(0);
  const [totalOrdered, setTotalOrdered] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [topEmployee, setTopEmployee] = useState({
    name: "N/A",
    averageOrderValue: 0,
    ordersHandled: 0,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch today's sales
        const salesResponse = await fetch(
          "http://34.123.7.14/api/total-sales",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!salesResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const salesResult = await salesResponse.json();
        setTodaysSales(salesResult.total_sales);

        // Fetch total ordered items
        const totalOrderedResponse = await fetch(
          "http://34.123.7.14/api/total-items",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!totalOrderedResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const totalOrderedResult = await totalOrderedResponse.json();
        setTotalOrdered(totalOrderedResult.total_ordered);

        // Fetch all orders
        const ordersResponse = await fetch(
          "http://34.123.7.14/api/getAllOrders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!ordersResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const ordersResult = await ordersResponse.json();
        const orders = ordersResult.orders;
        const todaysDate = new Date().toISOString().split("T")[0];

        // Calculate today's revenue
        const todaysOrders = orders.filter(
          (order) => order.created_at.split("T")[0] === todaysDate
        );

        const revenue = todaysOrders.reduce(
          (acc, order) => acc + order.total_price,
          0
        );

        setTodaysRevenue(revenue);

        // Calculate average order value
        const totalPrice = orders.reduce(
          (acc, order) => acc + order.total_price,
          0
        );
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalPrice / totalOrders : 0;
        setAverageOrderValue(avgOrderValue);

        // Calculate the best employee
        const employeeSales = {};
        todaysOrders.forEach((order) => {
          const { employee_name, total_price } = order;
          if (!employeeSales[employee_name]) {
            employeeSales[employee_name] = { total: 0, count: 0 };
          }
          employeeSales[employee_name].total += total_price;
          employeeSales[employee_name].count += 1;
        });

        let bestEmployee = {
          name: "N/A",
          averageOrderValue: 0,
          ordersHandled: 0,
        };
        for (const [name, { total, count }] of Object.entries(employeeSales)) {
          const averageOrderValue = total / count;
          if (averageOrderValue > bestEmployee.averageOrderValue) {
            bestEmployee = { name, averageOrderValue, ordersHandled: count };
          }
        }

        setTopEmployee(bestEmployee);

        // Log the average order value
        console.log(
          `Average Order Value: $${(avgOrderValue / 1000).toFixed(1)}K`
        );
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#ffcc3e"]}
        percentFillValue={`${totalOrdered}`}
        cardInfo={{
          title: "Total Sales",
          value: `$${(todaysSales / 1000).toFixed(1)}K`,
          text: `Total orders: ${totalOrdered} times.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={`${(todaysRevenue / 10000).toFixed(0)}`}
        cardInfo={{
          title: "Today's Revenue",
          value: `$${(todaysRevenue / 1000).toFixed(1)}K`,
          text: "69% Overall",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={`${(averageOrderValue / 10000).toFixed(0)}`}
        cardInfo={{
          title: "Average Sale",
          value: `$${(averageOrderValue / 1000).toFixed(1)}K`,
          text: `Orders: ${totalOrdered} times.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={`${(topEmployee.averageOrderValue / 10000).toFixed(
          0
        )}`}
        cardInfo={{
          title: "Top Performing Employee",
          value: `$${(topEmployee.averageOrderValue / 1000).toFixed(1)}K`,
          text: `Handled ${topEmployee.ordersHandled} orders`,
        }}
      />
    </section>
  );
};

export default AreaCards;
