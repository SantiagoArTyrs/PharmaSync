import api from "./api"
import type { User } from "@/types"

const adminService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/admin/users")
    return response.data
  },
  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`)
  },
}

export default adminService
