import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./OrderMenu.scss";

const menuItems = [
  "Foods",
  "Fruits",
  "Vegetable",
  "Meat",
  "Bakery",
  "Noodle",
  "Beverages",
  "Beer & Wine",
  "drinks",
  "cake",
  "seafood",
  "Salad",
  "Steak",
];

const OrderMenu = ({ onSelectMenu, selectedMenu }) => {
  const [indicatorPosition, setIndicatorPosition] = useState({
    left: 0,
    width: 0,
  });
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeItem = indicatorRef.current;
    const selectedItem = activeItem.parentElement.querySelector(".selected");

    if (selectedItem) {
      const positionLeft = selectedItem.offsetLeft;
      const width = selectedItem.offsetWidth;
      setIndicatorPosition({ left: positionLeft, width: width });
    }
  }, [selectedMenu]);

  const handleClick = (menu) => {
    onSelectMenu(menu);
  };

  return (
    <div className="content-order-menu">
      {menuItems.map((menu, index) => (
        <h2
          key={index}
          className={`order-menu-option ${
            selectedMenu === menu ? "selected" : ""
          }`}
          onClick={() => handleClick(menu)}
        >
          {menu}
        </h2>
      ))}
      <div
        className="active-indicator"
        ref={indicatorRef}
        style={{
          left: `${indicatorPosition.left}px`,
          width: `${indicatorPosition.width}px`,
        }}
      />
    </div>
  );
};

OrderMenu.propTypes = {
  onSelectMenu: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired,
};

export default OrderMenu;
