import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Container, Image, Offcanvas, Stack } from "react-bootstrap"
import "./styles.scss"
import Facebook from "../../images/icons/facebook.svg"
import Twitter from "../../images/icons/twitter.svg"
import Discord from "../../images/icons/discord.svg"
import Telegram from "../../images/icons/telegram.svg"
import { showModalLogin, showModalSecurity, showModalSignUp } from "../../store/actions/userActions"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

function OffCanvas({ showCanvas, closeCanvas }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleShowLogin = () => {
    dispatch(showModalLogin(true))
  }
  const handleShowSignUp = () => {
    dispatch(showModalSignUp(true))
  }

  const ItemSocialMedia = ({ image, url }) => {
    return (
      <div onClick={() => window.open(url, "_blank")}>
        <img src={image} />
      </div>
    )
  }

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const handleShowModalSecurity = (data) => {
    if (userLogin?.token) dispatch(showModalSecurity(data))
    if (!userLogin?.token) dispatch(showModalLogin(data))
  }

  const handleContact = () => {
    dispatch({ type: "SHOW_FORM_CONTACT", payload: true })
  }

  return (
    <>
      <Offcanvas show={showCanvas} onHide={closeCanvas} placement="end">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="containerOffCanvas">
            <div className="containerFirstItems">
              <Col sm={12}>
                <h2 onClick={() => navigate("/")}>Home</h2>
              </Col>
              <Col sm={12}>
                <h2 onClick={() => handleShowModalSecurity(true)}>Security Audit</h2>
              </Col>
              <Col sm={12}>
                <h2 onClick={() => window.open("https://www.advantistoken.com", "_blank")}>Company</h2>
              </Col>

              <Col sm={12}>
                <h2 onClick={() => handleContact()}>Contact</h2>
              </Col>
            </div>
            {!userLogin?.token && (
              <div className="containerSecondItems">
                <Col sm={12}>
                  <h3 onClick={() => handleShowLogin()}>Login</h3>
                </Col>
                <Col sm={12}>
                  <h3 onClick={() => handleShowSignUp()}>Sign up</h3>
                </Col>
              </div>
            )}
            <div className="containerSocials">
              <Col sm={12}>
                <p>hello@advantis.ai</p>
              </Col>
              <div className="containerSocialLinks">
                <Stack direction="horizontal" gap={4}>
                  {/*  <ItemSocialMedia image={Facebook} url={} /> */}

                  <ItemSocialMedia image={Telegram} url={"https://t.me/AdvantisToken"} />

                  <ItemSocialMedia image={Discord} url={"https://discord.com/invite/advantistoken"} />

                  <ItemSocialMedia image={Twitter} url={"https://twitter.com/AdvantisToken"} />
                </Stack>
              </div>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffCanvas
