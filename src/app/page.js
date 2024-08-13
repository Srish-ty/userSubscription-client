"use client";
import Image from "next/image";
import "./globals.css";
import FormContainer from "./components/form";
import NavBar from "./components/navBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <FormContainer />
    </div>
  );
}
