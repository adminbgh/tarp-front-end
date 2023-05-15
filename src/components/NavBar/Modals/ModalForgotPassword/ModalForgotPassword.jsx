import React from "react"
import { Container, Image, Modal, Button, Form } from "react-bootstrap"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import LogoImageBlack from "../../../../images/icons/logo.svg"

function ModalForgotPassword({ changeModalSignUp, handleCloseForgotPassword, forgotPasswordForm, handleForgotPassword, changeModalLogin, showForgotPassword, onChangeForgotPassword }) {
  return (
    <Modal animation className="NavBar_Modal NavBar_Modal_Container_ForgotPassword" show={showForgotPassword} onHide={handleCloseForgotPassword} backdrop="static" keyboard={false} size="xl" centered>
      <div className="CentradoBotonCerrar">
        <Button id="ButtonClose" variant="secondary" onClick={changeModalLogin}>
          <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 13L1.27801 12.3081L0.614936 13L1.27801 13.6919L2 13ZM28 14C28.5523 14 29 13.5523 29 13C29 12.4477 28.5523 12 28 12V14ZM12.778 25.6919C13.1601 26.0906 13.7932 26.1041 14.1919 25.722C14.5906 25.3399 14.6041 24.7068 14.222 24.3081L12.778 25.6919ZM14.222 1.69191C14.6041 1.29316 14.5906 0.660141 14.1919 0.278012C13.7932 -0.104117 13.1601 -0.0906484 12.778 0.308095L14.222 1.69191ZM2 14H28V12H2V14ZM1.27801 13.6919L12.778 25.6919L14.222 24.3081L2.72199 12.3081L1.27801 13.6919ZM12.778 0.308095L1.27801 12.3081L2.72199 13.6919L14.222 1.69191L12.778 0.308095Z"
              fill="#D1D5DB"
              fillOpacity="0.3"
            />
          </svg>
        </Button>
        <Button id="ButtonClose" variant="secondary" onClick={handleCloseForgotPassword}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
      <Modal.Header className="NavBar_Modal_Header_ForgotPassword">
        <Image fluid src={LogoImageBlack} />
        <h2>Forgot password?</h2>
        <p>
          Enter your email below, you will receive an email with instructions on <br /> how to reset your password in a few minutes.
        </p>
      </Modal.Header>
      <Modal.Body className="NavBar_Modal_Body_ForgotPassword">
        <Container>
          <Form onSubmit={(e) => handleForgotPassword(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => onChangeForgotPassword(e.target)} type="email" controlid="formBasicEmail" placeholder="example@email.com" />
            </Form.Group>
            {forgotPasswordForm?.error ? <p style={{ color: "red" }}>{forgotPasswordForm?.error}</p> : null}
            <Button className="ButtonRegister" type="submit">
              Send instructions <HiOutlineArrowNarrowRight />
            </Button>
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <div className="NavBar_Container_Modal_Footer">
          <p onClick={() => changeModalSignUp()}>
            Don&apos;t have an account yet? <br/><b>Sign up to Advantis.AI</b>
          </p>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForgotPassword
