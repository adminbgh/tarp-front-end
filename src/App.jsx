import React from "react"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, Contract, AboutPage } from "./pages/index"
import { LoginAdmin, HomeAdmin, AdminPending, AdminSecurityAudits, AdminApproveds, AdminRejecteds, AdminScamCrud, AdminTextCompare } from "./pages/Admin/index"
import "./assets/index.scss"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/contract" element={<Contract />} />
          <Route path="/admin" element={<LoginAdmin />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}

          <Route exact path="/admin/home" element={<HomeAdmin />} />
          <Route exact path="/admin/pending" element={<AdminPending />} />
          <Route exact path="/admin/security" element={<AdminSecurityAudits />} />
          <Route exact path="/admin/approved" element={<AdminApproveds />} />
          <Route exact path="/admin/rejected" element={<AdminRejecteds />} />
          <Route exact path="/admin/scam" element={<AdminScamCrud />} />
          <Route exact path="/admin/comparetext" element={<AdminTextCompare />} />

          {/* VALIDACIONES */}
          {/* {userLogin?.token && <Route exact path='/admin/home' element={<HomeAdmin />} />}
             {userLogin?.token &&  <Route exact path='/admin/pending' element={<AdminPending />} />}
             {userLogin?.token &&  <Route exact path='/admin/security' element={<AdminSecurityAudits />} /> }
             {userLogin?.token &&  <Route exact path='/admin/approved' element={<AdminApproveds />} />} */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
