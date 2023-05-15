/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import "./NavBar.scss"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
/* utilidades Boostrap - Material UI */
import { Container, Navbar, Nav, Image, Spinner } from "react-bootstrap"
import Box from "@mui/material/Box"
import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"

/* import icons */
import { BsFillCircleFill, BsFillBellFill } from "react-icons/bs"
import iconSearch from "../../images/icons/iconSearch.svg"
import iconMenu from "../../images/icons/iconMenu.svg"
import Logo from "../../images/icons/logo.svg"

/* import actions */
import { signUp, signIn, emailUserChange, sendRecoveryPassword, recoverPassword, resendCodeActivation, showModalLogin, showModalSignUp, checkContract, setNullInfoContract, searchContract } from "../../store/actions/userActions"

/* import Modals */
import ModalSignUp from "./Modals/ModalSignUp/ModalSignUp"
import ModalLogIn from "./Modals/ModalLogIn/ModalLogIn"
import ModalResetPassword from "./Modals/ModalResetPassword/ModalResetPassword"
import ModalForgotPassword from "./Modals/ModalForgotPassword/ModalForgotPassword"
import ModalVerificationCode from "./Modals/ModalVerificationCode/ModalVerificationCode"
import ModalVerificationCodePassword from "./Modals/ModalVerificationCodePassword/ModalVerificationCodePassword"
import ModalVerificationSuccessful from "./Modals/ModalVerificationSuccessful/ModalVerificationSuccessful"
import ModalSecurity from "./Modals/ModalSecurity/ModalSecurity"

/* import elements */
import OffCanvas from "../OffCanvas"
import Button from "../elements/Buttons"
import ModalContactForm from "./Modals/ModalContactForm/ModalContactForm"

