"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"

export function TransactionsPage() {
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
  ]

  const filteredTransactions = transactions.filter((txn) => filter === "all" || txn.action.toLowerCase() === filter)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Transactions</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex space-x-2">
              <Input placeholder="Search symbol..." className="w-48" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell className="font-medium">{txn.symbol}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        txn.action === "Buy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {txn.action}
                    </span>
                  </TableCell>
                  <TableCell>{txn.quantity}</TableCell>
                  <TableCell>${txn.price.toFixed(2)}</TableCell>
                  <TableCell>${txn.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
