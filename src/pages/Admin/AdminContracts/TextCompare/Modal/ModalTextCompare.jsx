import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ModalTextCompare.css"
import { useDispatch } from "react-redux"
import { adminCreateCompareText, adminGetCompareTexts, adminUpdateCompareText } from "../../../../../store/actions/adminActions"

function ModalTextCompare({ showModal, setShowModal, textCompareState, setTextCompareState }) {
  const dispatch = useDispatch()

  const handleClose = async () => {
    await setTextCompareState("")
    setShowModal(false)
  }

  /* state con campos string vacios */
  const [form, setForm] = useState({
    name: "",
    text: ""
  })

  const [formUpdate, setFormUpdate] = useState("")

  /* submit form */
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(adminCreateCompareText(form))
    await dispatch(adminGetCompareTexts())
    handleClose()
  }

  /* hanldechange form */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /* submitUpdate form */
  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    await dispatch(adminUpdateCompareText(formUpdate))
    await dispatch(adminGetCompareTexts())
    handleClose()
  }

  /* hanldechangeUpdate form */
  const handleChangeUpdate = (e) => {
    setFormUpdate({
      ...formUpdate,
      id: textCompareState?.id,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setFormUpdate({
      ...formUpdate,
      id: textCompareState?.id,
      name: textCompareState?.name,
      text: textCompareState?.text
    })
  }, [])

  return (
    <div className="Modal_Container_Security">
      <Modal className="ModalTextCompare" animation show={showModal} onHide={handleClose} backdrop="static" keyboard={false} size="xl" centered>
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
            {textCompareState ? (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" rows={12} id="TextTarea_ModalCRUDScam" defaultValue={textCompareState?.name ? textCompareState?.name : ""} style={{ fontSize: "1.2rem" }} onChange={(e) => handleChangeUpdate(e)} />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" rows={12} id="TextTarea_ModalCRUDScam" style={{ fontSize: "1.2rem" }} onChange={(e) => handleChange(e)} />
              </Form.Group>
            )}
            {textCompareState ? (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>TEXT COMPARE</Form.Label>
                <Form.Control defaultValue={textCompareState?.text ? textCompareState?.text : ""} as="textarea" name="text" rows={12} type="text" id="TextTarea_ModalTextCompare" style={{ fontSize: "1.2rem" }} onChange={(e) => handleChangeUpdate(e)} />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlid="formBasicPassword">
                <Form.Label>TEXT COMPARE</Form.Label>
                <Form.Control as="textarea" name="text" rows={12} type="text" id="TextTarea_ModalTextCompare" style={{ fontSize: "1.2rem" }} onChange={(e) => handleChange(e)} />
              </Form.Group>
            )}
            {textCompareState ? (
              <button className="ModalSecurity_ButtonSubmit" type="submit" onClick={(e) => handleSubmitUpdate(e)}>
                UPDATE
              </button>
            ) : (
              <button className="ModalSecurity_ButtonSubmit" disabled={!!(form?.text?.length < 10 || form?.name?.length < 2)} style={form?.text?.length > 10 ? null : { opacity: "0.3" }} type="submit" onClick={(e) => handleSubmit(e)}>
                SUBMIT
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalTextCompare
