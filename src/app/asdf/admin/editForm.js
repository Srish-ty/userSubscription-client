"use client";
import React, { useState, useEffect } from "react";

const AddEditUserForm = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await fetch(
          `https://usersubscription-assignment-1.onrender.com/asdf/admin/${user._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
          }
        );
      } else {
        await fetch(
          "https://usersubscription-assignment-1.onrender.com/asdf/admin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
          }
        );
      }
      onSave();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-200 text-slate-900 flex flex-col items-center w-[50vw] p-5 my-2 m-auto"
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        className="bg-slate-500 rounded px-3 my-1 text-white"
      >
        {user ? "Update" : "Add"} User
      </button>
      <button
        type="button"
        className="bg-slate-500 rounded px-3 my-1 text-white"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddEditUserForm;
