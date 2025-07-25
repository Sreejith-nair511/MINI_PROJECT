"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, LineChart, Receipt, BarChart3, Settings, LogOut, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "portfolio", icon: LineChart, label: "Portfolio" },
    { id: "transactions", icon: Receipt, label: "Transactions" },
    { id: "reports", icon: BarChart3, label: "Reports" },
    { id: "admin", icon: ShieldAlert, label: "Admin" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <motion.div
      className="w-20 bg-card/30 backdrop-blur-md border-r border-white/5 flex flex-col items-center py-8"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10">
        <motion.div
          className="h-12 w-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white font-bold text-xl">S</span>
        </motion.div>
      </div>

      <nav className="flex-1 w-full flex flex-col items-center space-y-6">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            className={cn(
              "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              activeTab === item.id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-white",
            )}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {activeTab === item.id && (
              <motion.div
                className="absolute inset-0 rounded-xl border border-primary/50 shadow-neon-purple"
                layoutId="activeTab"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <item.icon className="h-5 w-5" />

            <div className="absolute left-full ml-2 px-2 py-1 rounded bg-card/80 backdrop-blur-sm text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {item.label}
            </div>
          </motion.button>
        ))}
      </nav>

      <motion.button
        className="w-12 h-12 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LogOut className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}
