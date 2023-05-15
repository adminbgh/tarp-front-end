import React, { useState } from "react"
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

import "./SuspiciousWallets.scss"

/* import boostrap */
import { ProgressBar, Tooltip, OverlayTrigger, Col } from "react-bootstrap"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { BsFlagFill, BsCircleFill, BsCircle } from "react-icons/bs"
import { BiSearchAlt2 } from "react-icons/bi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

function createData(id, walletId, quantity, percentage, value) {
  return {
    id,
    walletId,
    quantity,
    percentage,
    value,
    details: [
      {
        txnHash: "0x6cda3996f0ed4c6469...",
        method: "Transfer",
        age: "3 days 8 hr ago",
        from: "0xffd1edb6973aa7ac4af...",
        value: true,
        to: "0x000...dE...",
        quantity: "0.562051477738206862"
      },
      {
        txnHash: "0x6cda3996f0ed4c3570...",
        method: "Transfer",
        age: "3 days 8 hr ago",
        from: "0xffd1edb6973aa7ac4af...",
        value: false,
        to: "0x000...dE...",
        quantity: "0.562051477738206862"
      },
      {
        txnHash: "0x6cd23csda996f0ed4c3570...",
        method: "Transfer",
        age: "3 days 8 hr ago",
        from: "0xffd1edb6973aa7ac4af...",
        value: true,
        to: "0x000...dE...",
        quantity: "0.562051477738206862"
      },
      {
        txnHash: "0x6cda3996523dsd4c3570...",
        method: "Transfer",
        age: "3 days 8 hr ago",
        from: "0xffd1edb6973aa7ac4af...",
        value: true,
        to: "0x000...dE...",
        quantity: "0.562051477738206862"
      }
    ]
  }
}

const rows = []

/*  UNA SOLA FILA DE LA TABLA CON TODAS SU PROPIEDADES */
function Row(props) {
  const { row, num } = props
  const [open, setOpen] = React.useState(false)

  const stylesTableHead = {
    color: "#B6B6B6",
    border: "none",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "14px"
  }

  const stylesTableCell = {
    color: "#5097D5",
    cursor: "pointer",
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "14px"
  }
  const stylesTableCell2 = {
    color: "#FEFEFE",
    cursor: "pointer",
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "14px",
    whiteSpace: "nowrap"
  }
  const stylesTableCell3 = {
    color: "#5097D5",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    cursor: "pointer",
    fontFamily: "Inter"
  }
  const stylesTableCell4 = {
    color: "#5097D5",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    cursor: "pointer",
    fontFamily: "Inter"
  }

  return (
    <>
      <TableRow sx={{ color: "#B6B6B6", border: "none" }}>
        {/* PROPIEDADES POR FILAS */}

        <TableCell sx={stylesTableCell3} component="th" scope="row">
          {num + 1}
        </TableCell>
        {/* walletID azul */}
        <TableCell sx={stylesTableCell4} component="th" scope="row">
          {row.walletId}
        </TableCell>
        <TableCell sx={stylesTableCell3} align="center">
          {row.quantity}
        </TableCell>
        <TableCell sx={stylesTableCell3} align="center">
          {row.percentage}
          <div className="ProgressBar_Center">
            <ProgressBar now={36} />
          </div>
        </TableCell>

        <TableCell sx={stylesTableCell3} align="center">
          {row.value}
        </TableCell>
        {/* Red Flag */}
        <TableCell sx={stylesTableCell3} align="center">
          <OverlayTrigger overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
            {/* Checkbox de MUI */}
            <Checkbox
              className="BsFlag"
              icon={
                <BsFlagFill
                  style={{
                    color: "rgba(147, 34, 29, 1)" /* Defino el color cuando este "Checked" */
                  }}
                />
              }
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
        <TableCell sx={stylesTableCell3} align="center">
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
          <p className="SuspiciousWallets_DetailsButton" aria-label="expand row" onClick={() => setOpen(!open)}>
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
                <TableHead sx={stylesTableHead}>
                  <TableRow sx={stylesTableHead}>
                    <TableCell sx={stylesTableHead}>Txn Hash</TableCell>
                    <TableCell sx={stylesTableHead}>Method</TableCell>
                    <TableCell sx={{ ...stylesTableHead, whiteSpace: "nowrap" }}>Age</TableCell>
                    <TableCell sx={{ ...stylesTableHead, whiteSpace: "nowrap" }}>From</TableCell>
                    <TableCell sx={{ ...stylesTableHead, whiteSpace: "nowrap" }} />
                    <TableCell sx={{ ...stylesTableHead, whiteSpace: "nowrap" }}>To</TableCell>
                    <TableCell sx={{ ...stylesTableHead, whiteSpace: "nowrap" }}>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details?.map((historyRow) => (
                    <TableRow key={historyRow.txnHash}>
                      <TableCell sx={stylesTableCell} component="th" scope="row">
                        {historyRow.txnHash}
                      </TableCell>
                      <TableCell sx={stylesTableCell2}>{historyRow.method}</TableCell>
                      <TableCell sx={stylesTableCell2}>{historyRow.age}</TableCell>
                      <TableCell sx={stylesTableCell}>{historyRow.from}</TableCell>
                      <TableCell>{historyRow.value ? <div className="ValueTrue">IN</div> : <div className="ValueFalse">OUT</div>}</TableCell>
                      <TableCell sx={stylesTableCell}>{historyRow.to}</TableCell>
                      <TableCell sx={stylesTableCell2}>{historyRow.quantity}</TableCell>
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
  const [value, setValue] = useState("")

  const searchValue = (e) => {
    setValue(e.target.value)
  }

  const styleCell = {
    color: "rgba(255, 255, 255, 0.75)",
    fontFamily: "Inter",
    fontWeight: "600",
    border: "none"
  }

  return (
    <div className="SuspiciousWallets_Container">
      <Col sm={5}>
        <div className="SuspiciousWallets_Container_Search">
          <div>
            <div className="form">
              <form>
                <div className="SuspiciousWallets_ContainerCenter_Search">
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
              <TableCell sx={styleCell}>#</TableCell>
              <TableCell sx={styleCell}>Monitored wallet</TableCell>
              <TableCell sx={styleCell} align="center">
                Quantity
              </TableCell>
              <TableCell sx={styleCell} align="center">
                percentage
              </TableCell>
              <TableCell sx={styleCell} align="center">
                Value
              </TableCell>
              <TableCell sx={styleCell} align="center" />

              <TableCell sx={styleCell} />
              <TableCell sx={styleCell} />
              <TableCell sx={styleCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={idx} row={row} num={idx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
