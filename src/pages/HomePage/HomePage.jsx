/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

/* import Css Styles */
import "./HomePage.scss"
import "bootstrap/dist/css/bootstrap.min.css"
/* import material iu */
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Tooltip from "@mui/material/Tooltip"
import Zoom from "@mui/material/Zoom"
import { searchContract, checkContract, setNullInfoContract, homeData, showModalLogin, showModalSignUp } from "../../store/actions/userActions"

/* import Images */
import trackWallet from "../../images/icons/trackWallet.svg"
import balance from "../../images/icons/balance.svg"

import contract from "../../images/icons/contract.svg"
import one from "../../images/icons/onne.svg"
import two from "../../images/icons/two.svg"
import three from "../../images/icons/three.svg"
import { Footer, NavBar } from "../../components/index"

import iconSearchBlack from "../../images/icons/iconSearchBlack.svg"
import ThreeSteps from "./parts/ThreeSteps"
import DontLose from "./parts/DontLose"
import Statistics from "./parts/Statistics"
import LessStress from "./parts/LessStress"
import HowToGet from "./parts/HowToGet"

/* *******COMPONENTE***** */

function HomePage() {
  const dispatch = useDispatch()

  const [value, setValue] = useState("")
  const [inputFocus, setInputFocus] = useState(false)
  const [error, setError] = useState(false)
  const [readLoading, setReadLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const inputRef = React.useRef()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus()
    }, 100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    dispatch(homeData())
  }, [])

  /* -----FUNCIONES----- */
  const navigate = useNavigate()

  /* input change value */
  const onChangeValue = (e) => {
    setValue(e.target.value)
    setOpen(false)
    setError(false)
  }

  const navigateContract = () => {
    dispatch(searchContract(value))
    setTimeout(() => {
      navigate("/contract")
    }, 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setReadLoading(true)
    setOpen(false)
    dispatch(setNullInfoContract())
    setError(false)
    dispatch(checkContract(value))
      .then(() => navigateContract())
      .catch(() => {
        setOpen(true)
        setReadLoading(false)
        setError(true)
      })
  }

  const handleShowLogin = () => {
    dispatch(showModalLogin(true))
  }

  const handleShowSignUp = () => {
    dispatch(showModalSignUp(true))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    inputRef.current.focus()
  }

  /* -----LISTA----- */

  const crytoListBlank = []

  return (
    <>
      <NavBar onChangeValue={onChangeValue} handleSubmit={handleSubmit} />

      <Container fluid className="HomePage_Container">
        {/* -----TEXTS---- */}

        <Row className="HomePage_Row__Text">
          <Col xl={12}>
            <h2>
              REVEAL THE RISKS <br /> OF ANY CRYPTO PROJECT WITH AI
            </h2>
            <p>You deserve to know the risks before you invest!</p>
          </Col>
        </Row>
        {/* -----INPUT AND DROPDOWNS----- */}
        <Row className="HomePage_RowContainer_Autocomplete justify-content-md-center">
          <Col className="HomePage_Col_Autocomplete" xs="12" sm="5" md="4" lg="4" xl="3">
            <Tooltip open={open} TransitionComponent={Zoom} title="Invalid address" placement="top" disableFocusListener disableHoverListener disableTouchListener>
              <Autocomplete
                style={error ? { border: "3px solid red", borderRadius: "15px" } : { border: "none", borderStyle: "hidden", borderRadius: "15px" }}
                noOptionsText={null}
                options={crytoListBlank}
                freeSolo
                disableClearable
                renderOption={(props, option) => (
                  <Box component="form" {...props}>
                    <Link className="CryptoInfoContainer" to="/contract">
                      <div className="CryptoInfoContainer">
                        <p className="CryptoID">{option.id}</p>
                        <div className="ContainerAutocompleteIMG">
                          <img className="CryptoImage" width="30" src={`${option.img}`} alt="" />
                        </div>
                        <p className="CryptoName">
                          <strong> {option.label} </strong>
                        </p>
                        <p className="CryptoPrefix"> {option.prefix}</p>
                      </div>
                    </Link>
                  </Box>
                )}
                renderInput={(params) => <TextField inputRef={inputRef} {...params} placeholder="input contract address..." onChange={(e) => onChangeValue(e)} />}
              />
            </Tooltip>
            <img src={iconSearchBlack} alt="iconSearchBlack" className={value ? "hidden" : "iconSearchHome"} />
          </Col>
          <Col className="HomePage_ColContainer_Dropdown_Button" sm={4} md="auto">
            {readLoading ? (
              <Button disabled id="HomeButtonLoading" className="HomePage_Button_Read Loading">
                <Spinner animation="border" variant="dark" />
              </Button>
            ) : (
              <Button disabled={!(value.length >= 26)} onClick={(e) => handleSubmit(e)} className="HomePage_Button_Read">
                Analyze
              </Button>
            )}
          </Col>
        </Row>

        <ThreeSteps
          {...{
            step1: {
              img: trackWallet,
              text: "TRACK WALLETS"
            },
            step2: {
              img: contract,
              text: "DETECT SCAMS"
            },
            step3: {
              img: balance,
              text: "KNOW THE RISKS"
            }
          }}
        />

        <Container fluid className="ChildContainerHomePage">
          <DontLose showSignUp={handleShowSignUp} />

          <ThreeSteps
            background
            {...{
              step1: {
                img: trackWallet,
                text: "Monitor suspicious wallets",
                text2: "Keep a close eye on suspicious wallet activity."
              },
              step2: {
                img: contract,
                text: "Get notified if a contract changes",
                text2: "Get notified if the token you’re invested in changes certain code in the contract."
              },
              step3: {
                img: balance,
                text: "Know the risks before you invest",
                text2: "Understand the risks - from critical to minor before investing."
              },
              tittle: { text: "TAKE CONTROL OF YOUR CRYPTO PORTFOLIO (PRO VERSION EXCLUSIVE)" },
              button: {
                scroll: scrollToTop
              }
            }}
          />

          <Statistics />
          <ThreeSteps
            background
            {...{
              step1: {
                img: one,
                text: "INPUT",
                text2: "Input the contract address into Advantis.AI"
              },
              step2: {
                img: two,
                text: "REVEAL",
                text2: "Reveal and understand the risks found"
              },
              step3: {
                img: three,
                text: "UNDERSTAND",
                text2: "Be knowledgable so you can make safer investments"
              },
              tittle: { text: "DOING YOUR OWN RESEARCH JUST GOT EASIER" },
              button: {
                scroll: scrollToTop
              }
            }}
          />

          <LessStress />

          <HowToGet showLogin={handleShowLogin} showSignUp={handleShowSignUp} />
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default HomePage
