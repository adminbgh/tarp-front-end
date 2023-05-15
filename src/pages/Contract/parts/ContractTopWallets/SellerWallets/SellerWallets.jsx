/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"
import { useSelector } from "react-redux"

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

/* import boostrap */
import { Tooltip, OverlayTrigger } from "react-bootstrap"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { BsFlagFill, BsCircleFill, BsFlag, BsCircle } from "react-icons/bs"

import "./SellerWallets.css"

/*  UNA SOLA FILA DE LA TABLA CON TODAS SU PROPIEDADES */
function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

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
          {row.id}
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
          {row.wallet.address}
        </TableCell>
        <TableCell
          sx={{
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            whiteSpace: "nowrap"
          }}
          align="center"
        >
          {row.wallet.quantity}
        </TableCell>
        <TableCell
          sx={{
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            whiteSpace: "nowrap"
          }}
          align="center"
        >
          {row.wallet.percentage?.toFixed(4)}
          %
          <div className="ProgressBar_Center" />
        </TableCell>

        <TableCell
          sx={{
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter"
          }}
          align="center"
        >
          {`$${row.wallet.price}`}
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
              icon={<BsCircle style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
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
            color: "#B6B6B6",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "12px",
            flexWrap: "nowrap"
          }}
        >
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <p className="SellerWallets_DetailsButton" aria-label="expand row" onClick={() => setOpen(!open)}>
            Details {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </p>
        </TableCell>
      </TableRow>

      {/* Table Collapse */}

      <TableRow>
        <TableCell
          sx={{
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
                  {row.transactions.map((tr) => (
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
                      <TableCell>{tr?.type === "IN" ? <div className="ValueTrue">IN</div> : tr?.type === "OUT" ? <div className="ValueFalse">OUT</div> : null}</TableCell>
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

export default function SellerWallets() {
  const infoContract = useSelector((state) => state?.user?.infoContract.data.topWallets)
  return (
    <TableContainer className="TableContainer_Container" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ border: "none" }}>
            <TableCell
              sx={{
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
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            >
              Liquidity
            </TableCell>
            <TableCell
              sx={{
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            >
              Sells 7 days
            </TableCell>
            <TableCell
              sx={{
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
              align="center"
            >
              Sells 7 days value
            </TableCell>
            <TableCell
              sx={{
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
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            />
            <TableCell
              sx={{
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            />
            <TableCell
              sx={{
                color: "rgba(182, 182, 182, 0.35)",
                fontFamily: "Inter",
                fontWeight: "600",
                border: "none",
                whiteSpace: "nowrap"
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {infoContract?.map((row) => (
            <Row key={row?.data?.address} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
