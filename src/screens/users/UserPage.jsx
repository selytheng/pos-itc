import { UserTop, UserMenu } from "../../components";
import { useState } from "react";

const UserPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("admin");

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="content-area">
      <UserTop />
      <UserMenu onSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
    </div>
  );
};

export default UserPage;
