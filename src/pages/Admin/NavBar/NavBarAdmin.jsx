import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
/* utilidades Boostrap - Material UI */
import { Container, Navbar, Nav } from "react-bootstrap"
import Box from "@mui/material/Box"
import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import "./NavBarAdmin.scss"

/* importacion de iconos */

import { BiSearchAlt2 } from "react-icons/bi"

import { BsFillCircleFill, BsFillBellFill } from "react-icons/bs"
import AvatarUser from "../../../images/dinoLogo.png"
import { useNavigate } from "react-router"

function NavBar() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state?.user?.userLogged)

  /* HOOKS Y FUNCTIONS NAVBAR */

  const [navBarBackground, setNavBarBackgorund] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(true)

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

  /* LOG OUT */ /* LOG OUT */ /* LOG OUT */
  /* LOG OUT */ /* LOG OUT */ /* LOG OUT */
  /* LOG OUT */ /* LOG OUT */ /* LOG OUT */

  const logOut = () => {
    localStorage.removeItem("user")
    navigate("/admin")
  }

  return (
    <>
      {/* RENDER NAVBAR */}
      {/* RENDER NAVBAR */}

      {/*  /* NAVBAR LOG IN */
      /* NAVBAR LOG IN */
      /* NAVBAR LOG IN */
      /* NAVBAR LOG IN */
      /* NAVBAR LOG IN */
      /* NAVBAR LOG IN */}

      <Navbar fixed="top" variant="dark" expand="xxl">
        <Container className={navBarBackground ? "NavbarAdmin active" : "NavbarAdmin false"} fluid>
          {/* Logo */}
          <div className="NavBarAdmin_Logo">
            <Navbar.Brand>
              <Link to="/admin/home">
                <h5>Advantis AI admin dashboard</h5>
              </Link>
            </Navbar.Brand>
          </div>

          {/* Links */}

          <div className="NavBarAdmin_Links">
            {/* Searchbar */}

            <Nav className="me-auto">
              <div className="form">
                <div style={{ opacity: "0", cursor: "default" }}>
                  <i className="fa fa-search">
                    <BiSearchAlt2 />
                  </i>

                  <input type="text" className="form-control form-input" placeholder="Search project" />
                </div>
              </div>

              <Stack direction="row" spacing={3}>
                <div className="NavBarAdmin_NotificationContainer">
                  <BsFillBellFill onClick={handleClickNotification} className={notification ? "BellNotificationActive" : null} id="NavBarLogin_IconBell" /> <BsFillCircleFill onClick={handleClickNotification} className={notification ? "BellNotificationActive" : "BellNotificationFalse"} id="NavBarLogin_IconCircle" />
                  <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Box className="NavBarAdmin_BoxContainer_Notifications">
                          <div className="NavBarAdmin_Container_Notifications">
                            <div className="NavBarAdmin_ContainerChildren_Notifications">
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti impedit fugiat nisi sapiente veniam ipsa.</div>
                              <hr />
                            </div>
                          </div>
                        </Box>
                      </Fade>
                    )}
                  </Popper>
                </div>
                <div>
                  <Avatar alt="Remy Sharp" src={AvatarUser} />
                </div>
                <div>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <>
                        <p style={{ cursor: "pointer" }} {...bindTrigger(popupState)}>
                          Hi {userInfo?.userName}!
                        </p>
                        {/* <Button variant='contained' {...bindTrigger(popupState)}>
                          Dashboard
                        </Button> */}
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>Profile</MenuItem>
                          <MenuItem onClick={popupState.close}>My account</MenuItem>
                          <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                      </>
                    )}
                  </PopupState>
                </div>
              </Stack>
            </Nav>
          </div>
        </Container>
      </Navbar>

      {/* ----NAVBAR LOG IN---- */}
      {/* ----NAVBAR LOG IN---- */}
    </>
  )
}

export default NavBar
