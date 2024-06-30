import React, { useEffect } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import OrderItemCard from "./OrderItem";
import "./OrderItems.scss";
import SaladImage from "../../../assets/images/salad.png";
import PropTypes from "prop-types";

const foodsData = [
  {
    image: SaladImage,
    title: "Hamburger",
    value: "$6.99",
    stock: "123 Blows available",
  },
  {
    image: SaladImage,
    title: "Sandwich",
    value: "$2.99",
    stock: "214 Blows available",
  },
  {
    image: SaladImage,
    title: "Pizza",
    value: "$14.99",
    stock: "50 Blows available",
  },
  {
    image: SaladImage,
    title: "Rice",
    value: "$4.99",
    stock: "0 Blows available",
  },
];

const fruitsData = [
  {
    image: SaladImage,
    title: "Apple",
    value: "$2.99",
    stock: "168 Blows available",
  },
  {
    image: SaladImage,
    title: "Banana",
    value: "$0.99",
    stock: "100 Blows available",
  },
  {
    image: SaladImage,
    title: "Orange",
    value: "$1.99",
    stock: "200 Blows available",
  },
];

const OrderItemCards = ({ selectedMenu }) => {
  const [dropdownOpenSubcategory, setDropdownOpenSubcategory] =
    React.useState(false);
  const [selectedSubcategoryOption, setSubcategoryOption] =
    React.useState("All");

  const [dropdownOpenSort, setDropdownOpenSort] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("Default");

  let itemsToDisplay = [];
  let dropdownOptions = ["All"];
  let sortedItems = [];

  switch (selectedMenu) {
    case "Foods":
      itemsToDisplay = foodsData;
      dropdownOptions = ["All", "Hamburger", "Pizza", "Rice", "Sandwich"];
      break;
    case "Fruits":
      itemsToDisplay = fruitsData;
      dropdownOptions = ["All", "Apple", "Banana", "Orange"];
      break;
    default:
      itemsToDisplay = foodsData;
      dropdownOptions = ["All"];
  }

  // Sorting function based on sortBy state
  switch (sortBy) {
    case "A-Z":
      sortedItems = itemsToDisplay
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Z-A":
      sortedItems = itemsToDisplay
        .slice()
        .sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "Highest Price":
      sortedItems = itemsToDisplay
        .slice()
        .sort(
          (a, b) => parseFloat(b.value.slice(1)) - parseFloat(a.value.slice(1))
        );
      break;
    case "Lowest Price":
      sortedItems = itemsToDisplay
        .slice()
        .sort(
          (a, b) => parseFloat(a.value.slice(1)) - parseFloat(b.value.slice(1))
        );
      break;
    default:
      sortedItems = itemsToDisplay;
  }

  useEffect(() => {
    // Reset to "All" when the Category menu changes
    setSubcategoryOption("All");
    // Reset to "Default" when the Category menu changes
    setSortBy("Default");
  }, [selectedMenu]);

  // Subcategory options
  const toggleDropdownSubcategory = () => {
    setDropdownOpenSubcategory(!dropdownOpenSubcategory);
  };

  // Sorting options
  const toggleDropdownSort = () => {
    setDropdownOpenSort(!dropdownOpenSort);
  };

  const handleSubcategoryOptionClick = (option) => {
    setSubcategoryOption(option);
    // Close the subcategory dropdown when a subcategory option is clicked
    setDropdownOpenSubcategory(false);
  };

  const handleSortOptionClick = (option) => {
    setSortBy(option);
    // Close the sorting dropdown when a sorting option is clicked
    setDropdownOpenSort(false);
  };

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
              {dropdownOptions.map((option, index) => (
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
              ))}
            </div>
          )}
        </div>

        <div className="order-dropdown">
          <button className="dropbtn" onClick={toggleDropdownSort}>
            {sortBy} {dropdownOpenSort ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {dropdownOpenSort && (
            <div className="dropdown-content">
              <a
                href="#"
                onClick={() => handleSortOptionClick("Default")}
                className={sortBy === "Default" ? "selected" : ""}
              >
                Default
              </a>
              <a
                href="#"
                onClick={() => handleSortOptionClick("A-Z")}
                className={sortBy === "A-Z" ? "selected" : ""}
              >
                A-Z
              </a>
              <a
                href="#"
                onClick={() => handleSortOptionClick("Z-A")}
                className={sortBy === "Z-A" ? "selected" : ""}
              >
                Z-A
              </a>
              <a
                href="#"
                onClick={() => handleSortOptionClick("Highest Price")}
                className={sortBy === "Highest Price" ? "selected" : ""}
              >
                Highest Price
              </a>
              <a
                href="#"
                onClick={() => handleSortOptionClick("Lowest Price")}
                className={sortBy === "Lowest Price" ? "selected" : ""}
              >
                Lowest Price
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="content-order-cards">
        {sortedItems
          .filter(
            (item) =>
              selectedSubcategoryOption === "All" ||
              item.title === selectedSubcategoryOption
          )
          .map((item, index) => (
            <OrderItemCard key={index} cardInfo={item} />
          ))}
      </div>
    </section>
  );
};

OrderItemCards.propTypes = {
  selectedMenu: PropTypes.string.isRequired,
};

export default OrderItemCards;
