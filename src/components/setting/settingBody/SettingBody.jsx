import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ToggleButton from "../../toggle/ToggleButton";
import "./SettingBody.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { DARK_THEME } from "../../../constants/themeConstants";
import { MdChevronRight } from "react-icons/md";

const SettingBody = ({ currentSetting }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Determine the toggle state based on the current theme
  const isDarkMode = theme === DARK_THEME;
  const [isOn, setIsOn] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [iconSize, setIconSize] = useState("16px");
  const [refreshRate, setRefreshRate] = useState("120hz");

  // Handle theme toggling
  const handleToggleTheme = () => {
    toggleTheme(); // Toggle theme using context method
  };

  // Handle default toggling
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  // Handle font size
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  // Handle icon size
  const handleIconSizeChange = (event) => {
    setIconSize(event.target.value);
  };

  // Handle refresh rate
  const handleRefreshRateChange = (event) => {
    setRefreshRate(event.target.value);
  };

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className="setting-body">
      {currentSetting === "general" && (
        <div className="display-settings">
          <div className="setting">
            <div className="setting-function">About</div>
            <div className="setting-arrow-function">
              <MdChevronRight />
            </div>
          </div>
          <div className="setting">
            <div className="setting-function">Software Update</div>
            <div className="setting-arrow-function">
              <MdChevronRight />
            </div>
          </div>
          <div className="setting">
            <div className="setting-function">Storage</div>
            <div className="setting-arrow-function">
              <MdChevronRight />
            </div>
          </div>
          <div className="setting">
            <div className="setting-function">Language & Region</div>
            <div className="setting-arrow-function">
              <MdChevronRight />
            </div>
          </div>
          <div className="setting">
            <div className="setting-function">Date & Time</div>
            <div className="setting-arrow-function">
              <MdChevronRight />
            </div>
          </div>
        </div>
      )}
      {currentSetting === "display" && (
        <div className="display-settings">
          <div className="setting">
            <div className="setting-function">Font Size</div>
            <div className="option-dropdown">
              <select
                value={fontSize}
                onChange={handleFontSizeChange}
                className="option-select"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
              </select>
            </div>
          </div>
          <div className="setting">
            <div className="setting-function">Icon Size</div>
            <div className="option-dropdown">
              <select
                value={iconSize}
                onChange={handleIconSizeChange}
                className="option-select"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
              </select>
            </div>
          </div>
          <div className="setting">
            <div className="setting-function">Refresh Rate</div>
            <div className="option-dropdown">
              <select
                value={refreshRate}
                onChange={handleRefreshRateChange}
                className="option-select"
              >
                <option value="12px">30hz</option>
                <option value="14px">60hz</option>
                <option value="16px">120hz</option>
                <option value="18px">240hz</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {currentSetting === "appearance" && (
        <div className="display-settings">
          <div className="setting">
            <div className="setting-function">Dark Mode</div>
            <ToggleButton isOn={isDarkMode} onToggle={handleToggleTheme} />
          </div>
        </div>
      )}
      {currentSetting === "sound" && (
        <div className="display-settings">
          <div className="setting">
            <div className="setting-function">Sound</div>
            <ToggleButton isOn={!isOn} onToggle={handleToggle} />
          </div>
        </div>
      )}
      {currentSetting === "notification" && (
        <div className="display-settings">
          <div className="setting">
            <div className="setting-function">Notification</div>
            <ToggleButton isOn={!isOn} onToggle={handleToggle} />
          </div>
        </div>
      )}
    </div>
  );
};

SettingBody.propTypes = {
  currentSetting: PropTypes.string.isRequired,
};

export default SettingBody;
