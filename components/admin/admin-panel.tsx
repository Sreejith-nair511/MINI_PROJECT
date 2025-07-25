"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function AdminPanel() {
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
      <h2 className="text-3xl font-bold">Admin Panel</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="market-toggle">Market Status</Label>
              <div className="flex items-center space-x-2">
                <span className={marketOpen ? "text-green-600" : "text-red-600"}>{marketOpen ? "Open" : "Closed"}</span>
                <Switch id="market-toggle" checked={marketOpen} onCheckedChange={setMarketOpen} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                  placeholder="AAPL"
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
              />
            </div>
            <div>
              <Label htmlFor="sector">Sector</Label>
              <Input
                id="sector"
                value={newStock.sector}
                onChange={(e) => setNewStock({ ...newStock, sector: e.target.value })}
                placeholder="Technology"
              />
            </div>
            <Button onClick={handleAddStock} className="w-full">
              Add Stock
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Portfolio Value</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.portfolio}</TableCell>
                  <TableCell>{user.transactions}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
