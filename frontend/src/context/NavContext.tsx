/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type NavDockContextType = {
  isDashboard: boolean
  currentOpen: boolean
  pendingOpen: boolean
  showChildren: boolean
  toggle: () => void
  handleExitComplete: () => void
  handleLayoutComplete: () => void
}

const NavDockContext = createContext<NavDockContextType | undefined>(undefined)

export const NavDockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

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
    <NavDockContext.Provider
      value={{
        isDashboard,
        currentOpen,
        pendingOpen,
        showChildren,
        toggle,
        handleExitComplete,
        handleLayoutComplete,
      }}
    >
      {children}
    </NavDockContext.Provider>
  )
}

export const useNavDock = () => {
  const context = useContext(NavDockContext)
  if (!context) {
    throw new Error('useNavDock must be used within a NavDockProvider')
  }
  return context
}