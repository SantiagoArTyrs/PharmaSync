"use client"

import { useAuthStore } from "@/stores/authStore"
import { UserCircle, Mail, ShieldCheck, CalendarDays, Edit3, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProfilePage = () => {
  const { user, isLoading } = useAuthStore()
  // const { showToast } = useToasts(); // For "Undo Last Change" if implemented

  if (isLoading && !user) {
    return <div className="text-center p-4">Loading profile...</div>
  }

  if (!user) {
    return <div className="text-center p-4 text-red-500">Could not load profile.</div>
  }

  const handleUndo = () => {
    // showToast("Undo functionality not yet implemented.", "info");
    alert("Undo Last Change: Functionality to be implemented. This could use a Stack to revert state changes.")
  }

  // Mock member since date
  const memberSince = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account information.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 shadow-lg rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-700 flex items-center">
            <UserCircle className="mr-2.5 text-indigo-600" size={24} /> Account Information
          </h2>
          <Button variant="outline" size="sm">
            <Edit3 size={14} className="mr-1.5" /> Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">First Name</label>
            <p className="text-md text-slate-800 p-3 bg-slate-50 rounded-md border border-slate-200">
              {user.firstName || user.username}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Last Name</label>
            <p className="text-md text-slate-800 p-3 bg-slate-50 rounded-md border border-slate-200">
              {user.lastName || "N/A"}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
            <p className="text-md text-slate-800 p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center">
              <Mail size={16} className="mr-2 text-slate-400" />
              {user.email}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Role</label>
            <p className="text-md text-slate-800 p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center">
              <ShieldCheck size={16} className="mr-2 text-slate-400" />
              {user.roles.join(", ")}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Member Since</label>
            <p className="text-md text-slate-800 p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center">
              <CalendarDays size={16} className="mr-2 text-slate-400" />
              {memberSince}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
          <Button variant="subtle" onClick={handleUndo}>
            <Undo2 size={16} className="mr-2" /> Undo Last Change
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
