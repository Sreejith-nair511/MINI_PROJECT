"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function SettingsContent() {
  const [funds, setFunds] = useState(1000)
  const { toast } = useToast()

  const handleAddFunds = () => {
    toast({
      title: "Funds added successfully",
      description: `$${funds} has been added to your account`,
    })
  }

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Profile Settings
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20 border-2 border-neon-purple/50 shadow-neon-purple">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback className="bg-primary/20 text-primary text-xl">JD</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="border-neon-purple/50 hover:border-neon-purple hover:shadow-neon-purple bg-transparent"
              >
                Change Picture
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" className="bg-muted/50 border-white/10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="bg-muted/50 border-white/10"
                />
              </div>

              <Button className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple">
                Update Profile
              </Button>
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
            <h3 className="text-xl font-bold mb-4">Security</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="bg-muted/50 border-white/10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="bg-muted/50 border-white/10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="bg-muted/50 border-white/10" />
              </div>

              <Button className="bg-gradient-to-r from-neon-blue to-neon-green hover:from-neon-green hover:to-neon-blue">
                Update Password
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-green"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Manage Funds</h3>
            <div className="text-2xl font-bold mb-6">Current Balance: $25,430.50</div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="add-funds">Add Funds</Label>
                  <span className="text-neon-green">${funds}</span>
                </div>
                <Slider
                  id="add-funds"
                  min={100}
                  max={10000}
                  step={100}
                  value={[funds]}
                  onValueChange={(value) => setFunds(value[0])}
                  className="[&>span]:bg-neon-green"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleAddFunds}
                  className="flex-1 bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-green"
                >
                  Add Funds
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-500/50 text-red-500 hover:border-red-500 hover:bg-red-500/10 bg-transparent"
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-xl overflow-hidden neon-border-pink"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Account Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm">Last login</span>
                <span className="text-sm font-medium">Today, 2:30 PM</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm">Account created</span>
                <span className="text-sm font-medium">Jan 1, 2024</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm">Total transactions</span>
                <span className="text-sm font-medium">47</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm">Last transaction</span>
                <span className="text-sm font-medium">Today, 10:15 AM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
