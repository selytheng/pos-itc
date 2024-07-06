import PropTypes from "prop-types";
import "./ToggleButton.scss";

const ToggleButton = ({ isOn, onToggle }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isOn} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
};

ToggleButton.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleButton;
