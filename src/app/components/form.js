"use client";
import React, { useState } from "react";
import { formData } from "../config/formData";

const FormContainer = () => {
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });

    console.log(userData);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = formData.email;

    if (!emailPattern.test(userData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }
    console.log("Form submitted", userData);
    try {
      const response = await fetch(
        "https://usersubscription-assignment-1.onrender.com/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.text();
      setSuccessMessage("Form submitted successfully!");
      setErrorMessage("");
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error submitting the form.");
    }
  };

  return (
    <div className="w-[80%] sm:w-[50vw] bg-slate-700 my-[6vw] mx-auto py-8 px-2 md:p-10 flex flex-col items-center justify-between rounded-lg">
      <h1>Form Container</h1>
      <form className="py-6 h-[65vw] sm:h-[35vw] md:h-[20vw] flex flex-col items-center justify-between">
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="text-slate-800 my-4 w-[100%]"
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="text-slate-800 my-4 w-[100%]"
          />
        </label>
        <span className={errorMessage ? "text-red-500" : "text-green-400"}>
          {errorMessage.length > 0 ? errorMessage : successMessage}
        </span>
        <button
          className="block bg-slate-400 px-5 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
