import type { JSX } from "react"
import { useNavigate } from "react-router-dom"

const navigate = useNavigate()
interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token") // ya cookie based check

  if (!token) {
    return navigate('/sign-in');
  }

  return children
}

export default ProtectedRoute
