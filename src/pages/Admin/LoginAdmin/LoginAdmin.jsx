/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Container, Form, Button } from "react-bootstrap"

import "./LoginAdmin.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { useNavigate } from "react-router"
import { adminLogin } from "../../../store/actions/userActions"
import { NavBar } from "../../../components"

function LoginAdmin() {
  const userLogin = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const [viewAdmin, setViewAdmin] = useState(true)

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    error: ""
  })

  const [disabledButtom, setDisabledButtom] = useState(true)
  const [enableSignUp, setEnableSignUp] = useState(false)

  const handleChange = (e) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value
    })
    if (signInForm.email !== "" && signInForm.password !== "") {
      setDisabledButtom(false)
    } else {
      setDisabledButtom(true)
    }
  }

  const navigateHome = () => {
    //reload
    navigate("/admin/home")
    window.location.reload()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (signInForm.email !== "" && signInForm.password !== "") {
      dispatch(adminLogin(signInForm))
        .then(() => navigateHome())
        .catch((error) => {
          if (error?.response?.status === 400) {
            return setSignInForm({
              ...signInForm,
              error: error?.response?.data?.message
            })
          }
        })
    }
  }

  useEffect(() => {
    if (userLogin) {
      navigateHome()
    }
  }, [])

  return (
    <Container fluid className="LoginAdmin_Container">
      <NavBar enableSignUp={enableSignUp} setEnableSignUp={setEnableSignUp} viewAdmin={viewAdmin} />
      <Container className="LoginAdmin_Container_Login">
        <div className="LoginAdmin_Container_Login_Form">
          <Form>
            <h3>Log in to admin.</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
              <Form.Text style={{ color: "#FF3B30" }}>{signInForm?.error ? signInForm?.error : null}</Form.Text>
            </Form.Group>

            <Button disabled={disabledButtom} id="ButtonRegisterAdmin" variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
              Log in <HiOutlineArrowNarrowRight />
            </Button>
          </Form>
        </div>
      </Container>
    </Container>
  )
}

export default LoginAdmin
