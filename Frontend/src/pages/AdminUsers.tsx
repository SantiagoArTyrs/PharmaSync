"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { apiClient, type User } from "../lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UsersIcon, Trash2, RefreshCw, AlertTriangle } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export const AdminUsers: React.FC = () => {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError("")
      const usersData = await apiClient.getAllUsers()
      setUsers(usersData)
    } catch (error) {
      console.error("Failed to load users:", error)
      setError(error instanceof Error ? error.message : "Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setDeleteLoading(userToDelete.id)
    try {
      await apiClient.deleteUser(userToDelete.id)
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      closeDeleteDialog()
    } catch (error) {
      console.error("Failed to delete user:", error)
      setError(error instanceof Error ? error.message : "Failed to delete user")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleRefresh = () => {
    loadUsers()
  }

  const getRoleBadgeVariant = (role: string) => {
    return role === "ADMIN" ? "default" : "secondary"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
              <UsersIcon className="h-8 w-8 text-primary" />
              <span>User Management</span>
            </h1>
            <p className="text-muted-foreground mt-2">Manage all registered users in the system</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading} className="flex items-center space-x-2">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Users</span>
            <Badge variant="secondary">{users.length} users</Badge>
          </CardTitle>
          <CardDescription>View and manage all registered users in the PharmaSync system</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.firstName}</TableCell>
                      <TableCell className="font-medium">{user.lastName}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                          {user.id === currentUser?.id && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {user.id !== currentUser?.id && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(user)}
                            disabled={deleteLoading === user.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            {deleteLoading === user.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Confirm User Deletion</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user{" "}
              <span className="font-semibold">
                {userToDelete?.firstName} {userToDelete?.lastName}
              </span>{" "}
              ({userToDelete?.email})? This action cannot be undone and will permanently remove all user data including
              chat history and clinical summaries.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog} disabled={deleteLoading !== null}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={deleteLoading !== null}
              className="flex items-center space-x-2"
            >
              {deleteLoading !== null ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span>Delete User</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
