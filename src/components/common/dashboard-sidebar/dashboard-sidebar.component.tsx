import Link from "next/link";
import React, { ReactNode } from "react";
import { BookOpenIcon, UserIcon } from "@heroicons/react/24/solid";

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
          {sidebarItems.map((sidebarItem) => (
            <li>
              <Link href={sidebarItem.path}>
                {sidebarItem.icon}
                <span>{sidebarItem.content}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
