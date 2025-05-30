import Navbar from "@/components/common/Navbar"
import ChatSidebar from "@/chat/ChatSidebar" // Updated Sidebar for Chat
import { Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import BackButton from "@/components/common/BackButton"
import { cn } from "@/lib/utils" // Assuming you have a cn utility

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()
  const isChatPage = location.pathname.startsWith("/chat")

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Navbar />
      <div className={cn("flex flex-1 pt-16", isChatPage ? "overflow-hidden" : "")}>
        {isAuthenticated && isChatPage && <ChatSidebar />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {!isChatPage && ( // Show back button only on non-chat pages for simplicity
            <div className="mb-4">
              <BackButton />
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
