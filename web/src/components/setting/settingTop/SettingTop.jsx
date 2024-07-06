import { MdOutlineMenu } from "react-icons/md";
import "./SettingTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const SettingTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <div className="content-setting-top">
      <div className="setting-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="setting-top-title">Settings</h2>
      </div>
      <div className="setting-top-r">
        <input type="text" placeholder="search..." className="search-input" />
      </div>
    </div>
  );
};

export default SettingTop;
