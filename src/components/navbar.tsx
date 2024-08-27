import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "Add Course",
    url: "/add-courses",
  },
  {
    name: "Add Instance",
    url: "/add-instance",
  },
  {
    name: "List Instances",
    url: "/list-instances",
  },
];

const Navbar = () => {
  return (
    <nav className="flex flex-row p-2 justify-between items-center">
      <div className="flex flex-row justify-center items-center gap-4">
        <img src="/logo.png" alt="IIT Bombay" className="h-16 w-16" />
        <span className="text-xl uppercase">Courses</span>
      </div>
      <div>
        <ul className="flex flex-row gap-4">
          {links.map((link) => (
            <li key={link.url} className="hover:text-secondary transition-all">
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
