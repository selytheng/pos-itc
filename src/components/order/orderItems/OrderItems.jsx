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
    value: "$2.99",
    stock: "20 Blows available",
  },
  {
    image: SaladImage,
    title: "Sandwich",
    value: "$2.99",
    stock: "20 Blows available",
  },
  {
    image: SaladImage,
    title: "Pizza",
    value: "$2.99",
    stock: "20 Blows available",
  },
  {
    image: SaladImage,
    title: "Rice",
    value: "$2.99",
    stock: "20 Blows available",
  },
];

const fruitsData = [
  {
    image: SaladImage,
    title: "Apple",
    value: "$2.99",
    stock: "20 Blows available",
  },
  {
    image: SaladImage,
    title: "Banana",
    value: "$2.99",
    stock: "20 Blows available",
  },
  {
    image: SaladImage,
    title: "Orange",
    value: "$2.99",
    stock: "20 Blows available",
  },
];

const OrderItemCards = ({ selectedMenu }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("All");

  let itemsToDisplay = [];
  let dropdownOptions = ["All"];

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
      itemsToDisplay = foodsData; // Default to foods if no valid menu is selected
      dropdownOptions = ["All"];
  }

  useEffect(() => {
    setSelectedOption("All"); // Reset to "All" when the selected menu changes
  }, [selectedMenu]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false); // Close the dropdown when an option is clicked
  };

  return (
    <section className="content-order-container">
      <div className="order-dropdown">
        <button className="dropbtn" onClick={toggleDropdown}>
          {selectedOption} {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            {dropdownOptions.map((option, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option ? "selected" : ""}
              >
                {option}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="content-order-cards">
        {itemsToDisplay
          .filter(
            (item) => selectedOption === "All" || item.title === selectedOption
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
