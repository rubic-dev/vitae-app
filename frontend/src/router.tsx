import { createBrowserRouter, Outlet } from "react-router-dom";
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
import OverviewSession from "./components/pages/dashboard/sessions/OverviewSession";
import StartSession from "./components/pages/dashboard/sessions/StartSession";
import ReviewSession from "./components/pages/dashboard/sessions/ReviewSession";
import UploadNotes from "./components/pages/dashboard/notes/UploadNotes";

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
                element: <><Outlet /></>,
                children: [
                  {
                    index: true,
                    element: <Notes />
                  },
                  {
                    path: "upload",
                    element: <UploadNotes />
                  }
                ]
            },
            {
                path: "sessions",
                element: <Sessions />
            },
            {
                path: "questions",
                element: <><Outlet /></>,
                children: [
                  {
                    index: true,
                    element: <Questions />
                  },
                  {
                    path: "upload",
                    element: <UploadQuestions />
                  }
                ]
            },
            {
                path: "analytics",
                element: <Analytics />
            },
            {
                path: "session",
                element: <><Outlet /></>,
                children: [
                  {
                    path: "create",
                    element: <CreateSession />
                  },
                  {
                    path: "overview",
                    element: <OverviewSession />
                  },
                  {
                    path: "start",
                    element: <StartSession />
                  },
                  {
                    path: "results",
                    element: <ReviewSession />
                  },
                ]
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