import React from "react";
import { navData } from "../config/navData";

const NavBar = () => {
  return (
    <nav className="bg-slate-900 py-3 px-20">
      <ul className="flex flex-col sm:flex-row justify-between mx-10">
        {navData.map((item) => (
          <li key={item.id} className="text-center">
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
