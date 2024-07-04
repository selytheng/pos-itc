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

  const generalSettings = [
    "About",
    "Account",
    "Software Update",
    "Storage",
    "Language & Region",
    "Date & Time",
    "Location",
  ];

  const displaySettings = [
    {
      label: "Font Size",
      value: fontSize,
      onChange: handleFontSizeChange,
      options: ["12px", "14px", "16px", "18px", "20px"],
    },
    {
      label: "Icon Size",
      value: iconSize,
      onChange: handleIconSizeChange,
      options: ["12px", "14px", "16px", "18px", "20px"],
    },
    {
      label: "Refresh Rate",
      value: refreshRate,
      onChange: handleRefreshRateChange,
      options: ["30hz", "60hz", "120hz", "240hz"],
    },
  ];

  return (
    <div className="setting-body">
      {currentSetting === "general" && (
        <div className="display-settings">
          {generalSettings.map((setting, index) => (
            <div className="setting" key={index}>
              <div className="setting-function">{setting}</div>
              <div className="setting-arrow-function">
                <MdChevronRight />
              </div>
            </div>
          ))}
        </div>
      )}
      {currentSetting === "display" && (
        <div className="display-settings">
          {displaySettings.map((setting, index) => (
            <div className="setting" key={index}>
              <div className="setting-function">{setting.label}</div>
              <div className="option-dropdown">
                <select
                  value={setting.value}
                  onChange={setting.onChange}
                  className="option-select"
                >
                  {setting.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
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
