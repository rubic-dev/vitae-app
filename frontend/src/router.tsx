import { createBrowserRouter } from "react-router-dom";
import { SidebarProvider } from './context/SidebarContext'
import { ThemeProvider } from "./context/ThemeContext"

import HomeLayout from "./components/layouts/HomeLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import NotFound from "./components/pages/NotFound";

import Home from "./components/pages/Home";
import DashboardHome from "./components/pages/dashboard/DashboardHome";
import Guide from "./components/pages/dashboard/Guide";
import Notes from "./components/pages/dashboard/Notes";
import Sessions from "./components/pages/dashboard/Sessions";
import Questions from "./components/pages/dashboard/Questions";
import Analytics from "./components/pages/dashboard/Analytics";
import CreateSession from "./components/pages/dashboard/sessions/CreateSession";
import UploadQuestions from "./components/pages/dashboard/questions/UploadQuestions";

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
        element: <SidebarProvider><DashboardLayout /></SidebarProvider>,
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
            {
                path: "sessions",
                element: <Sessions />
            },
            {
                path: "questions",
                element: <Questions />
            },
            {
                path: "analytics",
                element: <Analytics />
            },
            {
                path: "sessions/create",
                element: <CreateSession />
            },
            {
                path: "questions/upload",
                element: <UploadQuestions />
            },
        ]
      },
    ],
  },
  {
    path: "*",
    element: <ThemeProvider><NotFound /></ThemeProvider>,
  }
]);