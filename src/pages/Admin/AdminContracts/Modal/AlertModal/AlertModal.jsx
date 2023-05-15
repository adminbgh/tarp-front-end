import React from "react"
import { Container, Modal, Button } from "react-bootstrap"
import "./AlertModal.css"

function AlertModal({ AlertShow, handleCloseAlert, handleClose }) {
  /* Cierra la alerta y el Modal */
  const closeAll = () => {
    handleCloseAlert()
    handleClose()
  }

  /* Cerrar solo la alerta */
  const closeAlert = () => {
    handleCloseAlert()
  }

  return (
    <div className="AlertModal_Container">
      <Modal className="AlertModal_ContainerModal" show={AlertShow} onHide={handleCloseAlert} centered>
        <Modal.Body className="Modal_Container_Alert">
          <Container className="AlertModal_Container_Text">
            <p>
              You are leaving the contract management <br /> <strong> Do you want to save changes? </strong>
            </p>
          </Container>
          <Container className="AlertModal_Container_Button flex">
            <Button id="ButtonDontSave" onClick={() => closeAll()}>
              Don’t save
            </Button>
            <Button id="ButtonSave" onClick={() => closeAlert()}>
              Save changes
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AlertModal
