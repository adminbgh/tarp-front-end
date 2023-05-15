import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./ContractTopWallets.css"

/* import components */
import { useDispatch, useSelector } from "react-redux"
/* import Boostrap */
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap"

import Alert from "@mui/material/Alert"

import SuspiciousWallets from "./SuspiciousWallets/SuspiciousWallets"
import MonitoringWallets from "./MonitoringWallets/MonitoringWallets"
import Holders from "./Holders/Holders"
import Button from "../../../../components/elements/Buttons"

function ContractTopWallets({ setView, setViewAll }) {
  const topWalletsDiff = useSelector((state) => state?.user?.topWalletsDiff) || []
  const user = JSON.parse(localStorage.getItem("user"))

  const [table, setTable] = useState("Holders")

  const changeTable = (e) => {
    setTable(e.target.name)
  }

  const contract = useSelector((state) => state?.user?.contract)

  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    address: contract
  })

  return (
    <Container fluid="xl" className="ContractTopWallets_Container">
      <Row className="Contract_Row_Container_Buttons">
        <Col sm={12} md={12} lg xl={6}>
          <p>
            Top 10 wallets <b>| Wallets with highest liquidity</b>
          </p>
        </Col>

        {user?.token ? (
          <Col sm={12} md={12} lg xl={6}>
            <div className="Contract_Col_Container_ButtonsClick">
              <button type="button" name="Holders" onClick={(e) => changeTable(e)} id="ContractTopWallets_ButtonHolder" className={table === "Holders" ? "Active" : "null"}>
                Holders
              </button>
              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
                <button type="button" name="MonitoringWallets" className={table === "MonitoringWallets" ? "Active" : "null"}>
                  Monitoring wallet
                </button>
              </OverlayTrigger>
              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
                <button type="button" name="SuspiciousWallets" className={table === "SuspiciousWallets" ? "Active" : "null"}>
                  Suspicious wallets
                </button>
              </OverlayTrigger>

              {/*  <button type='button' name="SellerWallets" className={table === "SellerWallets" ? "Active" : "null"} onClick={(e) => changeTable(e)}>Seller wallets</button> */}
            </div>
          </Col>
        ) : (
          <Col sm={12} md={12} lg xl={6}>
            <div className="Contract_Col_Container_ButtonsClick">
              <button type="button" name="Holders" onClick={(e) => changeTable(e)} id="ContractTopWallets_ButtonHolder" className={table === "Holders" ? "Active" : "null"}>
                Holders
              </button>
              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
                <button type="button" id="MonitoringWalletsDisabled" name="MonitoringWallets" className={table === "MonitoringWallets" ? "Active" : "null"}>
                  Monitoring wallet
                </button>
              </OverlayTrigger>

              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">PRO version exclusive</Tooltip>}>
                <button type="button" name="SuspiciousWallets" id="SuspiciousWallets" className={table === "SuspiciousWallets" ? "Active" : "null"}>
                  Suspicious wallets
                </button>
              </OverlayTrigger>

              {/*  <button type='button' name="SellerWallets" className={table === "SellerWallets" ? "Active" : "null"} onClick={(e) => changeTable(e)}>Seller wallets</button> */}
            </div>
          </Col>
        )}
      </Row>

      {/* CONTAINER TABLE */}
      {table === "Holders" ? <Holders key="holders" /> : table === "MonitoringWallets" ? <MonitoringWallets /> : table === "SuspiciousWallets" ? <SuspiciousWallets /> : <h3>TABLE NOT FOUND</h3>}
      {topWalletsDiff[0]?.totalPercentage >= 50 ? (
        <Alert variant="filled" severity="warning">
          More than 50% in the top ten wallets!
        </Alert>
      ) : (
        ""
      )}
      {/* MONITORING WALLET */}
      <Row>
        <Col md={2} className="containerButtonFullView">
          <Button secondary onPress={() => setView()} text="Close top 10 wallets" />
        </Col>
        {/*   <Col md={4} className="containerButtonFullView">
          <Button onPress={() => setViewAll()} text="Full view" />
        </Col> */}
      </Row>
    </Container>
  )
}

export default ContractTopWallets
