import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Footer.scss"
import { Container } from "react-bootstrap"
import { AiOutlineCopyrightCircle } from "react-icons/ai"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { showModalLogin, showModalSecurity } from "../../store/actions/userActions"

function Footer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleContact = () => {
    dispatch({ type: "SHOW_FORM_CONTACT", payload: true })
  }

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const handleShowModalSecurity = (data) => {
    if (userLogin?.token) dispatch(showModalSecurity(data))
    if (!userLogin?.token) dispatch(showModalLogin(data))
  }

  return (
    <Container fluid className="Footer_Container">
      <Container fluid="sm">
        <div className="Footer_Center">
          <div>
            <p onClick={() => window.open("https://www.advantistoken.com", "_blank")}>Company</p>
          </div>
          <div>
            <p onClick={() => handleShowModalSecurity(true)}>Security Audit</p>
          </div>
          <div>
            <p onClick={() => handleContact()}>Contact</p>
          </div>
          <div>
            <p>Version 1.0.20</p>
          </div>
        </div>
      </Container>
      <Container fluid="sm">
        <div className="Footer_Copy">
          <p>
            <AiOutlineCopyrightCircle /> Powered by Advantis Token
          </p>
        </div>
      </Container>
    </Container>
  )
}

export default Footer
