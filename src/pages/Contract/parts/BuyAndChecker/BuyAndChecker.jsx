import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./BuyAndChecker.css"
import { useDispatch, useSelector } from "react-redux"
import { BsDot } from "react-icons/bs"
import { Container, Row, Col, Stack } from "react-bootstrap"
import Skeleton from "@mui/material/Skeleton"
import { searchBuyAndSell } from "../../../../store/actions/userActions"
import Button from "../../../../components/elements/Buttons"

import ChartBuyAndSell from "./Charts"
import { CircularProgress } from "@mui/material"

function BuyAndChecker({ setView }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const contract = useSelector((state) => state?.user?.contract)
  const infoBuyAndSell = useSelector((state) => state?.user?.buyAndSell)

  useEffect(async () => {
    setLoading(true)
    await dispatch(searchBuyAndSell(contract)).then(() => setLoading(false))
  }, [])

  const SwitchChart = (chart) => {
    if (loading)
      return (
        <div className="flex" style={{ height: "100%", flexDirection: 'column' }}>
          <CircularProgress />
	  <div style={{ marginTop: '10px' }}>Loading buy and sell data</div>
        </div>
      )
    if (!infoBuyAndSell?.data?.totalTransactions || infoBuyAndSell?.data?.totalTransactions < 1) return <ChartBuyAndSell noData />
    return <ChartBuyAndSell />
  }

  return (
    <Container className="BuyAndChecker_Container">
      <Container>
        <Row className="BuyAndChecker_Row_Container_Buttons">
          <Col sm={12} xl={12}>
            <p className="BuyAndChecker_Title" style={{ textAlign: "start", paddingBottom: "15px" }}>
              Buy and sell checker <b>| Check if the functionalities of the contract can be executed</b>
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row style={{ height: "100%" }}>
          <Col sm={12} md={6} style={{ minHeight: "270px" }}>
            <SwitchChart />
          </Col>
          <Col sm={12} md={6}>
            <Container style={{ paddingTop: "35px" }}>
              <Stack direction="horizontal" gap={2}>
                <div>
                  <p className="BuyAndChecker_Titles">Total transactions</p>
                </div>
              </Stack>
            </Container>
            <Container>
              <Stack direction="vertical" gap={4}>
                {loading || !infoBuyAndSell?.data?.totalTransactions || infoBuyAndSell?.data?.totalTransactions < 1 ? (
                  <div></div>
                ) : (
                  <>
                    <div>
                      <p className="BuyAndChecker_Texts">{infoBuyAndSell?.data?.totalTransactions ? `${infoBuyAndSell?.data?.totalTransactions} transactions` : "0"} </p>
                    </div>
                    <Stack direction="horizontal" gap={4}>
                      <div>
                        <p className="BuyAndChecker_Texts">{infoBuyAndSell?.data?.sellsPercentage <= 2 ? "" : "This token is able to be bought"} </p>
                      </div>
                      <div>
                        <p className="BuyAndChecker_Texts">{infoBuyAndSell?.data?.sellsPercentage < 2 ? "This token as less that 2% of sells. This could be a sign of a honeypot" : "This token is able to be sold"} </p>
                      </div>
                    </Stack>
                  </>
                )}
              </Stack>
            </Container>
          </Col>
          <Col>
            <Stack direction="horizontal" gap={5}>
              <div>
                <p className="BuyAndChecker_Texts">Buy and sell from the last 5k blocks</p>
              </div>
              <div>
                <p className="BuyAndChecker_Texts">
                  <BsDot className="BuyAndChecker_ApprovedDot buy" /> Buy
                </p>
              </div>
              <div>
                <p className="BuyAndChecker_Texts">
                  <BsDot className="BuyAndChecker_ApprovedDot sell" /> Sell
                </p>
              </div>
            </Stack>
          </Col>
        </Row>
        <Col md={2} className="containerButtonFullView">
          <Button secondary onPress={() => setView()} text="Close buy and sell" />
        </Col>
      </Container>
    </Container>
  )
}

export default BuyAndChecker
