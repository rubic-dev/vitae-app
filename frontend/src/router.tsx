import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "./components/layouts/HomeLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Home from "./components/pages/Home";
import DashboardHome from "./components/pages/dashboard/DashboardHome";
import Guide from "./components/pages/dashboard/Guide";
import Notes from "./components/pages/dashboard/Notes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: "guide",
                element: <Guide />
            },
            {
                path: "notes",
                element: <Notes />
            },
        ]
      },
    ],
  },
]);