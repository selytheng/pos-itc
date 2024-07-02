import { useState, useEffect } from "react";
import {
  OrderTop,
  OrderMenu,
  OrderItems,
  OrderPayment,
} from "../../components";
import { PaymentProvider } from "../../context/PaymentContext";
import "./OrderPage.scss";

const OrderPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(""); // Add state for menu selection
  const [categories, setCategories] = useState([]); // Add state for category name
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add state for category ID
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMzQuMTIzLjcuMTQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTk4ODg2NDIsImV4cCI6MTcxOTg5MjI0MiwibmJmIjoxNzE5ODg4NjQyLCJqdGkiOiJYUXBoRWoxb2hMY3FVeEVuIiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJlbWFpbCI6Imx5aGFiQGdtYWlsLmNvbSIsIm5hbWUiOiJMeWhhYiJ9.H8nWif1axDV6hWNOJrGuZ93fhWCJMTCMua6v2kpIV74";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://34.123.7.14/api/categories", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedMenu(data[0].name); // Default to the first category
          setSelectedCategoryId(data[0].id); // Set the ID for the first category
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectMenu = (menu, id) => {
    setSelectedMenu(menu);
    setSelectedCategoryId(id); // Update the selected category ID
  };

  return (
    <PaymentProvider>
      <div className="content-area">
        <OrderTop />
        <OrderMenu
          selectedMenu={selectedMenu}
          onSelectMenu={handleSelectMenu} // Pass the handleSelectMenu function here
          categories={categories}
        />
        <div className="order-area">
          <div className="item-area">
            {selectedCategoryId && (
              <OrderItems selectedCategoryId={selectedCategoryId} />
            )}{" "}
            {/* Pass the category ID to OrderItems */}
          </div>
          <div className="payment-area">
            <OrderPayment />
          </div>
        </div>
      </div>
    </PaymentProvider>
  );
};

export default OrderPage;
