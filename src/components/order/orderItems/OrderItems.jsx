import { useEffect, useState, useContext } from "react";
import OrderItemCard from "./OrderItem";
import "./OrderItems.scss";
import PropTypes from "prop-types";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { PaymentContext } from "../../../context/PaymentContext"; // Adjust import based on your file structure

const OrderItemCards = ({ selectedCategoryId }) => {
  const [items, setItems] = useState([]);
  const [dropdownOpenSort, setDropdownOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const token = localStorage.getItem("access_token");

  const { addItemToOrder } = useContext(PaymentContext); // Adjust context based on your file structure

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(
          `https://pos-api.gic-itc.top/api/categories/${selectedCategoryId}/products`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        // Map API response to match the OrderItemCard expected fields
        const mappedItems = data.map((item) => ({
          title: item.name,
          price: parseFloat(item.unit_price), // Convert price to number
          stock: item.quantity,
          image: item.image,
          code: item.code,
        }));
        setItems(mappedItems);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchOrderItems();
  }, [selectedCategoryId]); // Fetch products whenever selectedCategoryId changes

  // Sorting function based on sortBy state
  let sortedItems = [...items];
  switch (sortBy) {
    case "A-Z":
      sortedItems.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Z-A":
      sortedItems.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "Highest Price":
      sortedItems.sort((a, b) => b.price - a.price);
      break;
    case "Lowest Price":
      sortedItems.sort((a, b) => a.price - b.price);
      break;
    default:
      break;
  }

  // Reset state when selectedCategoryId changes
  useEffect(() => {
    setSortBy("Default");
  }, [selectedCategoryId]);

  // Sorting options
  const toggleDropdownSort = () => {
    setDropdownOpenSort(!dropdownOpenSort);
  };

  const handleSortOptionClick = (option) => {
    setSortBy(option);
    setDropdownOpenSort(false);
  };

  return (
    <section className="content-order-container">
      <div className="drop-down-container">
        <div className="order-dropdown">
          <button className="dropbtn" onClick={toggleDropdownSort}>
            {sortBy} {dropdownOpenSort ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {dropdownOpenSort && (
            <div className="dropdown-content">
              {["Default", "A-Z", "Z-A", "Highest Price", "Lowest Price"].map(
                (option, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleSortOptionClick(option)}
                    className={sortBy === option ? "selected" : ""}
                  >
                    {option}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="content-order-cards">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <OrderItemCard
              key={item.code}
              cardInfo={item}
              onAdd={addItemToOrder}
            />
          ))
        ) : (
          <div className="no-products-message">No products available</div>
        )}
      </div>
    </section>
  );
};

OrderItemCards.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
};

export default OrderItemCards;
