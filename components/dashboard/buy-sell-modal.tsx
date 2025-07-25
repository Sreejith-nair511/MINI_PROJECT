"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Minus, Plus } from "lucide-react"

interface BuySellModalProps {
  type: "buy" | "sell"
  stock: any
  isOpen: boolean
  onClose: () => void
}

export function BuySellModal({ type, stock, isOpen, onClose }: BuySellModalProps) {
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

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card rounded-t-xl sm:rounded-xl overflow-hidden border border-white/20 w-full max-w-md"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">
                    {type === "buy" ? "Buy" : "Sell"} {stock.symbol}
                  </h2>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${currentPrice.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Current Price</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-full bg-transparent"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                      className="bg-muted/50 border-white/10 text-center text-lg font-bold"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      className="h-10 w-10 rounded-full bg-transparent"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-white/5 p-4">
                  <div className="flex justify-between text-sm">
                    <span>Shares:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price per share:</span>
                    <span className="font-medium">${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span className="font-medium">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fee (0.1%):</span>
                    <span className="font-medium">${fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-white/10 pt-3 mt-3">
                    <span>Total:</span>
                    <span>${finalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Balance after:</span>
                    <span>$25,430.50</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-white/10 hover:bg-white/5 bg-transparent"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={`flex-1 ${
                      type === "buy"
                        ? "bg-gradient-to-r from-neon-green to-green-600 hover:from-green-600 hover:to-neon-green"
                        : "bg-gradient-to-r from-neon-pink to-red-600 hover:from-red-600 hover:to-neon-pink"
                    }`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : `${type === "buy" ? "Buy" : "Sell"} ${quantity} Share${quantity > 1 ? "s" : ""}`}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
