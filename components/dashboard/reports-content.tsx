"use client"

import { motion } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function ReportsContent() {
  const portfolioData = [
    { month: "Jan", value: 85000 },
    { month: "Feb", value: 87500 },
    { month: "Mar", value: 92000 },
    { month: "Apr", value: 89500 },
    { month: "May", value: 95000 },
    { month: "Jun", value: 98750 },
  ]

  const sectorData = [
    { name: "Technology", value: 45, color: "#8b5cf6" },
    { name: "Healthcare", value: 25, color: "#10b981" },
    { name: "Finance", value: 20, color: "#3b82f6" },
    { name: "Energy", value: 10, color: "#ec4899" },
  ]

  const performanceData = [
    { name: "AAPL", value: 16.7, color: "#10b981" },
    { name: "GOOGL", value: 9.4, color: "#10b981" },
    { name: "MSFT", value: 5.5, color: "#10b981" },
    { name: "TSLA", value: -11.2, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Reports & Analytics
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 0 20px theme(colors.neon.purple)" }}
        >
          <div className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Invested</h3>
            <div className="text-3xl font-bold mt-2">$85,200.00</div>
            <p className="text-xs text-muted-foreground mt-1">Base investment amount</p>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -5, boxShadow: "0 0 20px theme(colors.neon.blue)" }}
        >
          <div className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Current Value</h3>
            <div className="text-3xl font-bold mt-2">$98,750.25</div>
            <p className="text-xs profit mt-1">+$13,550.25 (+15.9%)</p>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-green"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -5, boxShadow: "0 0 20px theme(colors.neon.green)" }}
        >
          <div className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Net Gain/Loss</h3>
            <div className="text-3xl font-bold profit mt-2">+$13,550.25</div>
            <p className="text-xs profit mt-1">+15.9% total return</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Portfolio Value Over Time</h3>
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--neon-blue))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--neon-blue))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--neon-blue))"
                    strokeWidth={2}
                    dot={{ stroke: "hsl(var(--neon-blue))", strokeWidth: 2, r: 4, fill: "#111" }}
                    activeDot={{ stroke: "hsl(var(--neon-blue))", strokeWidth: 2, r: 6, fill: "#111" }}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Asset Distribution by Sector</h3>
            <ChartContainer
              config={{
                technology: { label: "Technology", color: "#8b5cf6" },
                healthcare: { label: "Healthcare", color: "#10b981" },
                finance: { label: "Finance", color: "#3b82f6" },
                energy: { label: "Energy", color: "#ec4899" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={{ stroke: "rgba(255,255,255,0.3)", strokeWidth: 1 }}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-green lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Asset Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {performanceData.map((asset, index) => (
                  <div key={asset.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-8 rounded-full mr-3" style={{ backgroundColor: asset.color }}></div>
                      <span>{asset.name}</span>
                    </div>
                    <span className={asset.value >= 0 ? "profit" : "loss"}>
                      {asset.value >= 0 ? "+" : ""}
                      {asset.value}%
                    </span>
                  </div>
                ))}
              </div>

              <ChartContainer
                config={{
                  performance: { label: "Performance", color: "#10b981" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
