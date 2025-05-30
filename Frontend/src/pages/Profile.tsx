"use client"

import type React from "react"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Shield } from "lucide-react"

export const Profile: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>Your personal details and account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">First Name</label>
              <p className="text-lg font-medium text-foreground">{user.firstName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Name</label>
              <p className="text-lg font-medium text-foreground">{user.lastName}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </label>
            <p className="text-lg font-medium text-foreground">{user.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Role</span>
            </label>
            <div className="mt-1">
              <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Member Since</span>
            </label>
            <p className="text-lg font-medium text-foreground">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
