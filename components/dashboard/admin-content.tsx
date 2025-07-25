"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export function AdminContent() {
  const [marketOpen, setMarketOpen] = useState(true)
  const [newStock, setNewStock] = useState({
    symbol: "",
    name: "",
    sector: "",
    price: "",
  })
  const { toast } = useToast()

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", portfolio: "$45,230", transactions: 23 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", portfolio: "$67,890", transactions: 31 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", portfolio: "$23,450", transactions: 15 },
  ]

  const handleAddStock = () => {
    if (!newStock.symbol || !newStock.name || !newStock.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Stock added successfully",
      description: `${newStock.symbol} has been added to the market`,
    })

    setNewStock({ symbol: "", name: "", sector: "", price: "" })
  }

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Panel
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Market Controls</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="market-toggle">Market Status</Label>
              <div className="flex items-center space-x-2">
                <span className={marketOpen ? "profit" : "loss"}>{marketOpen ? "Open" : "Closed"}</span>
                <Switch
                  id="market-toggle"
                  checked={marketOpen}
                  onCheckedChange={setMarketOpen}
                  className="data-[state=checked]:bg-neon-green data-[state=checked]:shadow-neon-green"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Add New Stock</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    value={newStock.symbol}
                    onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                    placeholder="AAPL"
                    className="bg-muted/50 border-white/10"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Starting Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
                    placeholder="150.00"
                    className="bg-muted/50 border-white/10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={newStock.name}
                  onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  placeholder="Apple Inc."
                  className="bg-muted/50 border-white/10"
                />
              </div>
              <div>
                <Label htmlFor="sector">Sector</Label>
                <Input
                  id="sector"
                  value={newStock.sector}
                  onChange={(e) => setNewStock({ ...newStock, sector: e.target.value })}
                  placeholder="Technology"
                  className="bg-muted/50 border-white/10"
                />
              </div>
              <Button
                onClick={handleAddStock}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue"
              >
                Add Stock
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="glass-card rounded-xl overflow-hidden neon-border-green"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">User Management</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Portfolio Value</TableHead>
                  <TableHead className="text-muted-foreground">Transactions</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.portfolio}</TableCell>
                    <TableCell>{user.transactions}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neon-blue/50 hover:border-neon-blue hover:shadow-neon-blue bg-transparent"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
