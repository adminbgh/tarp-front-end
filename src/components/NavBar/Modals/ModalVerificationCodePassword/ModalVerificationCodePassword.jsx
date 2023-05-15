/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react"
import { Image, Modal, Button } from "react-bootstrap"

import LogoImageBlack from "../../../../images/icons/logo.svg"
import InputCodePasswordCode from "../../InputCodePasswordCode/InputCodePasswordCode"

function ModalVerificationCodePassword({ changeModalSignUp, changeModalResetPassword, userEmailInfo, showVerificationCodePassword, handleCloseVerificationCodePassword }) {
  const [codeResend, setCodeResend] = useState(3)

  useEffect(() => {
    codeResend > 0 && setTimeout(() => setCodeResend(codeResend - 1), 1000)
    return () => {
      clearTimeout(setCodeResend)
    }
  }, [codeResend])

  const addTime = () => {
    setCodeResend(60)
  }
  return (
    <Modal animation className="NavBar_Modal NavBar_Modal_Container_VerificationCodePassword" show={showVerificationCodePassword} onHide={handleCloseVerificationCodePassword} backdrop="static" keyboard={false} size="xl" centered>
      <div className="CentradoBotonCerrar">
        <div id="ButtonClose" variant="secondary" />
        <Button id="ButtonClose" variant="secondary" onClick={handleCloseVerificationCodePassword}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
      <Modal.Header className="NavBar_Modal_Header_VerificationCodePassword">
        <Image fluid src={LogoImageBlack} />
        <h2>Enter your verification code.</h2>
        <p>
          We have sent a verification code to: <br /> <strong>{userEmailInfo}</strong> <br />
          <br />
          <br /> Please enter the code you received below:
        </p>
        <br />
        {codeResend > 1 ? (
          <p className="TextResendCode">
            Did you not receive the email?
            <strong style={{ color: "gray", cursor: "no-drop" }}>{` Resend code in ${codeResend} seconds`}</strong>
          </p>
        ) : (
          <p className="TextResendCode">
            Did you not receive the email?
            <strong
              onClick={async () => {
                await addTime()
                /* handleResendActivationCode(e); */
              }}
            >
              {" Resend code"}
            </strong>
          </p>
        )}
        <InputCodePasswordCode changeModalResetPassword={changeModalResetPassword} user={userEmailInfo} length={6} />
      </Modal.Header>
      <Modal.Body className="NavBar_Modal_Body_VerificationCodePassword" />

      <Modal.Footer>
        <div className="NavBar_Container_Modal_Footer">
          <p onClick={() => changeModalSignUp()}>
            Already have an account? <b>Log in to Advantis.AI</b>
          </p>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalVerificationCodePassword
