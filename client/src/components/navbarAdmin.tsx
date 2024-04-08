import Link from "next/link";
import React from "react";
import { FaUserCog } from "react-icons/fa";

interface AdminLink {
  title: string;
  href: string;
}

interface AdminNavbarProps {
  brand?: string;
  links?: AdminLink[];
  actionButtonTitle?: string;
}

const adminLinks: AdminLink[] = [
  //   { title: "Dashboard", href: "/admin/dashboard" },
  //   { title: "Users", href: "/admin/users" },
  //   { title: "Settings", href: "/admin/settings" },
];

export default function AdminNavbar({
  brand = "Ticketing.com - Admin Dashboard",
  links = adminLinks,
  actionButtonTitle = "Logout",
}: AdminNavbarProps) {
  return (
    <nav className="sticky top-0 z-30 w-full bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-lg font-bold">{brand}</span>
          </div>
          <div className="flex items-center space-x-4">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                <span className="text-white hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  {link.title}
                </span>
              </Link>
            ))}
            <FaUserCog className="text-white hover:text-green-500 mx-3 text-lg" />
            <Link
              className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white text-sm px-4 py-2 rounded-md cursor-pointer"
              onClick={() => {}}
              href={"/home"}
            >
              {actionButtonTitle}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
