import React, { useEffect } from "react"
import { Image, Modal, Button } from "react-bootstrap"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import LogoImageBlack from "../../../../images/icons/logo.svg"

function ModalVerificationSuccessful({ changeModalSignUp, changeModalLogin, showVerificationSuccesful, handleCloseVerificationSuccesful }) {
  useEffect(() => {
    setTimeout(() => {
      handleCloseVerificationSuccesful()
    }, 12000)
  }, [])

  return (
    <Modal animation className="NavBar_Modal NavBar_Modal_Container_VerificationSuccesful" show={showVerificationSuccesful} onHide={handleCloseVerificationSuccesful} backdrop="static" keyboard={false} size="xl" centered>
      <div className="CentradoBotonCerrar">
        <Button id="ButtonClose" variant="secondary" onClick={changeModalSignUp}>
          <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 13L1.27801 12.3081L0.614936 13L1.27801 13.6919L2 13ZM28 14C28.5523 14 29 13.5523 29 13C29 12.4477 28.5523 12 28 12V14ZM12.778 25.6919C13.1601 26.0906 13.7932 26.1041 14.1919 25.722C14.5906 25.3399 14.6041 24.7068 14.222 24.3081L12.778 25.6919ZM14.222 1.69191C14.6041 1.29316 14.5906 0.660141 14.1919 0.278012C13.7932 -0.104117 13.1601 -0.0906484 12.778 0.308095L14.222 1.69191ZM2 14H28V12H2V14ZM1.27801 13.6919L12.778 25.6919L14.222 24.3081L2.72199 12.3081L1.27801 13.6919ZM12.778 0.308095L1.27801 12.3081L2.72199 13.6919L14.222 1.69191L12.778 0.308095Z"
              fill="#D1D5DB"
              fillOpacity="0.3"
            />
          </svg>
        </Button>
        <Button id="ButtonClose" variant="secondary" onClick={handleCloseVerificationSuccesful}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
      <Modal.Header className="NavBar_Modal_Header_VerificationSuccesful">
        <Image fluid src={LogoImageBlack} />
        <h2>Account successfully created</h2>
        <p>Your account has been successfully created! </p>

        <svg className="CheckMark" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
          <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
          <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </svg>
      </Modal.Header>
      <Modal.Body className="NavBar_Modal_Body_VerificationSuccesful">
        <Button onClick={changeModalLogin} className="ButtonSuscribe_Succesful" type="submit">
          Log in <HiOutlineArrowNarrowRight />
        </Button>

        <Button onClick={handleCloseVerificationSuccesful} className="ButtonNo_Succesful" type="submit">
          No, thanks
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ModalVerificationSuccessful
