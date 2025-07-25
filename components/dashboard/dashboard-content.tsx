"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, ArrowDown, TrendingUp, Wallet, Eye, EyeOff } from "lucide-react"
import { HoldingsTable } from "@/components/dashboard/holdings-table"
import { MarketWatch } from "@/components/dashboard/market-watch"
import { CountUp } from "@/components/ui/count-up"
import { Button } from "@/components/ui/button"

interface DashboardContentProps {
  onBuy: (stock: any) => void
  onSell: (stock: any) => void
}

export function DashboardContent({ onBuy, onSell }: DashboardContentProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const stats = [
    {
      title: "Total Balance",
      value: 125430.5,
      change: "+2.5%",
      isPositive: true,
      icon: Wallet,
      color: "blue",
      sensitive: true,
    },
    {
      title: "Portfolio Value",
      value: 98750.25,
      change: "+5.2%",
      isPositive: true,
      icon: TrendingUp,
      color: "purple",
      sensitive: true,
    },
    {
      title: "Today's Gain/Loss",
      value: 2340.75,
      change: "+1.8%",
      isPositive: true,
      icon: ArrowUp,
      color: "green",
      sensitive: true,
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Balance visibility toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setBalanceVisible(!balanceVisible)}
          className="text-muted-foreground hover:text-foreground"
        >
          {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{balanceVisible ? "Hide" : "Show"} Balance</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <AnimatePresence>
          {isLoaded &&
            stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`glass-card rounded-xl overflow-hidden neon-border-${stat.color} relative`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -2,
                  boxShadow: `0 0 20px rgb(59 130 246 / 0.3)`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</h3>
                    <div className={`p-2 rounded-lg bg-neon-${stat.color}/10`}>
                      <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-neon-${stat.color}`} />
                    </div>
                  </div>

                  <div className="flex items-baseline space-x-1 sm:space-x-2">
                    <span className="text-lg sm:text-2xl font-bold">$</span>
                    {balanceVisible ? (
                      <CountUp end={stat.value} decimals={2} className="text-xl sm:text-2xl lg:text-3xl font-bold" />
                    ) : (
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold">••••••</span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center">
                    {stat.isPositive ? (
                      <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-neon-green mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-destructive mr-1" />
                    )}
                    <span className={`text-xs sm:text-sm ${stat.isPositive ? "profit" : "loss"}`}>
                      {balanceVisible ? stat.change : "••••"}
                    </span>
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Holdings and Market Watch */}
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-1 xl:grid-cols-2 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <HoldingsTable onSell={onSell} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MarketWatch onBuy={onBuy} />
        </motion.div>
      </div>
    </div>
  )
}
