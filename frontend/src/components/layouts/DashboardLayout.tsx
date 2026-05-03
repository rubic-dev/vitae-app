import { Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react"
import { NavDockProvider, useNavDock } from "../../context/NavContext"
import { 
  Brain,
  CirclePlus,
  FileBracesCorner,
  LayoutDashboard,
  FileSpreadsheet,
  FileQuestionMark,
  BookText,
  NotebookPen,
  ChartArea,
} from "lucide-react"
import { Button } from "../ui/button";

const DashboardLayout = () => {
  const { currentOpen, toggle } = useNavDock()

  const navItems = [
    {
      category: "Home",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size="20" strokeWidth="1.5" /> },
        { label: "Guide", href: "/dashboard/guide", icon: <BookText size="20" strokeWidth="1.5" /> },
        { label: "Notes", href: "/dashboard/notes", icon: <NotebookPen size="20" strokeWidth="1.5" /> },
      ]
    },
    {
      category: "Data",
      items: [
        { label: "Sessions", href: "/dashboard/sessions", icon: <FileSpreadsheet size="20" strokeWidth="1.5" /> },
        { label: "Questions", href: "/dashboard/questions", icon: <FileQuestionMark size="20" strokeWidth="1.5" /> },
        { label: "Analytics", href: "/dashboard/analytics", icon: <ChartArea size="20" strokeWidth="1.5" /> },
      ]
    }
  ]
  
  return (
    <NavDockProvider>
      <div className="flex gap-2 w-screen h-screen px-4">
        <AnimatePresence>
          {
              currentOpen && (
                  <motion.div
                      className="fixed top-0 left-0 w-full h-full bg-foreground/20 z-10"
                      onClick={() => toggle()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                  />
              )
          }
        </AnimatePresence>
        <div className="h-full w-[16rem] flex flex-col gap-2">
          <div className="w-full p-3 rounded-xl flex gap-3 items-center hover:bg-background cursor-pointer transition-all duration-150">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <Brain size="24" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-medium">Vitae</h1>
              <h1 className="text-[12px]">Your academic damage report</h1>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Link to="/dashboard/sessions/create" className="flex-1">
              <Button className="rounded-xl w-full flex gap-2 text-start">
                <CirclePlus />
                Create Session
              </Button>
            </Link>
            <Link to="/dashboard/questions/upload">
              <Button size="icon" className="rounded-xl" variant="outline">
                <FileBracesCorner />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 px-3">
            {
              navItems.map((section) => {
                return (
                  <div className="flex flex-col" key={section.category}>
                    <h1 className="text-sm text-muted-foreground font-medium py-2">{section.category}</h1>
                    {
                      section.items.map((item) => {
                        return (
                          <Link 
                            className="flex gap-2 items-center w-full hover:bg-background p-1 rounded-md transition-all duration-300"
                            to={item.href}
                            key={item.href}
                          >
                            { item.icon }
                            { item.label }
                          </Link>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="h-full w-full flex-1 rounded-xl bg-background p-8">
          <Outlet />
        </div>
      </div>
    </NavDockProvider>
  )
}

export default DashboardLayout