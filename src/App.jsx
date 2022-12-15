import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Main from "./components/Main"
import Userpage from "./components/Userpage"
import Header from "./components/Header"


function App() {
  return (
    <div className="app-container">
      <Header/>
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="main" element={ <Main/> } />
        <Route path="userpage" element={ <Userpage/> } />
      </Routes>
    </div>
  )
}

export default App
