"use client";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/userCard";
import AddEditUserForm from "./editForm";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://usersubscription-assignment-1.onrender.com/asdf/admin"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(
        `https://usersubscription-assignment-1.onrender.com/asdf/admin/${userId}`,
        {
          method: "DELETE",
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    // Re-fetch users
    try {
      const response = await fetch(
        "https://usersubscription-assignment-1.onrender.com/asdf/admin"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mx-20 my-3">Subscribed Users:</h1>
      <button
        onClick={handleAddUser}
        className="bg-slate-600 w-[30vw] sm:w-[20vw] lg:w-[10vw] py-2 px-3 rounded-lg m-auto"
      >
        Add User +
      </button>
      {showForm && (
        <AddEditUserForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <div className="user-cards-container flex flex-col justify-center items-center mx-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center flex-col-reverse md:flex-row"
          >
            <UserCard user={user} />
            <div className="w-[32vw] md:w-auto flex flex-row md:flex-col mt-2 justify-between">
              <button onClick={() => handleEditUser(user)}>
                <EditIcon />
              </button>
              <button onClick={() => handleDeleteUser(user._id)}>
                <DeleteForeverIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
