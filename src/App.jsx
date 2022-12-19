import { Routes, Route } from "react-router-dom"
import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./components/Login"
import Register from "./components/Register"
import Adminpage from "./components/Adminpage"
import Userpage from "./components/Userpage"
import Header from "./components/Header"


function App() {
  return (
    <div className="app-container">
      <Header/>
      <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/adminpage' element={<Adminpage/>} />
              <Route path="/userpage" element={ <Userpage/> } />
          </Route>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>

    </div>
  )
}

export default App
