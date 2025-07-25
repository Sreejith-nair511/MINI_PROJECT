"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function ReportsPage() {
  const portfolioData = [
    { month: "Jan", value: 85000 },
    { month: "Feb", value: 87500 },
    { month: "Mar", value: 92000 },
    { month: "Apr", value: 89500 },
    { month: "May", value: 95000 },
    { month: "Jun", value: 98750 },
  ]

  const sectorData = [
    { name: "Technology", value: 45, color: "#3b82f6" },
    { name: "Healthcare", value: 25, color: "#10b981" },
    { name: "Finance", value: 20, color: "#f59e0b" },
    { name: "Energy", value: 10, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Reports & Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85,200.00</div>
            <p className="text-xs text-muted-foreground">Base investment amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$98,750.25</div>
            <p className="text-xs profit">+$13,550.25 (+15.9%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Net Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold profit">+$13,550.25</div>
            <p className="text-xs profit">+15.9% total return</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                technology: { label: "Technology", color: "#3b82f6" },
                healthcare: { label: "Healthcare", color: "#10b981" },
                finance: { label: "Finance", color: "#f59e0b" },
                energy: { label: "Energy", color: "#ef4444" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
