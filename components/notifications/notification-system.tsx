"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, TrendingUp, CheckCircle } from "lucide-react"

export function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "price_alert",
      title: "AAPL Price Alert",
      message: "Apple stock is up 5.2% today",
      icon: TrendingUp,
      color: "text-green-600",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "transaction",
      title: "Transaction Successful",
      message: "Bought 50 shares of MSFT",
      icon: CheckCircle,
      color: "text-blue-600",
      timestamp: new Date(),
    },
  ])

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Card key={notification.id} className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <notification.icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
