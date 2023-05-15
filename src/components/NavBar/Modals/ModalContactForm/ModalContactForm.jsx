import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { sendContactForm } from "../../../../store/actions/userActions"

import "./ModalContactForm.css"

function ModalContactForm({ showModal, setShowModal, showSecurity, setShowSecurity }) {
  const dispatch = useDispatch()

  /* state con campos string vacios */
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    message: ""
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

    dispatch({ type: "SHOW_FORM_CONTACT", payload: false })
  }

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(sendContactForm(form))
      .then(() => {
        handleClose()
      })
      .catch((err) => {
        alert("Error in the form")
      })
    setForm({
      userName: "",
      userEmail: "",
      message: ""
    })
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
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="userName" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address </Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="userEmail" type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlid="formBasicPassword">
              <Form.Label>Message</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} name="message" as="textarea" rows={12} />
            </Form.Group>
            <div className="flex">
              <button className="ModalTextCompare_ButtonSubmit" type="submit">
                SUBMIT
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalContactForm
