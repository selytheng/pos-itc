import { SettingTop, SettingMenu } from "../../components";
import { useState } from "react";

const SettingPage = () => {
  // Retrieve the selected menu from localStorage, default to "general"
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    return savedMenu ? savedMenu : "general";
  });

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    // Save the selected menu to localStorage
    localStorage.setItem("selectedMenu", menu);
  };

  return (
    <div className="content-area">
      <SettingTop />
      <SettingMenu
        onSelectMenu={handleSelectMenu}
        selectedMenu={selectedMenu}
      />
    </div>
  );
};

export default SettingPage;
