import { Outlet, useLocation } from "react-router-dom"
import NavDock from "../custom/NavDock"
import { NavDockProvider } from "../../context/NavContext"
import { ThemeProvider } from "../../context/ThemeContext"
import { SidebarProvider } from "../../context/SidebarContext"

const HomeLayout = () => {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard")

  return (
    <NavDockProvider>
      <div className={`flex flex-col justify-between items-center w-screen h-screen p-4 bg-${isDashboard ? "muted" : "background"}`}>
          <SidebarProvider>
            <ThemeProvider>
              <Outlet />
            </ThemeProvider>
          </SidebarProvider>
          <NavDock />
      </div>
    </NavDockProvider>
  )
}

export default HomeLayout