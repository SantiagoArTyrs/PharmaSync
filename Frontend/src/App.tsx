// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { PrivateRoute } from "./components/auth/PrivateRoute"
import { Navbar } from "./components/layout/Navbar"
import { BreadcrumbNavigation } from "./components/features/BreadcrumbNavigation"
import { useBreadcrumbs } from "./hooks/useBreadcrumbs"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Chat } from "./pages/Chat"
import { Users } from "./pages/Users"
import { Profile } from "./pages/Profile"
import { ClinicalSummary } from "./pages/ClinicalSummary"
import { AdminUsers } from "./pages/AdminUsers"
import { AdminRegister } from "./pages/AdminRegister"

function AppRouter() {
  const { breadcrumbs, onNavigate } = useBreadcrumbs()

  return (
    <>
      <Navbar />
      <main className="pt-16 px-4">
        <BreadcrumbNavigation items={breadcrumbs} onNavigate={onNavigate} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <PrivateRoute>
                <ClinicalSummary />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute adminOnly>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute adminOnly>
                <AdminUsers />
              </PrivateRoute>
            }
          />

          <Route path="/register-admin" element={<AdminRegister />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <AppRouter />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
