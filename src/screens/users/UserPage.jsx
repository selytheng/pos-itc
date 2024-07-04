import { UserTop, UserMenu } from "../../components";
import { useState } from "react";

const UserPage = () => {
  // Retrieve the selected role from localStorage, default to "admin"
  const [selectedRole, setSelectedRole] = useState(() => {
    const savedRole = localStorage.getItem("selectedRole");
    return savedRole ? savedRole : "admin";
  });

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    // Save the selected role to localStorage
    localStorage.setItem("selectedRole", role);
  };

  return (
    <div className="content-area">
      <UserTop />
      <UserMenu onSelectRole={handleSelectRole} selectedRole={selectedRole} />
    </div>
  );
};

export default UserPage;
