import { Route, Routes, Navigate } from "react-router-dom"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <div className="bg-linear-90 from-blue-500 via-violet-400 to-pink-400 h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
