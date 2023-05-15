/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef } from "react"
import { Container, Button } from "react-bootstrap"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { userAccountActivation } from "../../../store/actions/userActions"

import "./InputCode.scss"

/* ---RENDER--- */ /* ---RENDER--- */ /* ---RENDER--- */
/* ---RENDER--- */ /* ---RENDER--- */ /* ---RENDER--- */
/* ---RENDER--- */ /* ---RENDER--- */ /* ---RENDER--- */

function InputCode({ length, loading, user, changeModalVerificationSuccesful }) {
  const dispatch = useDispatch()
  const [code, setCode] = useState([...Array(length)].map(() => ""))

  const [activationData, setActivationData] = useState({
    email: "",
    token: "",
    error: false
  })
  const inputs = useRef([])

  const processInput = (e, slot) => {
    const num = e.target.value
    if (/[^0-9]/.test(num)) return
    const newCode = [...code]
    newCode[slot] = num
    setCode(newCode)
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus()
    }
    if (newCode.every((number) => number !== "")) {
      null
    }
  }

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ""
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }
    setActivationData({ ...activationData, email: user, token: code.join("") })
  }

  /* -----HANDLE SUBMIT----- */ /* -----HANDLE SUBMIT----- */
  /* -----HANDLE SUBMIT----- */ /* -----HANDLE SUBMIT----- */

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(userAccountActivation(activationData))
      .then(() => {
        changeModalVerificationSuccesful()
      })
      .catch(() => {
        setActivationData({ ...activationData, error: true })
        setCode([...Array(length)].map(() => ""))
        setTimeout(() => {
          setActivationData({ ...activationData, error: false })
        }, 5000)
      })
  }

  return (
    <div className="code-input">
      <div className={activationData?.error ? "code-inputs error" : "code-inputs"}>
        {code?.map((num, idx) => (
          <input placeholder="•" key={idx} type="text" inputMode="numeric" maxLength={1} value={num} autoFocus={!code[0]?.length && idx === 0} readOnly={loading} onChange={(e) => processInput(e, idx)} onKeyUp={(e) => onKeyUp(e, idx)} ref={(ref) => inputs.current.push(ref)} />
        ))}
      </div>
      <br /> <br />
      <div className="NavBar_Modal_Body_VerificationCode">
        <Container className="NavBar_Container_InputCode">
          <p onClick={() => changeModalSignUp()}>
            Sent to the wrong mail? <b>Go back</b>
          </p>
          <Button onClick={(e) => handleSubmit(e)} className="ButtonRegister" type="submit">
            Log in <HiOutlineArrowNarrowRight />
          </Button>
        </Container>
      </div>
    </div>
  )
}

export default InputCode
