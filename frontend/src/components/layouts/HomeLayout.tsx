import { Outlet, useLocation } from "react-router-dom"
import NavDock from "../custom/NavDock"
import { NavDockProvider } from "../../context/NavContext"

const HomeLayout = () => {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard")

  return (
    <NavDockProvider>
      <div className={`flex flex-col justify-between items-center w-screen h-screen p-4 bg-${isDashboard ? "muted" : "background"}`}>
          <Outlet />
          <NavDock />
      </div>
    </NavDockProvider>
  )
}

export default HomeLayout