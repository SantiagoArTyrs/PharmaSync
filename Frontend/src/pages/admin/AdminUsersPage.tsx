"use client"

import { useEffect, useState } from "react"
import adminService from "@/services/adminService"
import type { User } from "@/types"
import { Trash2, Users, RefreshCw, ShieldAlert } from "lucide-react" // Updated Icon
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user: currentUser } = useAuthStore()

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const fetchedUsers = await adminService.getUsers()
      setUsers(fetchedUsers)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId: string, username: string) => {
    if (userId === currentUser?.id) {
      alert("You cannot delete your own account.")
      return
    }
    if (window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      try {
        await adminService.deleteUser(userId)
        setUsers(users.filter((user) => user.id !== userId))
        alert(`User "${username}" deleted successfully.`)
      } catch (err: any) {
        alert(err.response?.data?.message || `Failed to delete user "${username}"`)
      }
    }
  }

  const getRoleDisplay = (userRoles: string[]) => {
    if (userRoles.includes("ADMIN")) {
      return <span className="font-semibold text-red-600">Admin</span>
    }
    if (userRoles.includes("USER")) {
      return <span className="text-slate-600">User</span>
    }
    return <span className="text-slate-500 italic">No role</span>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Users className="mr-3 text-indigo-600" size={30} /> User Management
          </h1>
          <p className="text-slate-500 mt-1">Manage all registered users in the system.</p>
        </div>
        <Button variant="outline" onClick={fetchUsers} disabled={isLoading}>
          <RefreshCw size={16} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-700">All Users</h2>
          <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">
            {users.length} users
          </span>
        </div>

        {isLoading && <p className="text-center text-slate-500 py-8">Loading users...</p>}
        {error && (
          <p className="text-center text-red-500 py-8 bg-red-50 p-4 rounded-md flex items-center justify-center">
            <ShieldAlert className="mr-2" /> {error}
          </p>
        )}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                      {user.firstName || user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.lastName || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getRoleDisplay(user.roles)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                        disabled={user.id === currentUser?.id}
                        title={user.id === currentUser?.id ? "Cannot delete self" : "Delete User"}
                      >
                        <Trash2 size={16} className="mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsersPage
