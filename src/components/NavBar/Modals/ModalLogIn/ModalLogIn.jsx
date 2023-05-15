import React from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { SiFacebook } from "react-icons/si"
import { FcGoogle } from "react-icons/fc"
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch } from "react-redux"

function ModalLogIn({ signInForm, handleLogIn, showLogIn, changeModalForgotPassword, signInError, changeModalSignUp, onChangeSignIn, handleCloseLogIn, showLogInRequest }) {
  return (
    <Modal animation className="NavBar_Modal NavBar_Modal_Container_LogIn" show={showLogIn || showLogInRequest} onHide={handleCloseLogIn} backdrop="static" keyboard={false} size="xl" centered>
      <div className="CentradoBotonCerrar">
        <div />
        <Button id="ButtonClose" variant="secondary" onClick={handleCloseLogIn}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
      <Modal.Header className="NavBar_Modal_Header_LogIn">
        <h2>Log in to your account.</h2>
      </Modal.Header>
      <Modal.Body className="NavBar_Modal_Body_LogIn">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" controlid="formBasicEmail" placeholder="example@email.com" onChange={(e) => onChangeSignIn(e.target)} />
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="•••••••••••••••" onChange={(e) => onChangeSignIn(e.target)} />
            <Form.Text style={{ fontSize: "14px", color: "red" }} className="text-muted">
              <p style={{ fontSize: "14px", color: "red" }}>{signInError?.error ? signInError?.error : null}</p>
            </Form.Text>
          </Form.Group>
          <p id="TextForgotPassword" onClick={() => changeModalForgotPassword()}>
            <strong>Forgot password?</strong>
          </p>

          <Button onClick={handleLogIn} disabled={!(signInForm?.email?.length > 1 || signInForm?.password?.length > 1)} className="ButtonRegister" type="submit">
            Log in <HiOutlineArrowNarrowRight />
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {/* <div className="NavBar_Container_Modal_Footer">
          <h5>Or sign up with</h5>
          <div className="NavBar_Modal_Buttons">
            <Button onClick={handleCloseLogIn} className="ButtonRegister" type="submit">
              <SiFacebook className="LogoSvgFaceebok" />
              Facebook
            </Button>
            <Button onClick={handleCloseLogIn} className="ButtonRegister" type="submit">
              <FcGoogle />
              Google
            </Button>
          </div>
          <p onClick={() => changeModalSignUp()}>
            Don&apos;t have an account yet? <b>Sign up to Advantis AI</b>
          </p>
        </div> */}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalLogIn
