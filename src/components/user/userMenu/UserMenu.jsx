import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserMenu.scss";
import UserBody from "../userBody/UserBody";

const UserMenu = ({ onSelectMenu }) => {
  const [currentRole, setCurrentRole] = useState("admin");
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
  }, [currentRole]);

  const handleClick = (role) => {
    setCurrentRole(role);
    onSelectMenu(role); // Pass the selected setting to the parent component if needed
  };

  return (
    <div className="content-user-menu-container">
      <div className="content-user-menu">
        <h2
          className={`user-menu-option ${
            currentRole === "admin" ? "selected" : ""
          }`}
          onClick={() => handleClick("admin")}
        >
          Admin
        </h2>
        <h2
          className={`user-menu-option ${
            currentRole === "staff" ? "selected" : ""
          }`}
          onClick={() => handleClick("staff")}
        >
          Staff
        </h2>

        <div
          className="active-indicator"
          ref={indicatorRef}
          style={{
            left: `${indicatorPosition.left}px`,
            width: `${indicatorPosition.width}px`,
          }}
        />
      </div>
      <div className="user-body-container">
        <UserBody currentRole={currentRole} />
      </div>
    </div>
  );
};

UserMenu.propTypes = {
  onSelectMenu: PropTypes.func,
};

export default UserMenu;
