/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import "bootstrap/dist/css/bootstrap.min.css"
import "./MonitoringWallets.scss"

/* import boostrap */
import { ProgressBar, Tooltip, OverlayTrigger, Col } from "react-bootstrap"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { BsFlagFill, BsCircleFill, BsFlag } from "react-icons/bs"
import { BiSearchAlt2 } from "react-icons/bi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { removeToMonitoring } from "../../../../../store/actions/userActions"

/*  UNA SOLA FILA DE LA TABLA CON TODAS SU PROPIEDADES */
function Row(props) {
  const { row, num } = props
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const contract = useSelector((state) => state?.user?.contract)

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    address: contract
  })
  /* -----FUNCIONES---- */ /* -----FUNCIONES---- */ /* -----FUNCIONES---- */
  /* -----FUNCIONES---- */ /* -----FUNCIONES---- */ /* -----FUNCIONES---- */
  /* -----FUNCIONES---- */ /* -----FUNCIONES---- */ /* -----FUNCIONES---- */

  const deleteMonitoring = () => {
    dispatch(removeToMonitoring(row?.address))
      .then(() => {})
      .catch(() => {
        null
      })
  }

  return (
    <>
      <TableRow sx={{ textAlign: "left", color: "#B6B6B6", border: "none" }}>
        {/* PROPIEDADES POR FILAS */}
        {/* SX elijo color de cada componente */}
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          component="th"
          scope="row"
        >
          {num + 1}
        </TableCell>
        {/* walletID azul */}
        <TableCell
          sx={{
            textAlign: "left",
            color: "#5097D5",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            cursor: "pointer",
            fontFamily: "Inter"
          }}
          component="th"
          scope="row"
        >
          {row?.address}
        </TableCell>
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          {row?.quantity}
        </TableCell>
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          {row?.percentage?.toFixed(4)}%
          <div className="ProgressBar_Center">
            <ProgressBar now={row?.percentage} />
          </div>
        </TableCell>

        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          {`$${row?.price}`}
        </TableCell>
        {/* Red Flag */}
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          <OverlayTrigger overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
            {/* Checkbox de MUI */}
            <Checkbox
              className="BsFlag"
              icon={<BsFlag style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
              checkedIcon={
                <BsFlagFill
                  style={{
                    color: "rgba(147, 34, 29, 1)" /* Defino el color cuando este "Checked" */
                  }}
                />
              }
            />
          </OverlayTrigger>
        </TableCell>
        {/* BsCircle */}
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          <OverlayTrigger overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
            {/* Checkbox de MUI */}
            <Checkbox
              onClick={() => deleteMonitoring()}
              className="BsCircle"
              icon={
                <BsCircleFill
                  style={{
                    color: "rgba(233, 203, 136, 1)" /* Defino el color cuando este "Checked" */
                  }}
                />
              }
              /* Propiedad Checket */
              checkedIcon={
                <BsCircleFill
                  style={{
                    color: "rgba(233, 203, 136, 1)" /* Defino el color cuando este "Checked" */
                  }}
                />
              }
            />
          </OverlayTrigger>
        </TableCell>

        {/* Details + Ternario Arrow  */}
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "12px",
            flexWrap: "nowrap"
          }}
        >
          <p className="MonitoringWallests_DetailsButton" aria-label="expand row" onClick={() => setOpen(!open)}>
            Details {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </p>
        </TableCell>
      </TableRow>

      {/* Table Collapse */}
      <TableRow>
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            border: "none",
            fontFamily: "Inter",
            background: "rgba(255, 255, 255, 0.05)"
          }}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table sx={{ color: "#B6B6B6", border: "none", fontFamily: "Inter" }} aria-label="purchases">
                <TableHead
                  sx={{
                    color: "#B6B6B6",
                    border: "none",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}
                >
                  <TableRow
                    sx={{
                      color: "#B6B6B6",
                      border: "none",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      fontSize: "14px"
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px"
                      }}
                    >
                      Txn Hash
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Method
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Age
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      From
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    />
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      To
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#B6B6B6",
                        border: "none",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.transactions?.transactions?.map((tr) => (
                    <TableRow key={tr?.txnHash}>
                      <TableCell
                        sx={{
                          color: "#5097D5",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap"
                        }}
                        component="th"
                        scope="row"
                      >
                        {tr?.txnHash?.substring(0, 20)}
                        ...
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FEFEFE",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {tr?.method}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FEFEFE",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {tr?.age}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#5097D5",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {tr?.from?.substring(0, 20)}
                        ...
                      </TableCell>
                      <TableCell>{tr?.type === "IN" ? <div className="ValueTrue">IN</div> : tr?.type === "OUT" ? <div className="ValueFalse">OUT</div> : "null"}</TableCell>
                      <TableCell
                        sx={{
                          color: "#5097D5",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {tr?.to?.substring(0, 20)}
                        ...
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FEFEFE",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {tr?.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

/* RENDERIZA LA TABLA Y MAPEAMOS LA TABLA DE ARRIBA
         RECORRIENDO TODAS LAS PROPIEDADES          */

export default function MonitoringWallets() {
  const [value, setValue] = useState("")

  const searchValue = (e) => {
    setValue(e.target.value)
  }
  const message = useSelector((state) => state?.user?.message)
  const monitoringList = useSelector((state) => state?.user?.monitoringList.monitoringWallets)
  const uniqueArray = monitoringList?.filter((valueArr, index, self) => index === self.findIndex((t) => t?.address === valueArr?.address && t?.percentage === valueArr?.percentage))
  if (message === "contract not found") {
    return (
      <div className="MonitoingWallets_Container">
        <Col sm={5}>
          <div className="MonitoringWallets_Container_Search">
            <div>
              <div className="form">
                <form>
                  <div className="MonitoringWallests_ContainerCenter_Search">
                    <i className="fa fa-search">
                      <BiSearchAlt2 />
                    </i>

                    <input type="text" className="form-control form-input" placeholder="Search project" onChange={(e) => searchValue(e)} />
                    <button type="button" disabled={!(value.length >= 26)} className={value.length >= 26 ? "Enable" : "null"}>
                      Search wallet <HiOutlineArrowNarrowRight />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Col>
        <TableContainer className="TableContainer_Container" component={Paper}>
          <Table sx={{ background: "rgba(255, 255, 255, 0.05)" }} aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ border: "none" }}>
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                >
                  Monitored wallet
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                  align="center"
                >
                  percentage
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                  align="center"
                >
                  Value
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                  align="center"
                />

                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                />
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                />
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    border: "none"
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              <h1>ASDASD</h1>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  return (
    <div className="MonitoingWallets_Container">
      <Col sm={5}>
        <div className="MonitoringWallets_Container_Search">
          <div>
            <div className="form">
              <form>
                <div className="MonitoringWallests_ContainerCenter_Search">
                  <i className="fa fa-search">
                    <BiSearchAlt2 />
                  </i>

                  <input type="text" className="form-control form-input" placeholder="Search project" onChange={(e) => searchValue(e)} />
                  <button type="button" disabled={!(value.length >= 26)} className={value.length >= 26 ? "Enable" : "null"}>
                    Search wallet <HiOutlineArrowNarrowRight />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Col>
      <TableContainer className="TableContainer_Container" component={Paper}>
        <Table sx={{ background: "rgba(255, 255, 255, 0.05)" }} aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ textAlign: "left", border: "none" }}>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
              >
                Monitored wallet
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
                align="center"
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
                align="center"
              >
                percentage
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
                align="center"
              >
                Value
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
                align="center"
              />

              <TableCell
                sx={{
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
              />
              <TableCell
                sx={{
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
              />
              <TableCell
                sx={{
                  color: "rgba(255, 255, 255, 0.75)",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  border: "none"
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueArray?.map((row, idx) => (
              <Row key={row?.address} row={row} num={idx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
