import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserMenu.scss";
import UserBody from "../userBody/UserBody";

const UserMenu = ({ onSelectRole, selectedRole }) => {
  const [currentRole, setCurrentRole] = useState(selectedRole);
  const [indicatorPosition, setIndicatorPosition] = useState({
    left: 0,
    width: 0,
  });
  const indicatorRef = useRef(null);

  useEffect(() => {
    // Update the current role when selectedRole changes
    setCurrentRole(selectedRole);
  }, [selectedRole]);

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
    onSelectRole(role); // Pass the selected role to the parent component
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
  onSelectRole: PropTypes.func.isRequired,
  selectedRole: PropTypes.string.isRequired,
};

export default UserMenu;
