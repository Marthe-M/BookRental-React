import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  return (
    (localStorage.getItem('token') !== null)  ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes