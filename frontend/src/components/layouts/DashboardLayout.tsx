import { Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useNavDock } from "../../context/NavContext";
import { useSidebar } from "../../context/SidebarContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Sidebar,
  Brain,
  CirclePlus,
  FileBracesCorner,
  LayoutDashboard,
  FileSpreadsheet,
  FileQuestionMark,
  BookText,
  NotebookPen,
  ChartArea,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "../ui/button";

const DashboardLayout = () => {
  const { currentOpen, toggle } = useNavDock();
  const { isOpen, toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    {
      category: "Home",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <LayoutDashboard size="16" strokeWidth="1.75" />,
        },
        {
          label: "Guide",
          href: "/dashboard/guide",
          icon: <BookText size="16" strokeWidth="1.75" />,
        },
        {
          label: "Notes",
          href: "/dashboard/notes",
          icon: <NotebookPen size="16" strokeWidth="1.75" />,
        },
      ],
    },
    {
      category: "Data",
      items: [
        {
          label: "Sessions",
          href: "/dashboard/sessions",
          icon: <FileSpreadsheet size="16" strokeWidth="1.75" />,
        },
        {
          label: "Questions",
          href: "/dashboard/questions",
          icon: <FileQuestionMark size="16" strokeWidth="1.75" />,
        },
        {
          label: "Analytics",
          href: "/dashboard/analytics",
          icon: <ChartArea size="16" strokeWidth="1.75" />,
        },
      ],
    },
  ];

  return (
    <div className="flex gap-2 w-full h-screen overflow-hidden">
      {/* Overlay */}
      <AnimatePresence>
        {currentOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-foreground/20 z-10"
            onClick={() => toggle()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? "16rem" : "0rem",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: isOpen ? 0 : 0.2,
        }}
        className="h-screen overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            x: isOpen ? 0 : -10,
          }}
          transition={{
            duration: 0.2,
            delay: isOpen ? 0.2 : 0,
          }}
          className="flex flex-col gap-2"
        >
          {/* Header */}
          <div className="w-full p-3 rounded-xl flex gap-3 items-center hover:bg-background cursor-pointer transition-all duration-150">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <Brain size="24" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-medium">Vitae</h1>
              <h1 className="text-[12px]">
                Your academic damage report
              </h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full">
            <Link to="/dashboard/sessions/create" className="flex-1">
              <Button className="rounded-xl w-full flex gap-2 text-start">
                <CirclePlus />
                Create Session
              </Button>
            </Link>

            <Link to="/dashboard/questions/upload">
              <Button
                size="icon"
                className="rounded-xl"
                variant="outline"
              >
                <FileBracesCorner />
              </Button>
            </Link>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4 px-3">
            {navItems.map((section) => (
              <div className="flex flex-col" key={section.category}>
                <h1 className="text-sm text-muted-foreground font-medium py-2">
                  {section.category}
                </h1>

                {section.items.map((item) => (
                  <Link
                    className="flex gap-2 items-center font-medium w-full hover:bg-background p-1 rounded-md transition-all duration-300"
                    to={item.href}
                    key={item.href}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.aside>

      {/* Content */}
      <div className="h-full flex-1 min-w-0 rounded-xl bg-background px-8 flex flex-col">
        <div className="w-full flex justify-between py-4 border-b-2 border-muted">
          <Button
            size="icon"
            variant="outline"
            onClick={toggleSidebar}
            className="rounded-xl"
          >
            <Sidebar size="20" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {
              theme === "dark" ?
                <Sun size="20" />
                :
                <Moon size="20" />
            }
          </Button>
        </div>
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;