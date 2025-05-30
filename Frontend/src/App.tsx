import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { PrivateRoute } from "./components/auth/PrivateRoute"
import { Navbar } from "./components/layout/Navbar"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Chat } from "./pages/Chat"
import { Users } from "./pages/Users"
import { Profile } from "./pages/Profile"
import { ClinicalSummary } from "./pages/ClinicalSummary"
import { AdminUsers } from "./pages/AdminUsers"
import { AdminRegister } from "./pages/AdminRegister"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="pt-16">
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

              {/* Admin registration route - not linked in UI */}
              <Route path="/register-admin" element={<AdminRegister />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
