import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./OrderMenu.scss";

const OrderMenu = ({ onSelectMenu, selectedMenu, categories }) => {
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

  const handleClick = (menu, id) => {
    onSelectMenu(menu, id); // Pass both menu name and category ID
  };

  return (
    <div className="content-order-menu-container">
      <div className="content-order-menu">
        {categories.map((category, index) => (
          <h2
            key={index}
            className={`order-menu-option ${
              selectedMenu === category.name ? "selected" : ""
            }`}
            onClick={() => handleClick(category.name, category.id)} // Pass the category ID to handleClick
          >
            {category.name}
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
    </div>
  );
};

OrderMenu.propTypes = {
  onSelectMenu: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

export default OrderMenu;
