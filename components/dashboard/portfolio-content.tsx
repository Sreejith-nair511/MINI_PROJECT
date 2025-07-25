"use client"

import { motion } from "framer-motion"
import { HoldingsTable } from "@/components/dashboard/holdings-table"

interface PortfolioContentProps {
  onSell: (stock: any) => void
}

export function PortfolioContent({ onSell }: PortfolioContentProps) {
  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Portfolio
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HoldingsTable onSell={onSell} />
      </motion.div>
    </div>
  )
}