/* ****COMPONENTE**** */ /* ****COMPONENTE**** */ /* ****COMPONENTE**** */
function NavBar({ showSecurity, showLogInRequest, setShowLogInRequest, setShowSecurity, enableSignUp, setEnableSignUp }) {
  const navigate = useNavigate()
  const userLogin = JSON.parse(localStorage.getItem("user"))
  const showModalLoginBool = useSelector((state) => state?.user?.showModalLogin)
  const showModalSignUpBool = useSelector((state) => state?.user?.showModalSignUp)
  const showSecurityBool = useSelector((state) => state?.user?.showSecurity)
  const showFormContact = useSelector((state) => state?.user?.showFormContact)
  const userInfo = useSelector((state) => state?.user?.userLogged)
  const userEmailInfo = useSelector((state) => state?.user?.userEmail)
  const userActivationInfo = useSelector((state) => state?.user?.userActivation)
  const contract = useSelector((state) => state?.user?.contract)

  /* HOOKS Y FUNCTIONS NAVBAR */
  const dispatch = useDispatch()
  const [navBarBackground, setNavBarBackgorund] = useState(false)
  const [notification, setNotification] = useState(false)

  /* modal Scurity Audit */
  const [showModal, setShowModal] = useState(showSecurityBool || false)

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavBarBackgorund(true)
    } else {
      setNavBarBackgorund(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackground)

    return () => {
      window.removeEventListener("scroll", changeBackground)
    }
  }, [])

  /* BELL NOTIFICATIONS */
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClickNotification = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen) => !previousOpen)
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? "transition-popper" : undefined

  /* HOOKS Y FUNCTIONS MODALS */
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogIn, setShowLogIn] = useState(showModalLoginBool || false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showVerificationCode, setShowVerificationCode] = useState(false)
  const [showVerificationCodePassword, setShowVerificationCodePassword] = useState(false)
  const [showVerificationSuccesful, setShowVerificationSuccesful] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)

  const handleCloseSignUp = () => {
    setShowSignUp(false)
    dispatch(showModalSignUp(false))
  }

  /* log in */
  const handleCloseLogIn = () => {
    dispatch(showModalLogin(false))
    setShowLogIn(false)

    if (setShowLogInRequest) {
      setShowLogInRequest(false)
    }
  }

  const navigateContract = async () => {
    dispatch(setNullInfoContract())
    dispatch(searchContract(value))
    setTimeout(() => {
      navigate("/contract")
    }, 2000)
  }

  const onChangeValue = (e) => {
    setValue(e.target.value)
  }

  const inputRef = React.useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!value) return inputRef.current.focus()
    setLoading(true)
    if (value == contract) return setLoading(false), navigate("/contract"), window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    if (value) {
      setError(false)
      await dispatch(checkContract(value))
        .then(() => navigateContract())
        .catch((error) => {
          console.log(error)
          setLoading(false)
          setError(true)
        })
    }
    setLoading(false)
  }

  const handleShowLogIn = () => setShowLogIn(true)
  /* Forgot Password */
  const handleCloseForgotPassword = () => setShowForgotPassword(false)

  /* Verification Code */
  const handleCloseVerificationCode = () => setShowVerificationCode(false)

  /* Verification Succesful */
  const handleCloseVerificationSuccesful = () => setShowVerificationSuccesful(false)

  /* Verification Code Password */
  const handleCloseVerificationCodePassword = () => setShowVerificationCodePassword(false)

  /* Reset Password */
  const handleCloseResetPassword = () => setShowResetPassword(false)

  /* ------change Modal------ */
  /* ------change Modal------ */
  /* ------change Modal------ */

  /* Cambia al LogIn */
  const changeModalLogin = () => {
    dispatch(showModalSignUp(false))
    setShowSignUp(false)
    setShowVerificationCode(false)
    setShowVerificationSuccesful(false)
    setShowForgotPassword(false)
    setShowResetPassword(false)
    setShowVerificationCodePassword(false)
    setShowLogIn(true)
  }
  /* Cambia al SingUp */
  const changeModalSignUp = () => {
    setShowForgotPassword(false)
    setShowLogIn(false)
    setShowVerificationCode(false)
    setShowVerificationSuccesful(false)
    setShowResetPassword(false)
    setShowVerificationCodePassword(false)
    setShowSignUp(true)
    if (setShowLogInRequest) {
      setShowLogInRequest(false)
    }
  }
  /* Cambia al Forgot Password? */
  const changeModalForgotPassword = () => {
    setShowSignUp(false)
    setShowLogIn(false)
    setShowVerificationCode(false)
    setShowVerificationSuccesful(false)
    setShowVerificationCodePassword(false)
    setShowResetPassword(false)
    setShowForgotPassword(true)
  }
  const changeModalVerificationCode = () => {
    setShowSignUp(false)
    setShowLogIn(false)
    setShowForgotPassword(false)
    setShowVerificationSuccesful(false)
    setShowVerificationCodePassword(false)
    setShowResetPassword(false)
    setShowVerificationCode(true)
    dispatch(showModalSignUp(false))
  }

  /* Cambia al Forgot Password? */
  const changeModalVerificationSuccesful = () => {
    setShowSignUp(false)
    setShowLogIn(false)
    setShowVerificationCode(false)
    setShowForgotPassword(false)
    setShowVerificationCodePassword(false)
    setShowResetPassword(false)
    setShowVerificationSuccesful(true)
  }

  const changeModalVerificationCodePassword = () => {
    setShowSignUp(false)
    setShowLogIn(false)
    setShowVerificationCode(false)
    setShowForgotPassword(false)
    setShowVerificationSuccesful(false)
    setShowVerificationCodePassword(false)
    setShowVerificationCodePassword(true)
  }

  const changeModalResetPassword = () => {
    setShowSignUp(false)
    setShowLogIn(false)
    setShowVerificationCode(false)
    setShowForgotPassword(false)
    setShowVerificationSuccesful(false)
    setShowVerificationCodePassword(false)
    setShowResetPassword(true)
  }

  const handleCloseCanvas = () => {
    setShowCanvas(false)
  }
  const handleShowCanvas = () => setShowCanvas(true)

  /* HOOKS STATES SIGN UP */ /* HOOKS STATES SIGN UP */ /* HOOKS STATES SIGN UP */
  /* HOOKS STATES SIGN UP */ /* HOOKS STATES SIGN UP */ /* HOOKS STATES SIGN UP */

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [resetPasswordForm, setResetPasswordForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    token: "",
    messageError: ""
  })

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: ""
  })

  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
    error: ""
  })

  const [signUpError, setSignUpError] = useState({
    error: "",
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: ""
  })

  const [signInError, setSignInError] = useState({
    error: ""
  })

  const onChangeSignUp = (event) => {
    if (event.name === "name") {
      const fullName = event.value.split(" ")

      setSignUpForm({
        ...signUpForm,
        name: fullName[0],
        lastName: fullName[1]
      })
    }
    if (event.name === "email") {
      setSignUpForm({ ...signUpForm, email: event.value })
    }
    if (event.name === "password") {
      setSignUpForm({ ...signUpForm, password: event.value })
    }
  }

  const onChangeResetPassword = (event) => {
    if (event.name === "password") {
      setResetPasswordForm({
        ...resetPasswordForm,
        password: event.value,
        email: userActivationInfo?.user,
        token: userActivationInfo?.token
      })
    } else if (event.name === "confirmPassword") {
      setResetPasswordForm({
        ...resetPasswordForm,
        confirmPassword: event.value,
        email: userActivationInfo?.user,
        token: userActivationInfo?.token
      })
    }
  }
  /* on Chage  Sig-In  */
  const onChangeSignIn = (event) => {
    if (event.name === "email") {
      setSignInForm({ ...signInForm, email: event.value.toLowerCase() })
    }
    if (event.name === "password") {
      setSignInForm({ ...signInForm, password: event.value })
    }
  }

  /* on Chage Forgot Password */
  const onChangeForgotPassword = (event) => {
    setForgotPasswordForm({ ...setForgotPasswordForm, email: event.value })
  }

  /* Submit de Register - control form-inputel formulario */
  const handleSingUp = (event) => {
    event.preventDefault()
    setTimeout(() => {
      setSignUpError({
        ...signUpError,
        passwordError: "",
        lastNameError: "",
        error: ""
      })
    }, 15000)
    if (signUpForm?.password?.length <= 10) {
      return setSignUpError({
        ...signUpError,
        passwordError: "The password must contain at least 10 characters with a capital letter and a number."
      })
    }
    if (!/[A-Z]/.test(signUpForm?.password)) {
      return setSignUpError({
        ...signUpError,
        passwordError: "The password must contain at least 10 characters with a capital letter and a number."
      })
    }
    if (signUpForm?.lastName === "" || signUpForm?.lastName === undefined) {
      setSignUpError({
        ...signUpError,
        lastNameError: "Complete with full name."
      })
    } else {
      dispatch(signUp(signUpForm))
        .then(() => changeModalVerificationCode())
        .catch((error) => {
          if (error?.response?.data?.message === "El usuario ya existe") {
            setSignUpError({ ...signUpError, error: "User already exists" })
          } else if (error?.response?.data?.message === "Faltan datos") {
            setSignUpError({ ...signUpError, error: "Missing data" })
          }
        })
    }
  }
  /* Submit de Login */
  const handleLogIn = (event) => {
    event.preventDefault()

    dispatch(signIn(signInForm))
      .then(async () => {
        handleCloseLogIn(), await dispatch(emailUserChange(signInForm.email), window.location.reload())
      })
      .catch((error) => {
        if (error?.response?.data?.message === "Usuario no encontrado") {
          setSignInError({ ...signInError, error: "User not found" })
          setTimeout(() => {
            setSignInError({ ...signInError, error: "" })
          }, 10000)
        } else if (error?.response?.data?.message === "Contraseña incorrecta") {
          setSignInError({ ...signInError, error: "Incorrect password" })
          setTimeout(() => {
            setSignInError({ ...signInError, error: "" })
          }, 10000)
        } else if (error?.response?.data?.message === "Usuario no verificado") {
          dispatch(emailUserChange(signInForm.email), changeModalVerificationCode())
        }
      })
  }

  /* Submit de Forgot Password */
  const handleForgotPassword = (event) => {
    event.preventDefault()

    dispatch(sendRecoveryPassword(forgotPasswordForm))
      .then(async () => {
        await dispatch(emailUserChange(forgotPasswordForm.email))
        changeModalVerificationCodePassword()
      })
      .catch((error) => {
        if (error?.response?.data?.message === "El usuario no existe") {
          setForgotPasswordForm({
            ...forgotPasswordForm,
            error: "The user does not exist"
          })
        }
      })
  }

  /* Submit de Reset Password */
  const handleResetPassword = (event) => {
    event.preventDefault()
    setTimeout(() => {
      setResetPasswordForm({ ...signUpError, messageError: "" })
    }, 15000)
    if (resetPasswordForm?.password?.length <= 10) {
      return setResetPasswordForm({
        ...resetPasswordForm,
        messageError: "The password must contain at least 10 characters with a capital letter and a number."
      })
    }
    if (!/[A-Z]/.test(resetPasswordForm?.password)) {
      return setResetPasswordForm({
        ...resetPasswordForm,
        messageError: "The password must contain at least 10 characters with a capital letter and a number."
      })
    }
    if (resetPasswordForm.password === resetPasswordForm.confirmPassword) {
      dispatch(recoverPassword(resetPasswordForm)).then(() => {
        changeModalLogin()
      })
    } else {
      setResetPasswordForm({
        ...resetPasswordForm,
        messageError: "Passwords do not match"
      })
      setTimeout(() => {
        setResetPasswordForm({ ...resetPasswordForm, messageError: null })
      }, 4000)
    }
  }

  /* Submit Resend Activation Code */
  const handleResendActivationCode = (event) => {
    event.preventDefault()
    dispatch(resendCodeActivation(userEmailInfo))
      .then(() => { })
      .catch((error) => {
        console.log(error)
      })
  }

  /* LOG OUT */ /* LOG OUT */ /* LOG OUT */

  const logOut = () => {
    localStorage.removeItem("user")
    location.reload()
  }

  return (
    <>
      {/* ----MODAL CONTACT---- */}

      <ModalContactForm setShowModal={setShowModal} showModal={showFormContact || showModal} showSecurity={showSecurity} setShowSecurity={setShowSecurity} />

      {/* ----MODAL SECURITY AUDIT---- */}

      <ModalSecurity setShowModal={setShowModal} showModal={showSecurityBool || showModal} showSecurity={showSecurity} setShowSecurity={setShowSecurity} />

      {/* ----MODAL SIGN UP---- */}

      <ModalSignUp setEnableSignUp={setEnableSignUp} enableSignUp={enableSignUp} signInForm={signInForm} signUpForm={signUpForm} signUpError={signUpError} changeModalLogin={changeModalLogin} showSignUp={showSignUp || showModalSignUpBool} handleCloseSignUp={handleCloseSignUp} handleSingUp={handleSingUp} onChangeSignUp={onChangeSignUp} />

      {/* ----MODAL LOG IN---- */}

      <ModalLogIn changeModalSignUp={changeModalSignUp} handleLogIn={handleLogIn} onChangeForgotPassword={onChangeForgotPassword} signInForm={signInForm} showLogIn={showLogIn || showModalLoginBool} changeModalForgotPassword={changeModalForgotPassword} signInError={signInError} onChangeSignIn={onChangeSignIn} handleCloseLogIn={handleCloseLogIn} showLogInRequest={showLogInRequest} />

      {/* ----MODAL FORGOT PASSWORD---- */}

      <ModalForgotPassword onChangeForgotPassword={onChangeForgotPassword} changeModalSignUp={changeModalSignUp} forgotPasswordForm={forgotPasswordForm} handleForgotPassword={handleForgotPassword} changeModalLogin={changeModalLogin} showForgotPassword={showForgotPassword} handleCloseForgotPassword={handleCloseForgotPassword} />

      {/* ----MODAL RESET PASSWORD---- */}

      <ModalResetPassword changeModalSignUp={changeModalSignUp} resetPasswordForm={resetPasswordForm} handleResetPassword={handleResetPassword} onChangeResetPassword={onChangeResetPassword} changeModalLogin={changeModalLogin} handleCloseResetPassword={handleCloseResetPassword} showResetPassword={showResetPassword} />

      {/* ----MODAL VERIFICATION CODE---- */}

      <ModalVerificationCode changeModalVerificationSuccesful={changeModalVerificationSuccesful} handleResendActivationCode={handleResendActivationCode} userEmailInfo={userEmailInfo} changeModalSignUp={changeModalSignUp} showVerificationCode={showVerificationCode} handleCloseVerificationCode={handleCloseVerificationCode} />

      {/* ----MODAL VERIFICATION CODE PASSWORD---- */}

      <ModalVerificationCodePassword changeModalSignUp={changeModalSignUp} changeModalResetPassword={changeModalResetPassword} userEmailInfo={userEmailInfo} showVerificationCodePassword={showVerificationCodePassword} handleCloseVerificationCodePassword={handleCloseVerificationCodePassword} />

      {/* ----MODAL VERIFICATION SUCCESSFUL---- */}

      <ModalVerificationSuccessful changeModalSignUp={changeModalSignUp} changeModalLogin={changeModalLogin} showVerificationSuccesful={showVerificationSuccesful} handleCloseVerificationSuccesful={handleCloseVerificationSuccesful} />

      <OffCanvas showCanvas={showCanvas} closeCanvas={handleCloseCanvas} />

      {/* RENDER NAVBAR */}

      <Navbar className="no-flex-wrap" fixed="top" variant="dark" expand="xxl">
        <Container className={navBarBackground ? "Navbar active" : "Navbar false"} fluid>
          {/* Logo */}
          <div className="NavBar_Logo">
            <Navbar.Brand className="NavBar_Brand">
              <Link to="/">
                <Image fluid src={Logo} />
                <h2>Advantis.AI</h2>
              </Link>
            </Navbar.Brand>
          </div>

          {/* Links */}

          <div className="NavBar_Links">
            {/* Searchbar */}

            <Nav className="me-auto" justify>
              <div className="form">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <i type="submit" onClick={(e) => handleSubmit(e)} className="fa fa-search pointer">
                    {loading ? <Spinner animation="border" variant="secondary" /> : <img className={`pointer`} src={iconSearch} />}
                  </i>
                  <input ref={inputRef} type="text" className={` form-input error-${error} isValue-${value ? true : false} `} placeholder="Search project" onChange={(e) => onChangeValue(e)} />
                </form>
              </div>

              {userLogin?.token ? (
                <>
                  <Nav.Link onClick={() => handleShowCanvas()}>
                    <img src={iconMenu} alt="iconMenu" />
                  </Nav.Link>
                  <div className="NavBarLogin_ProfileName">
                    <BsFillBellFill onClick={handleClickNotification} className={notification ? "BellNotificationActive" : null} id="NavBarLogin_IconBell" /> <BsFillCircleFill onClick={handleClickNotification} className={notification ? "BellNotificationActive" : "BellNotificationFalse"} id="NavBarLogin_IconCircle" />
                    <Popper id={id} open={open} anchorEl={anchorEl} transition>
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Box className="NavBar_BoxContainer_Notifications">
                            <div className="NavBar_Container_Notifications">
                              <div className="NavBar_ContainerChildren_Notifications"></div>
                            </div>
                          </Box>
                        </Fade>
                      )}
                    </Popper>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <>
                          <p style={{ cursor: "pointer" }} {...bindTrigger(popupState)}>
                            Hi {userInfo?.userName}!
                          </p>

                          <Menu {...bindMenu(popupState)}>
                            {userInfo?.admin && <MenuItem onClick={() => navigate("/admin/home")}>My account</MenuItem>}
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                          </Menu>
                        </>
                      )}
                    </PopupState>
                  </div>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleShowLogIn} className={navBarBackground ? "hidden" : "NavBar_SignUp"}>
                    <Button text="Log in" />
                  </Nav.Link>
                  <Nav.Link onClick={() => handleShowCanvas()}>
                    <img src={iconMenu} alt="iconMenu" />
                  </Nav.Link>
                </>
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
