import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Main from "./components/Main"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="app-container">
      <Header/>
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="main" element={ <Main/> } />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App