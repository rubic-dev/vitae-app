import { useState } from "react"
import { Menu, Brain, X, CirclePlus, FileBracesCorner, FileText } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Guide", href: "/dashboard/guide" },
  { label: "Notes", href: "/dashboard/notes" },
]

const NavDock = () => {
  const [currentOpen, setCurrentOpen] = useState(false)
  const [pendingOpen, setPendingOpen] = useState(false)
  const [showChildren, setShowChildren] = useState(true)

  const toggle = () => {
    setPendingOpen(!currentOpen)
    setShowChildren(false)
  }

  const handleExitComplete = () => {
    setCurrentOpen(pendingOpen)
  }

  const handleLayoutComplete = () => {
    if (currentOpen === pendingOpen && !showChildren) {
      setShowChildren(true)
    }
  }

  return (
    <div className="relative inline-flex">
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

      <AnimatePresence>
        {currentOpen && (
          <motion.div
            className="flex flex-col gap-8 p-16 fixed bottom-22 left-1/2 -translate-x-1/2 w-fit rounded-2xl border border-border bg-muted shadow-lg z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="w-fit">
                <div className="text-md font-medium uppercase text-muted-foreground">
                    Home
                </div>
                <div className="flex flex-col gap-2 w-64">
                    {navItems.map((item) => (
                        <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => toggle()}
                        className="rounded-lg text-2xl hover:bg-muted/80"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Link to="/dashboard/sessions/create" className="">
                    <Button className="w-full rounded-xl flex gap-2 text-start">
                        <CirclePlus />
                        Create Session
                    </Button>
                </Link>
                <Link to="/dashboard/questions/upload" className="">
                    <Button className="w-full rounded-xl flex gap-2 text-start" variant="outline">
                        <FileBracesCorner />
                        Upload Questions
                    </Button>
                </Link>
                <Link to="/dashboard/notes/upload" className="">
                    <Button className="w-full rounded-xl flex gap-2 text-start" variant="outline">
                        <FileText />
                        Upload PDF's
                    </Button>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`flex items-center gap-4 p-4 bg-muted rounded-xl z-20 overflow-hidden ${
          currentOpen ? "w-fit" : "w-64"
        }`}
        layout
        transition={{ duration: 0.35, ease: "easeOut" }}
        onLayoutAnimationComplete={handleLayoutComplete}
      >
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          {showChildren ? (
            !currentOpen ? (
              <motion.div
                key="closed"
                className="flex items-center gap-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Brain />
                <button className="text-sm flex-1" onClick={toggle}>
                  NavDock
                </button>
                <Menu />
              </motion.div>
            ) : (
              <motion.button
                key="open"
                className=""
                onClick={toggle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X />
              </motion.button>
            )
          ) : <Brain className="opacity-0" />}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default NavDock