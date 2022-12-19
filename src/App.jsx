import { Routes, Route } from "react-router-dom"
import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./components/Login"
import Register from "./components/Register"
import Main from "./components/Main"
import Userpage from "./components/Userpage"
import Header from "./components/Header"


function App() {
  return (
    <div className="app-container">
      <Header/>
      <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/main' element={<Main/>} />
              <Route path="/userpage" element={ <Userpage/> } />
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>

    </div>
  )
}

export default App
