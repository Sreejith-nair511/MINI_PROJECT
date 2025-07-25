"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sparkline } from "@/components/ui/sparkline"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HoldingsTableProps {
  onSell: (stock: any) => void
}

export function HoldingsTable({ onSell }: HoldingsTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const holdings = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 50,
      avgPrice: 150.25,
      currentPrice: 175.3,
      pl: 1252.5,
      plPercent: 16.7,
      sparklineData: [150, 155, 153, 158, 165, 170, 175],
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      quantity: 25,
      avgPrice: 2450.0,
      currentPrice: 2680.75,
      pl: 5768.75,
      plPercent: 9.4,
      sparklineData: [2450, 2500, 2480, 2520, 2600, 2650, 2680],
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      quantity: 75,
      avgPrice: 280.5,
      currentPrice: 295.8,
      pl: 1147.5,
      plPercent: 5.5,
      sparklineData: [280, 285, 282, 290, 288, 292, 295],
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      quantity: 30,
      avgPrice: 220.0,
      currentPrice: 195.45,
      pl: -736.5,
      plPercent: -11.2,
      sparklineData: [220, 215, 210, 205, 200, 190, 195],
    },
  ]

  return (
    <div className="glass-card rounded-xl overflow-hidden neon-border-blue">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">My Holdings</h2>

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-3">
          {holdings.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              className="glass-panel rounded-lg p-4 border border-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-lg">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                  <div className="text-sm mt-1">
                    {stock.quantity} shares @ ${stock.avgPrice.toFixed(2)}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-panel">
                    <DropdownMenuItem onClick={() => onSell(stock)} className="text-red-400">
                      Sell Stock
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">${stock.currentPrice.toFixed(2)}</div>
                  <div className={`text-sm flex items-center ${stock.pl >= 0 ? "profit" : "loss"}`}>
                    {stock.pl >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}$
                    {Math.abs(stock.pl).toFixed(2)} ({stock.plPercent >= 0 ? "+" : ""}
                    {stock.plPercent.toFixed(2)}%)
                  </div>
                </div>
                <Sparkline
                  data={stock.sparklineData}
                  width={60}
                  height={30}
                  color={stock.pl >= 0 ? "#10b981" : "#ef4444"}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Symbol</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Qty</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Avg Price</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Current</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">P/L</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Chart</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock, index) => (
                <motion.tr
                  key={stock.symbol}
                  className="border-b border-white/5 hover:bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{stock.quantity}</td>
                  <td className="py-4 px-4">${stock.avgPrice.toFixed(2)}</td>
                  <td className="py-4 px-4">${stock.currentPrice.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <div className={stock.pl >= 0 ? "profit" : "loss"}>
                      <div className="flex items-center">
                        {stock.pl >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}$
                        {Math.abs(stock.pl).toFixed(2)}
                      </div>
                      <div className="text-xs">
                        {stock.plPercent >= 0 ? "+" : ""}
                        {stock.plPercent.toFixed(2)}%
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Sparkline
                      data={stock.sparklineData}
                      width={80}
                      height={30}
                      color={stock.pl >= 0 ? "#10b981" : "#ef4444"}
                    />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-none ${
                        hoveredRow === index ? "shadow-neon-pink" : ""
                      }`}
                      onClick={() => onSell(stock)}
                    >
                      Sell
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
