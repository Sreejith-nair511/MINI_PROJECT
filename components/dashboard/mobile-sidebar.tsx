"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, LineChart, Receipt, BarChart3, Settings, LogOut, ShieldAlert, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MobileSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

export function MobileSidebar({ activeTab, setActiveTab, isOpen, onClose }: MobileSidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "portfolio", icon: LineChart, label: "Portfolio" },
    { id: "transactions", icon: Receipt, label: "Transactions" },
    { id: "reports", icon: BarChart3, label: "Reports" },
    { id: "admin", icon: ShieldAlert, label: "Admin" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const handleItemClick = (id: string) => {
    setActiveTab(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-md border-r border-white/10 z-50 lg:hidden"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">SmartStock</h1>
                    <p className="text-xs text-muted-foreground">Portfolio Manager</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                      activeTab === item.id
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-white hover:bg-white/5",
                    )}
                    onClick={() => handleItemClick(item.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <motion.button
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
