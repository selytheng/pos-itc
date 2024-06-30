import React from "react";
import "../user/User.scss";
import user_pic from "../../assets/images/hacker.png";
import { HiDotsVertical } from "react-icons/hi";

const users = [
  {
    id: 1,
    name: "POM MOUYLANG",
    role: "Admin",
    contact: "069310609",
    email: "mouylangpom@gmail.com",
    status: true,
    created: "2024-06-10 13:30:30",
    edited: "2024-06-10 13:30:30",
  },
  {
    id: 1,
    name: "Serey vichea",
    role: "Admin",
    contact: "0123456789",
    email: "sereyvichea@gmail.com",
    status: true,
    created: "2024-06-10 13:30:30",
    edited: "2024-06-10 13:30:30",
  },
  {
    id: 1,
    name: "Lyhab Rithyny",
    role: "Admin",
    contact: "0123456789",
    email: "lyhabrithyny@gmail.com",
    status: true,
    created: "2024-06-10 13:30:30",
    edited: "2024-06-10 13:30:30",
  },
  {
    id: 1,
    name: "Se LyTheng",
    role: "Admin",
    contact: "0123456789",
    email: "selytheng@gmail.com",
    status: true,
    created: "2024-06-10 13:30:30",
    edited: "2024-06-10 13:30:30",
  },
  // Add more user objects as needed
];

const UsersPage = () => {
  return (
    <div className="users-page">
      <header>
        <h1>Users</h1>
        <div className="search-add">
          <input type="text" placeholder="Search for food, meat..." />
          <button className="add-button">Add</button>
        </div>
      </header>
      <table className="users-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Date/Time</th>
            <th>
              <HiDotsVertical />
            </th>
          </tr>
        </thead>
        <tbody style={{ marginTop: 20 }}>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                <div className="user-info">
                  <img src={user_pic} alt="User Avatar" />
                  <div>
                    <p>{user.name}</p>
                    <span>{user.role}</span>
                  </div>
                </div>
              </td>
              <td>
                <p>{user.contact}</p>
                <span>{user.email}</span>
              </td>
              <td>
                <label className="switch">
                  <input type="checkbox" checked={user.status} />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>
                <p>Create: {user.created}</p>
                <span>Edit: {user.edited}</span>
              </td>
              <td>
                <HiDotsVertical />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
