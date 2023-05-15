/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react"
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

/* import boostrap */
import { ProgressBar, Tooltip, OverlayTrigger } from "react-bootstrap"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { BsFlagFill, BsCircleFill, BsFlag, BsCircle } from "react-icons/bs"
import { formatNumbers } from "../../../../../services/formatNumbers"
import { addToMonitoring } from "../../../../../store/actions/userActions"

import "./Holders.css"
import dayjs from "dayjs"

/*  UNA SOLA FILA DE LA TABLA CON TODAS SU PROPIEDADES */
function Row({ row, num }) {
  const dispatch = useDispatch()
  const contract = useSelector((state) => state?.user?.contract)
  const monitoringList = useSelector((state) => state?.user?.monitoringList.monitoringWallets)
  const network = useSelector((state) => state?.user?.infoContract?.data?.network)

  const [open, setOpen] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    wallet: row.wallet.address,
    address: contract
  })

  /* -----FUNCIONES---- */ /* -----FUNCIONES---- */ /* -----FUNCIONES---- */
  /* -----FUNCIONES---- */ /* -----FUNCIONES---- */ /* -----FUNCIONES---- */
  /* -----FUNCIONES---- */ /* -----FUNCIONES---- */ /* -----FUNCIONES---- */

  /* add Monitoring */
  const checkMonitoring = () => {
    dispatch(addToMonitoring(data))
      .then(() => {})
      .catch(() => {})
  }

  const isMonitoring = (address) => monitoringList?.filter((dataFilter) => dataFilter.address === address).length > 0

  return (
    <>
      <TableRow sx={{ color: "#B6B6B6", border: "none" }}>
        {/* PROPIEDADES POR FILAS */}
        {/* SX elijo color de cada componente */}
        <TableCell
          sx={{
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            whiteSpace: "nowrap"
          }}
          component="th"
          scope="row"
        >
          {num + 1}
        </TableCell>
        {/* walletID azul */}
        <TableCell
          onClick={() => setOpen(!open)}
          sx={{
            color: "#5097D5",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            cursor: "pointer",
            fontFamily: "Inter",
            whiteSpace: "nowrap"
          }}
          component="th"
          scope="row"
        >
          {row?.wallet?.address}
        </TableCell>
        <TableCell
          sx={{
            alignContent: "start",
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            whiteSpace: "nowrap"
          }}
          align="center"
        >
          {formatNumbers(row.wallet.quantity)}
        </TableCell>
        <TableCell
          sx={{
            textAlign: "left",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            whiteSpace: "nowrap"
          }}
          align="center"
        >
          {row.wallet.percentage?.toFixed(4)}%
          <div className="ProgressBar_Center">
            <ProgressBar now={row.wallet.percentage} />
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
          {`$${formatNumbers(row.wallet.price)}`}
        </TableCell>
        {/* Red Flag */}
        <TableCell
          sx={{
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          <OverlayTrigger overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
            {/* Checkbox de MUI */}
            <Checkbox
              icon={<BsFlag style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
              checkedIcon={
                <BsFlag
                  style={{
                    color: "rgba(255, 255, 255, 0.5)" /* Defino el color cuando este "Checked" */
                  }}
                />
              }
            />
          </OverlayTrigger>
        </TableCell>
        {/* BsCircle */}
        <TableCell
          sx={{
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          <OverlayTrigger overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
            {/* Checkbox de MUI */}
            <Checkbox
              className="BsCircle"
              /* checked={isMonitoring(row?.wallet?.address)} */
              icon={<BsCircle style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
              /* Propiedad Checket */

              checkedIcon={
                <BsCircle
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
            textAlign: "right",
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "12px",
            flexWrap: "nowrap"
          }}
        >
          <p className="Holders_DetailsButton" aria-label="expand row" onClick={() => setOpen(!open)}>
            Details {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </p>
        </TableCell>
      </TableRow>

      {/* Table Collapse */}

      <TableRow>
        <TableCell
          sx={{
            alignItems: "flex-start",
            alignContent: "start",
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
              <Table
                sx={{
                  textAlign: "left",
                  alignContent: "start",
                  color: "#B6B6B6",
                  border: "none",
                  fontFamily: "Inter"
                }}
                aria-label="purchases"
              >
                <TableHead
                  sx={{
                    color: "#B6B6B6",
                    border: "none",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    fontSize: "14px",
                    whiteSpace: "nowrap"
                  }}
                >
                  <TableRow
                    sx={{
                      color: "#B6B6B6",
                      border: "none",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      fontSize: "14px",
                      whiteSpace: "nowrap"
                    }}
                  >
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
                      Date
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
                  {row?.transactions?.map((tr) => (
                    <TableRow key={tr?.txnHash}>
                      <TableCell
                        sx={{
                          color: "#5097D5",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                        component="th"
                        scope="row"
                      >
                        <a className="Holders_TxnHashLink" href={network == "ETH" ? `https://etherscan.io/tx/${tr?.txnHash}` : `https://bscscan.com/tx/${tr?.txnHash}`} target="_blank" rel="noreferrer">
                          {tr?.txnHash?.substring(0, 20)}
                          ...
                        </a>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FEFEFE",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
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
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        {tr?.age && dayjs(tr?.age * 1000).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#5097D5",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <a className="Holders_TxnHashLink" href={network == "ETH" ? `https://etherscan.io/address/${tr?.from}` : `https://bscscan.com/address/${tr?.from}`} target="_blank" rel="noreferrer">
                          {tr?.from?.substring(0, 20)}
                          ...
                        </a>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        {tr?.type === "IN" ? <div className="ValueTrue">IN</div> : tr?.type === "OUT" ? <div className="ValueFalse">OUT</div> : null}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#5097D5",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <a className="Holders_TxnHashLink" href={network == "ETH" ? `https://etherscan.io/address/${tr?.to}` : `https://bscscan.com/address/${tr?.to}`} target="_blank" rel="noreferrer">
                          {tr?.to?.substring(0, 20)}
                          ...
                        </a>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FEFEFE",
                          cursor: "pointer",
                          fontFamily: "Inter",
                          fontWeight: "400",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        {formatNumbers(tr?.quantity)}
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

export default function Holders() {
  const topWallets = useSelector((state) => state?.user?.topWallets)

  return (
    <TableContainer className="TableContainer_Container" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ textAlign: "left", border: "none" }}>
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            >
              #
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            >
              Monitored wallet
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            >
              Percentage
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            >
              Value
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            />

            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            />
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            />
            <TableCell
              sx={{
                textAlign: "left",
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody sx={{ alignItems: "start", textAlign: "left" }}>
          {topWallets?.map((row, idx) => (
            <Row key={row?.wallet?.address} row={row} num={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
