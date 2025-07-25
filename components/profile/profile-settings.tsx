"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function ProfileSettings() {
  const [funds, setFunds] = useState("")
  const { toast } = useToast()

  const handleAddFunds = () => {
    if (!funds || Number.parseFloat(funds) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Funds added successfully",
      description: `$${funds} has been added to your account`,
    })
    setFunds("")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Profile Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Picture</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>

            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>

            <Button>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">Current Balance: $25,430.50</div>

            <div className="space-y-2">
              <Label htmlFor="add-funds">Add Funds</Label>
              <Input
                id="add-funds"
                type="number"
                placeholder="Enter amount"
                value={funds}
                onChange={(e) => setFunds(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddFunds}>Add Funds</Button>
              <Button variant="outline">Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Last login:</span>
                <span>Today, 2:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Account created:</span>
                <span>Jan 1, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Total transactions:</span>
                <span>47</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
