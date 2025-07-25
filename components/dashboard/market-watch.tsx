"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkline } from "@/components/ui/sparkline"

interface MarketWatchProps {
  onBuy: (stock: any) => void
}

export function MarketWatch({ onBuy }: MarketWatchProps) {
  const [viewType, setViewType] = useState<"cards" | "table">("cards")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const stocks = [
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 485.2,
      change: 12.45,
      changePercent: 2.63,
      sparklineData: [460, 465, 470, 468, 475, 480, 485],
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 3245.75,
      change: -25.3,
      changePercent: -0.77,
      sparklineData: [3280, 3270, 3260, 3250, 3240, 3235, 3245],
    },
    {
      symbol: "META",
      name: "Meta Platforms",
      price: 325.8,
      change: 8.9,
      changePercent: 2.81,
      sparklineData: [310, 315, 318, 320, 322, 324, 325],
    },
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      price: 445.6,
      change: -5.2,
      changePercent: -1.15,
      sparklineData: [455, 452, 450, 448, 446, 444, 445],
    },
  ]

  return (
    <div className="glass-card rounded-xl overflow-hidden neon-border-purple">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Market Watch</h2>

          <Tabs defaultValue="cards" className="h-8 hidden sm:block">
            <TabsList className="bg-muted/50">
              <TabsTrigger
                value="cards"
                onClick={() => setViewType("cards")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger
                value="table"
                onClick={() => setViewType("table")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Always show cards on mobile, allow toggle on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {stocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              className="glass-panel rounded-lg p-4 border border-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{
                y: -2,
                boxShadow: stock.change >= 0 ? "0 0 15px rgba(16, 185, 129, 0.5)" : "0 0 15px rgba(239, 68, 68, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-base sm:text-lg">{stock.symbol}</h3>
                  <p className="text-xs text-muted-foreground truncate">{stock.name}</p>
                </div>
                <div className={`text-right ${stock.change >= 0 ? "profit" : "loss"}`}>
                  <div className="flex items-center justify-end text-sm">
                    {stock.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {stock.changePercent.toFixed(2)}%
                  </div>
                  <div className="text-xs">
                    {stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xl sm:text-2xl font-bold">${stock.price.toFixed(2)}</div>
                  <div className="mt-2">
                    <Sparkline
                      data={stock.sparklineData}
                      width={60}
                      height={25}
                      color={stock.change >= 0 ? "#10b981" : "#ef4444"}
                    />
                  </div>
                </div>

                <Button
                  size="sm"
                  className={`ml-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white border-none ${
                    hoveredCard === index ? "shadow-neon-green" : ""
                  }`}
                  onClick={() => onBuy(stock)}
                >
                  Buy
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
