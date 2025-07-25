"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

export function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "price_alert",
      title: "AAPL Price Alert",
      message: "Apple stock is up 5.2% today",
      icon: TrendingUp,
      color: "text-neon-green",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "transaction",
      title: "Transaction Successful",
      message: "Bought 50 shares of MSFT",
      icon: CheckCircle,
      color: "text-neon-blue",
      timestamp: new Date(),
    },
  ])

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  // Add a demo notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: 3,
          type: "alert",
          title: "Market Update",
          message: "NASDAQ is up 1.2% today",
          icon: AlertCircle,
          color: "text-neon-purple",
          timestamp: new Date(),
        },
      ])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed top-16 right-2 sm:top-4 sm:right-4 z-50 space-y-2 max-w-xs sm:max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="glass-panel rounded-lg shadow-lg border border-white/10"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <notification.icon className={`h-4 w-4 sm:h-5 sm:w-5 mt-0.5 ${notification.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
                <button
                  className="p-1 rounded-full hover:bg-white/10 flex-shrink-0"
                  onClick={() => dismissNotification(notification.id)}
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
