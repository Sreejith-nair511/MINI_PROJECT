"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TransactionsContent() {
  const [filter, setFilter] = useState("all")

  const transactions = [
    {
      id: "TXN001",
      date: "2024-01-15",
      symbol: "AAPL",
      action: "Buy",
      quantity: 50,
      price: 150.25,
      total: 7512.5,
    },
    {
      id: "TXN002",
      date: "2024-01-14",
      symbol: "GOOGL",
      action: "Buy",
      quantity: 25,
      price: 2450.0,
      total: 61250.0,
    },
    {
      id: "TXN003",
      date: "2024-01-13",
      symbol: "MSFT",
      action: "Sell",
      quantity: 25,
      price: 295.8,
      total: 7395.0,
    },
    {
      id: "TXN004",
      date: "2024-01-12",
      symbol: "TSLA",
      action: "Buy",
      quantity: 30,
      price: 220.0,
      total: 6600.0,
    },
    {
      id: "TXN005",
      date: "2024-01-10",
      symbol: "FUND",
      action: "Add",
      quantity: 1,
      price: 10000.0,
      total: 10000.0,
    },
  ]

  const filteredTransactions = transactions.filter(
    (txn) => filter === "all" || txn.action.toLowerCase() === filter.toLowerCase(),
  )

  return (
    <div className="space-y-6">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold">Transactions</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </motion.div>

      <motion.div
        className="glass-card rounded-xl overflow-hidden neon-border-blue"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl font-bold">Transaction History</h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search symbol..." className="pl-9 bg-muted/50 border-white/10 w-full sm:w-48" />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Date range" className="pl-9 bg-muted/50 border-white/10 w-full sm:w-40" />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-32 bg-muted/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                    <SelectItem value="add">Add Funds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Symbol</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Price</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn, index) => (
                  <motion.tr
                    key={txn.id}
                    className="border-b border-white/5 hover:bg-white/5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4">{txn.date}</td>
                    <td className="py-4 px-4 font-medium">{txn.symbol}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          txn.action === "Buy"
                            ? "bg-green-500/20 text-green-400"
                            : txn.action === "Sell"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {txn.action}
                      </span>
                    </td>
                    <td className="py-4 px-4">{txn.quantity}</td>
                    <td className="py-4 px-4">${txn.price.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right">${txn.total.toFixed(2)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
