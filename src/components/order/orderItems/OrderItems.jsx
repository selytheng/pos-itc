import { useEffect, useState } from "react";
import OrderItemCard from "./OrderItem";
import "./OrderItems.scss";
import PropTypes from "prop-types";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const OrderItemCards = ({ selectedCategoryId }) => {
  const [items, setItems] = useState([]);
  const [dropdownOpenSubcategory, setDropdownOpenSubcategory] = useState(false);
  const [selectedSubcategoryOption, setSubcategoryOption] = useState("All");
  const [dropdownOpenSort, setDropdownOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(
          `http://34.123.7.14/api/categories/${selectedCategoryId}/products`,
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
    setSubcategoryOption("All");
    setSortBy("Default");
  }, [selectedCategoryId]);

  // Subcategory options
  const toggleDropdownSubcategory = () => {
    setDropdownOpenSubcategory(!dropdownOpenSubcategory);
  };

  const handleSubcategoryOptionClick = (option) => {
    setSubcategoryOption(option);
    setDropdownOpenSubcategory(false);
  };

  // Sorting options
  const toggleDropdownSort = () => {
    setDropdownOpenSort(!dropdownOpenSort);
  };

  const handleSortOptionClick = (option) => {
    setSortBy(option);
    setDropdownOpenSort(false);
  };

  // Filtering items based on selectedSubcategoryOption
  const filteredItems = sortedItems.filter(
    (item) =>
      selectedSubcategoryOption === "All" ||
      item.title === selectedSubcategoryOption
  );

  return (
    <section className="content-order-container">
      <div className="drop-down-container">
        <div className="order-dropdown">
          <button className="dropbtn" onClick={toggleDropdownSubcategory}>
            {selectedSubcategoryOption}
            {dropdownOpenSubcategory ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {dropdownOpenSubcategory && (
            <div className="dropdown-content">
              {["All", ...new Set(items.map((item) => item.title))].map(
                (option, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleSubcategoryOptionClick(option)}
                    className={
                      selectedSubcategoryOption === option ? "selected" : ""
                    }
                  >
                    {option}
                  </a>
                )
              )}
            </div>
          )}
        </div>

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
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <OrderItemCard key={index} cardInfo={item} />
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

////////////////////////////
