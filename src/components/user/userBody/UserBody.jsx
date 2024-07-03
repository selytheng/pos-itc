import { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import "./UserBody.scss";
import { HiDotsVertical } from "react-icons/hi";

const UserBody = ({ currentRole }) => {
  const [users, setUsers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    c_password: "",
    role_id: currentRole === "admin" ? 1 : 2, // Set role based on the menu
  });
  const [editUser, setEditUser] = useState(null); // State for editing a user
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://34.123.7.14/api/auth/allUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentRole, token]);

  useEffect(() => {
    // Update the role_id based on the currentRole prop
    setNewUser((prevUser) => ({
      ...prevUser,
      role_id: currentRole === "admin" ? 1 : 2,
    }));
  }, [currentRole]);

  const filteredUsers = users.filter((user) => {
    return currentRole === "admin" ? user.role_id === 1 : user.role_id === 2;
  });

  const handleDropdownClick = (userId) => {
    setDropdownVisible(userId === dropdownVisible ? null : userId);
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID ${userId}`);
    // Implement delete functionality here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUser) {
      try {
        const response = await fetch(
          `http://34.123.7.14/api/auth/update/${editUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editUser),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === data.id ? data : user))
          );
          setEditUser(null);
        } else {
          console.error("Failed to update user:", await response.json());
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const response = await fetch("http://34.123.7.14/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const data = await response.json();
          setUsers((prevUsers) => [data, ...prevUsers]);
          setNewUser({
            name: "",
            email: "",
            phone_number: "",
            password: "",
            c_password: "",
            role_id: currentRole === "admin" ? 1 : 2,
          });
        } else {
          console.error("Failed to add user:", await response.json());
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setDropdownVisible(null); // Close the dropdown when canceling edit
  };

  return (
    <div className="user-body">
      <table className="user-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Date/Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="user-table-body">
          <tr>
            <td colSpan="6">
              <form onSubmit={handleSubmit} className="add-user-form">
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="c_password"
                    placeholder="Confirm Password"
                    value={newUser.c_password}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="role_id"
                    value={newUser.role_id}
                    onChange={handleInputChange}
                    required
                    disabled
                  >
                    <option value={1}>Admin</option>
                    <option value={2}>Staff</option>
                  </select>
                  <button type="submit" className="submit-button">
                    Add User
                  </button>
                </div>
              </form>
            </td>
          </tr>
          {filteredUsers.map((user) => (
            <Fragment key={user.id}>
              {editUser && editUser.id === user.id ? (
                <tr className="edit-row">
                  <td colSpan="6">
                    <form onSubmit={handleSubmit} className="edit-user-form">
                      <div className="form-row">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={editUser.name}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={editUser.email}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="password"
                          name="password"
                          placeholder="New Password"
                          value={editUser.password}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="password"
                          name="c_password"
                          placeholder="Confirm Password"
                          value={editUser.c_password}
                          onChange={handleInputChange}
                          required
                        />
                        <select
                          name="role_id"
                          value={editUser.role_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value={1}>Admin</option>
                          <option value={2}>Staff</option>
                        </select>
                        <button type="submit" className="submit-button">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="user-id">{user.id}</td>
                  <td>
                    <div className="user-info">
                      <p className="user-name">{user.name}</p>
                      <span className="user-role-id">
                        {user.role_id === 1 ? "Admin" : "Staff"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <p className="user-number">{user.phone_number}</p>
                    <span className="user-email">{user.email}</span>
                  </td>
                  <td>
                    <div className="switch-container">
                      <label className="switch">
                        <input type="checkbox" checked={user.status} readOnly />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <p className="user-create">Create: {user.created_at}</p>
                    <span className="user-edit">Edit: {user.updated_at}</span>
                  </td>
                  <td>
                    <div className="dropdown">
                      <HiDotsVertical
                        className="dropdown-icon"
                        onClick={() => handleDropdownClick(user.id)}
                      />
                      {dropdownVisible === user.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => handleEdit(user)}>Edit</button>
                          <button onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserBody.propTypes = {
  currentRole: PropTypes.string.isRequired,
};

export default UserBody;
