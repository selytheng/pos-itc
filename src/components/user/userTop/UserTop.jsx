import { MdOutlineMenu } from "react-icons/md";
import "./UserTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const UserTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <div className="content-user-top">
      <div className="user-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="user-top-title">Users</h2>
      </div>
      <div className="user-top-r">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </div>
  );
};

export default UserTop;
