"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

export function OverviewCards() {
  const stats = [
    {
      title: "Total Balance",
      value: "$125,430.50",
      change: "+2.5%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Portfolio Value",
      value: "$98,750.25",
      change: "+5.2%",
      isPositive: true,
      icon: PieChart,
    },
    {
      title: "Today's Gain/Loss",
      value: "+$2,340.75",
      change: "+1.8%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Total Invested",
      value: "$85,200.00",
      change: "Base amount",
      isPositive: null,
      icon: TrendingDown,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.isPositive === true
                  ? "text-green-600 dark:text-green-400"
                  : stat.isPositive === false
                    ? "text-red-600 dark:text-red-400"
                    : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
