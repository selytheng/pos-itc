import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";

const AreaBarChart = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
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

        // Get current year
        const currentYear = new Date().getFullYear();

        // Calculate monthly revenue
        const monthlyRevenue = orders.reduce((acc, order) => {
          const date = new Date(order.created_at);
          const year = date.getFullYear();

          if (year === currentYear) {
            const month = date.toLocaleString("default", { month: "short" });
            const existingMonth = acc.find((item) => item.month === month);

            if (existingMonth) {
              existingMonth.revenue += order.total_price;
            } else {
              acc.push({ month, revenue: order.total_price });
            }
          }

          return acc;
        }, []);

        // Sort months according to your requirement
        const sortedData = [
          { month: "Jan", revenue: 0 },
          { month: "Feb", revenue: 0 },
          { month: "Mar", revenue: 0 },
          { month: "Apr", revenue: 0 },
          { month: "May", revenue: 0 },
          { month: "Jun", revenue: 0 },
          { month: "Jul", revenue: 0 },
          { month: "Aug", revenue: 0 },
          { month: "Sep", revenue: 0 },
          { month: "Oct", revenue: 0 },
          { month: "Nov", revenue: 0 },
          { month: "Dec", revenue: 0 },
        ].map((monthData) => ({
          ...monthData,
          revenue:
            (monthlyRevenue.find((item) => item.month === monthData.month)
              ?.revenue || 0) / 1000,
        }));

        setData(sortedData);

        // Calculate total revenue and percentage change
        const totalRevenue = sortedData.reduce(
          (acc, item) => acc + item.revenue,
          0
        );
        const lastMonthRevenue =
          sortedData[sortedData.length - 2]?.revenue || 0;
        const percentageChange = lastMonthRevenue
          ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
          : 0;

        setTotalRevenue(totalRevenue);
        setPercentageChange(percentageChange);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const formatTooltipValue = (value) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}k`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Total Revenue</h5>
        <div className="chart-info-data">
          <div className="info-data-value">${totalRevenue.toFixed(1)}K</div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>{percentageChange.toFixed(2)}% than last month.</p>
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="revenue"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
