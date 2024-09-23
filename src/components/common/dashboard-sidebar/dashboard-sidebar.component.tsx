"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  BookOpenIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import ButtonForm from "../form/form-fields/button/button-form.component";

type TSidebarItems = {
  path: string;
  icon: ReactNode;
  content: string;
};

const sidebarItems: Array<TSidebarItems> = [
  {
    path: "#",
    icon: <UserIcon />,
    content: "Utilisateurs",
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="dashboard-sidebar-container">
      <div>
        <ul>
          {sidebarItems.map((sidebarItem, index) => (
            <li key={`${sidebarItem}-${index}`}>
              <Link href={sidebarItem.path}>
                {sidebarItem.icon}
                <span>{sidebarItem.content}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <Link onClick={() => signOut()} href="#">
              <ArrowRightEndOnRectangleIcon />
              <span>Déconnexion</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
