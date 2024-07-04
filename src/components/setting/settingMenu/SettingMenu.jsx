import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./SettingMenu.scss";
import SettingBody from "../settingBody/SettingBody";

const SettingMenu = ({ onSelectMenu, selectedMenu }) => {
  const [currentSetting, setCurrentSetting] = useState(selectedMenu);
  const [indicatorPosition, setIndicatorPosition] = useState({
    left: 0,
    width: 0,
  });
  const indicatorRef = useRef(null);

  useEffect(() => {
    // Update the current setting when selectedMenu changes
    setCurrentSetting(selectedMenu);
  }, [selectedMenu]);

  useEffect(() => {
    const activeItem = indicatorRef.current;
    const selectedItem = activeItem.parentElement.querySelector(".selected");

    if (selectedItem) {
      const positionLeft = selectedItem.offsetLeft;
      const width = selectedItem.offsetWidth;
      setIndicatorPosition({ left: positionLeft, width: width });
    }
  }, [currentSetting]);

  const handleClick = (setting) => {
    setCurrentSetting(setting);
    onSelectMenu(setting); // Pass the selected setting to the parent component
  };

  return (
    <div className="content-setting-menu-container">
      <div className="content-setting-menu">
        <h2
          className={`setting-menu-option ${
            currentSetting === "general" ? "selected" : ""
          }`}
          onClick={() => handleClick("general")}
        >
          General
        </h2>
        <h2
          className={`setting-menu-option ${
            currentSetting === "display" ? "selected" : ""
          }`}
          onClick={() => handleClick("display")}
        >
          Display
        </h2>
        <h2
          className={`setting-menu-option ${
            currentSetting === "appearance" ? "selected" : ""
          }`}
          onClick={() => handleClick("appearance")}
        >
          Appearance
        </h2>
        <h2
          className={`setting-menu-option ${
            currentSetting === "sound" ? "selected" : ""
          }`}
          onClick={() => handleClick("sound")}
        >
          Sound
        </h2>
        <h2
          className={`setting-menu-option ${
            currentSetting === "history" ? "selected" : ""
          }`}
          onClick={() => handleClick("history")}
        >
          History
        </h2>
        <h2
          className={`setting-menu-option ${
            currentSetting === "notification" ? "selected" : ""
          }`}
          onClick={() => handleClick("notification")}
        >
          Notification
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
      <div className="setting-body">
        <SettingBody currentSetting={currentSetting} />
      </div>
    </div>
  );
};

SettingMenu.propTypes = {
  onSelectMenu: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired,
};

export default SettingMenu;
