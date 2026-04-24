import "toastify-js/src/toastify.css";

import { Kanit } from "next/font/google";
import { MenuItem } from "@/types/layout/sidebar";
import Sidebar from "@/components/Layout/sidebar";
import Navbar from "@/components/Layout/navbar";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["400", "700"],
  variable: "--font-kanit",
});

const myMenu: MenuItem[] = [
  { title: "รายการตู้เย็น", icon: "home", href: "/main/fridge" },
  // {
  //   title: "Management",
  //   icon: "users",
  //   subMenu: [
  //     { title: "User List", href: "/users" },
  //     { title: "Permissions", href: "/permissions" },
  //   ],
  // },
  {
    title: "Board Lib components",
    icon: "LayoutDashboard",
    href: "/lib",
  },
  {
    title: "ตั้งค่าตู้เย็น",
    icon: "LayoutDashboard",
    href: "/main/nonti",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${kanit.variable} min-h-screen w-full `}>
      <Sidebar menuItems={myMenu} />

      <div className="min-h-screen lg:pl-64">
        <div className="flex min-h-screen flex-col ">
          <div className="w-full">
            <Navbar />
          </div>

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
