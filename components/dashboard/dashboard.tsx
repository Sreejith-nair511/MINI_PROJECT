"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { DesktopSidebar } from "@/components/dashboard/desktop-sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { PortfolioContent } from "@/components/dashboard/portfolio-content"
import { TransactionsContent } from "@/components/dashboard/transactions-content"
import { ReportsContent } from "@/components/dashboard/reports-content"
import { AdminContent } from "@/components/dashboard/admin-content"
import { SettingsContent } from "@/components/dashboard/settings-content"
import { NotificationSystem } from "@/components/dashboard/notification-system"
import { BuySellModal } from "@/components/dashboard/buy-sell-modal"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"buy" | "sell">("buy")
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleBuy = (stock: any) => {
    setSelectedStock(stock)
    setModalType("buy")
    setModalOpen(true)
  }

  const handleSell = (stock: any) => {
    setSelectedStock(stock)
    setModalType("sell")
    setModalOpen(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent onBuy={handleBuy} onSell={handleSell} />
      case "portfolio":
        return <PortfolioContent onSell={handleSell} />
      case "transactions":
        return <TransactionsContent />
      case "reports":
        return <ReportsContent />
      case "admin":
        return <AdminContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent onBuy={handleBuy} onSell={handleSell} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background cyber-grid-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />

        <motion.main
          className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.main>
      </div>

      <NotificationSystem />

      {modalOpen && (
        <BuySellModal type={modalType} stock={selectedStock} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}
