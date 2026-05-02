import { Outlet } from "react-router-dom"
import NavDock from "../custom/NavDock"

const HomeLayout = () => {
  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen p-4">
        <Outlet />
        <NavDock />
    </div>
  )
}

export default HomeLayout