import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const PrivateRouteAdmin = () => {
  const token =localStorage.getItem('token');
  const decodedToken = jwt_decode(token)
  const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

  return (
    (role === "True") ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRouteAdmin