import React, { useState } from "react"
import { Col, Image, Stack, Container, Row } from "react-bootstrap"
import "./styles.scss"

import contractSVG from "../../../../images/icons/contractWhite.svg"
import balanceSVG from "../../../../images/icons/balanceWhite.svg"
import walletSVG from "../../../../images/icons/walletWhite.svg"
import arrowDown from "../../../../images/icons/arrowDown.svg"
import buy from "../../../../images/icons/buy.svg"
import advantisScore from "../../../../images/icons/advantisScore.svg"
import Button from "../../../../components/elements/Buttons"
import SimilarContracts from "../SimilarContracts/SimilarContracts"
import { useSelector } from "react-redux"
import ContractTopWallets from "../ContractTopWallets/ContractTopWallets"
import TarpScore from "../TarpScore/TarpScore"
import RiskAuditor from "../RiskAuditor/RiskAuditor"
import BuyAndChecker from "../BuyAndChecker/BuyAndChecker"
import LoadingTables from "../LoadingTables/LoadingTables"

function SelectTables({ setShowSecurity }) {
  const adminAnalysis = useSelector((state) => state?.user?.infoContract?.data?.adminAnalysis)
  const infoContract = useSelector((state) => state?.user?.infoContract)

  const [viewSimilar, setViewSimilar] = useState(false)
  const [viewTop10, setViewTop10] = useState(false)
  const [viewBuyAndSell, setViewBuyAndSell] = useState(false)
  const [viewTarpScore, setViewTarpScore] = useState(false)
  const [viewRiskAuditor, setViewRiskAuditor] = useState(false)
  const [viewAll, setViewAll] = useState(false)

  const hanldeSetView = () => {
    if (adminAnalysis?.similarContracts) {
      setViewSimilar(!viewSimilar)
    }
  }

  const hanldeSetViewTop10 = () => {
    setViewTop10(!viewTop10)
  }

  const hanldeSetViewTarpScore = () => {
    setViewTarpScore(!viewTarpScore)
  }

  const hanldeSetViewRiskAuditor = () => {
    setViewRiskAuditor(!viewRiskAuditor)
  }

  const hanldeSetViewBuyAndSell = () => {
    setViewBuyAndSell(!viewBuyAndSell)
  }

  const hanldeSetViewALL = () => {
    if (viewAll) {
      setViewBuyAndSell(false)
      setViewTop10(false)
      setViewSimilar(false)
      setViewRiskAuditor(false)
      setViewTarpScore(false)
      setViewAll(false)
      return
    }
    setViewBuyAndSell(true)
    setViewTop10(true)
    setViewSimilar(true)
    setViewRiskAuditor(true)
    setViewTarpScore(true)
    setViewAll(true)
    return
  }
  
  const Items = ({ img, title, onPress, check, sizeImg }) => {
    return (
      <Col sm={6} md={6} lg={4} className="containerSelectTables">
        <Col md={sizeImg || 3}>
          <Image src={img} />
        </Col>
        <Col className="title">
          <Stack gap={2} className="col-md-6 " style={{ marginLeft: '35px', marginRight: 'auto' }} >
            <h3>{title}</h3>
            <button onClick={() => onPress()} className={`select-${check}`}>
              <Image src={arrowDown} />
            </button>
          </Stack>
        </Col>
      </Col>
    )
  }

  return (
    <Container className="containerContract">
      {adminAnalysis && adminAnalysis?.contractDescription && (
      	<div style={{ width: '100%', padding: '15px', borderRadius: '8px', margin: '10px 0px 0px', backgroundColor: '#22a7f2', boxSizing: 'border-box'}}>{adminAnalysis?.contractDescription}</div>
      )}
      <Row>
        {adminAnalysis ? (
          <>
            <Items title="Top 10 wallets" img={walletSVG} onPress={hanldeSetViewTop10} check={viewTop10} /> <Items title="Similar contracts" img={contractSVG} onPress={hanldeSetView} check={viewSimilar} />
            <Items title="Buy and sell checker" img={buy} onPress={hanldeSetViewBuyAndSell} check={viewBuyAndSell} />
            <Items title="Risk weighting system" img={balanceSVG} onPress={hanldeSetViewRiskAuditor} check={viewRiskAuditor} />
            <Items title="Advantis.AI score" img={advantisScore} onPress={hanldeSetViewTarpScore} check={viewTarpScore} />
            <Col md className="containerButtonFullView">
              <Button text="Full view" onPress={() => hanldeSetViewALL()} />
            </Col>
          </>
        ) : (
          <>
            {infoContract?.data?.autoapprove ? (
              <>
                <Items sizeImg={4} loading title="Top 10 wallets" img={walletSVG} onPress={hanldeSetViewTop10} check={viewTop10} />
                <Col>
                  <LoadingTables />
                </Col>
              </>
            ) : (
              <Items sizeImg={12} loading title="Top 10 wallets" img={walletSVG} onPress={hanldeSetViewTop10} check={viewTop10} />
            )}
          </>
        )}
      </Row>
      <Col md={12}>{viewTop10 && <ContractTopWallets adminAnalysis={adminAnalysis} setView={hanldeSetViewTop10} setViewAll={hanldeSetViewALL} />}</Col>
      <Col md={12}>{viewSimilar && <SimilarContracts adminAnalysis={adminAnalysis} setView={hanldeSetView} setViewAll={hanldeSetViewALL} />}</Col>
      <Col md={12}>{viewBuyAndSell && <BuyAndChecker adminAnalysis={adminAnalysis} setShowSecurity={setShowSecurity} setView={hanldeSetViewBuyAndSell} setViewAll={hanldeSetViewALL} />}</Col>
      <Col md={12}>{viewRiskAuditor && <RiskAuditor adminAnalysis={adminAnalysis} setShowSecurity={setShowSecurity} setView={hanldeSetViewRiskAuditor} setViewAll={hanldeSetViewALL} />}</Col>
      <Col md={12}>{viewTarpScore && <TarpScore adminAnalysis={adminAnalysis} setShowSecurity={setShowSecurity} setView={hanldeSetViewTarpScore} setViewAll={hanldeSetViewALL} />}</Col>
    </Container>
  )
}

export default SelectTables
