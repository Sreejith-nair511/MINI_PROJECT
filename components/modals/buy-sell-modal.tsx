"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface BuySellModalProps {
  stock: any
  type: "buy" | "sell"
  onClose: () => void
}

export function BuySellModal({ stock, type, onClose }: BuySellModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const currentPrice = stock.price || stock.currentPrice
  const totalCost = quantity * currentPrice
  const fee = totalCost * 0.001 // 0.1% fee
  const finalAmount = totalCost + fee

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: `${type === "buy" ? "Purchase" : "Sale"} successful`,
        description: `${type === "buy" ? "Bought" : "Sold"} ${quantity} shares of ${stock.symbol}`,
      })
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "buy" ? "Buy" : "Sell"} {stock.symbol}
          </DialogTitle>
          <DialogDescription>{stock.name || `${stock.symbol} Stock`}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              className="col-span-3"
            />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Current Price:</span>
              <span>${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cost:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Fee (0.1%):</span>
              <span>${fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Final Amount:</span>
              <span>${finalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Balance Left:</span>
              <span>$25,430.50</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className={type === "sell" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {isLoading ? "Processing..." : `${type === "buy" ? "Buy" : "Sell"} Stock`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
