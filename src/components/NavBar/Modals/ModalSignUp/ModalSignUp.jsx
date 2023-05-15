import React from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { SiFacebook } from "react-icons/si"
import { FcGoogle } from "react-icons/fc"
import "bootstrap/dist/css/bootstrap.min.css"

function ModalSignUp({ changeModalLogin, showSignUp, signUpError, signUpForm, handleCloseSignUp, handleSingUp, onChangeSignUp, enableSignUp }) {
  return (
    <Modal className="NavBar_Modal" animation show={showSignUp || enableSignUp} onHide={handleCloseSignUp} backdrop="static" keyboard={false} size="xl" centered>
      <div className="CentradoBotonCerrar">
        <div />
        <Button id="ButtonClose" variant="secondary" onClick={handleCloseSignUp}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
      <Modal.Header>
        <h2>Create an account.</h2>
        <p></p>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSingUp(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control name="name" placeholder="John Chris Doe" onChange={(e) => onChangeSignUp(e.target)} />
            <Form.Text className="text-muted">{signUpError?.lastNameError ? <p style={{ color: "#EF4444", fontSize: "14px" }}>{signUpError?.lastNameError}</p> : null}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control controlid="formBasicEmail" name="email" type="email" placeholder="example@email.com" onChange={(e) => onChangeSignUp(e.target)} />
          </Form.Group>

          <Form.Group className="mb-3" controlid="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="•••••••••••••••" onChange={(e) => onChangeSignUp(e.target)} />
            <Form.Text className="text-muted">{signUpError?.passwordError ? <p style={{ color: "#EF4444", fontSize: "14px" }}>{signUpError?.passwordError}</p> : "At least 10 characters with a capital letter and a number."}</Form.Text>
          </Form.Group>
          {signUpError?.error ? <p style={{ color: "#EF4444", fontSize: "24px" }}>{signUpError?.error}</p> : null}
          <Button disabled={signUpForm.name.length > 3 ? (signUpForm.password.length > 9 ? !(signUpForm.email.length > 5) : true) : true} className="ButtonRegister CreateAccount" type="submit">
            Create account
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {/*  <div className="NavBar_Container_Modal_Footer">
          <h5>or sign up with</h5>
          <div className="NavBar_Modal_Buttons">
            <Button onClick={handleCloseSignUp} className="ButtonRegister" type="submit">
              <SiFacebook className="LogoSvgFaceebok" />
              Facebook
            </Button>
            <Button onClick={handleCloseSignUp} className="ButtonRegister" type="submit">
              <FcGoogle />
              Google
            </Button>
          </div>
          <p onClick={() => changeModalLogin()}>
            Already have an account? <b>Log in to Advantis AI</b>
          </p>
        </div> */}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalSignUp
