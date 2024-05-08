import { useNavigate } from "react-router-dom"
import { useSession } from "./hooks/useSession"

export const ProtectedRoute = () => {
    const navigate = useNavigate()
    const [session] = useSession()
    if(!session) navigate("/login") 
    return null
}