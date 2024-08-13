import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="break-words user-card flex flex-col justify-center bg-slate-500 w-[45vw] p-4 md:p-5 md:pl-[12vw] mb-3 md:my-3 rounded">
      <h2>
        Name: <span className="text-teal-400">{user.name}</span>
      </h2>
      <p>
        Email: <span className="text-sky-300">{user.email}</span>
      </p>
    </div>
  );
};

export default UserCard;
