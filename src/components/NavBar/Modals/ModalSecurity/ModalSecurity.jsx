import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createAudith, showModalSecurity } from "../../../../store/actions/userActions"
import "./ModalSecurity.css"

function ModalSecurity({ showModal, setShowModal, showSecurity, setShowSecurity }) {
  const dispatch = useDispatch()

  /* state con campos string vacios */
  const [form, setForm] = useState({
    name: "",
    email: "",
    contract: "",
    network: "",
    description: ""
  })

  /* hanldechange form */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setShowModal(false)
    dispatch(showModalSecurity(false))
  }

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAudith(form))
    handleClose()
  }

  return (
    <div className="Modal_Container_Security">
      <Modal className="Security_Modal User" animation show={showModal || showSecurity} onHide={handleClose} backdrop="static" keyboard={false} size="xl" centered>
        <Modal.Body>
          <div className="CentradoBotonCerrar">
            <div />
            <Button id="ButtonClose" variant="secondary" onClick={handleClose}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 25L25 1M1 1L25 25" stroke="#D1D5DB" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="name" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address or direct contact</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="email" controlid="formBasicEmail" type="email" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlid="formBasicPassword">
              <Form.Label>Contract address</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} id="ContractAddressSecurity" name="contract" type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlid="formBasicPassword">
              <Form.Label>Network</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="network" type="text" id="ContractAddressSecurity" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlid="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="description" as="textarea" rows={12} placeholder="" />
            </Form.Group>
            <button className="ModalTextCompare_ButtonSubmit" type="submit" onClick={(e) => handleSubmit(e)}>
              SUBMIT
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalSecurity
