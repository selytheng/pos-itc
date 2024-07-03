import { SettingTop, SettingMenu } from "../../components";
import { useState } from "react";

const SettingPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("general");

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
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
