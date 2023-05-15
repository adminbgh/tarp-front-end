import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./TarpScore.css"
import { BsDot } from "react-icons/bs"
import { Container, Row, Col, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap"
import Button from "../../../../components/elements/Buttons"
import { useDispatch } from "react-redux"
import { showModalLogin, showModalSecurity } from "../../../../store/actions/userActions"
import { AiOutlineInfoCircle } from "react-icons/ai"

function TarpScore({ adminAnalysis, setShowLogInRequest, setView }) {
  const dispatch = useDispatch()
  const userLogin = JSON.parse(localStorage.getItem("user"))
  const [valueScore, setValueScore] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setValueScore(adminAnalysis?.totalScore?.score ? adminAnalysis?.totalScore?.score : 0)
    }, 400)
  }, [])

  const handleShowModal = (data) => {
    if (userLogin?.token) dispatch(showModalSecurity(data))
    if (!userLogin?.token) dispatch(showModalLogin(data))
  }

  const ItemScore = ({ name, score, total, description, scoreBottom, scoreTop }) => {
    const ColorDot = () => {
      if (score == 0 || score == null || score == undefined) {
        return (
          <>
            <BsDot className={"BuyAndChecker_ApprovedDot danger"} /> High
          </>
        )
      }
      if (score <= scoreBottom) {
        return (
          <>
            <BsDot className={"BuyAndChecker_ApprovedDot danger"} /> High
          </>
        )
      }
      if (score <= scoreTop && score >= scoreBottom) {
        return (
          <>
            <BsDot className={"BuyAndChecker_ApprovedDot warning"} /> Mid
          </>
        )
      }
      return (
        <>
          <BsDot className={"BuyAndChecker_ApprovedDot success"} /> Low
        </>
      )
    }

    return (
      <div className="ModalAnalysis_Inputs_TarpScore">
        <Col style={{ textAlign: "start" }} sm={5} md={4}>
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={
              <Tooltip id="tooltip-top">
                <strong>{name}</strong> {description}
              </Tooltip>
            }
          >
            <div className="flexSpace">
              <label style={{ textAlign: "start" }}>{name}</label>
              <AiOutlineInfoCircle />
            </div>
          </OverlayTrigger>
        </Col>
        <div className="Container_DropDown">
          <div>
            <p>
              {score ? score : "0"}/{total && total}
            </p>
          </div>
        </div>
        <div className="Container_DropDown">
          <div style={{ width: "20%" }}>
            <p>
              <ColorDot />
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Container className="TarpScore_Container">
      <Container>
        <Row>
          <Col md={12}>
            <p className="MediumAuditor_Title" style={{ textAlign: "left", paddingBottom: "50px", fontWeight: 700, fontSize: "24px" }}>
              ADVANTIS.AI Score <b style={{ opacity: 0.5, fontWeight: 500, fontSize: "18px" }}>| Relative medium or safety of the project</b>
            </p>
          </Col>
        </Row>

        <Row className="Container_Inputs">
          <Col sm={12} lg={6}>
            <div style={{ textAlign: "start" }} className="ModalAnalysis_Inputs_TarpScore">
              <Col style={{ textAlign: "start" }} sm={5}>
                <div>
                  <p className="BuyAndChecker_Titles"># Stat name</p>
                </div>
              </Col>
              <div className="Container_DropDown">
                <div>
                  <p className="BuyAndChecker_Titles"> Weighted value</p>
                </div>
              </div>
              <div className="Container_DropDown">
                <div>
                  <p className="BuyAndChecker_Titles">Assessment</p>
                </div>
              </div>
            </div>
            <ItemScore name="Similarity with contracts" description="is defined as using the same functions as other contracts. Due to the scope of the Solidity language, some of these are redundant and must be included but you should be wary the lower the score becomes." score={adminAnalysis?.similarityWithScam?.score} total="43" scoreBottom={15} scoreTop={28} />
            <ItemScore
              name="Locked liquidity"
              description="is the restriction of assets from trading or transferring via time-locked smart contracts. This provides investors assurance that their funds will not be mishandled or misused by developers and will be released on a specific date or after certain conditions are met."
              score={adminAnalysis?.liquidityLocket?.score}
              total="9"
              scoreBottom={2}
              scoreTop={6}
            />
            <ItemScore
              name="Code analysis"
              description="is the process of reviewing and evaluating the source code of a smart contract to identify potential issues or vulnerabilities. This can include analyzing the contract's logic and functionality, as well as checking for security bugs and potential attack vectors."
              score={adminAnalysis?.codeAnalysis?.score}
              total="43"
              scoreBottom={20}
              scoreTop={35}
            />
            <ItemScore name="Renounced" description="contracts in crypto refers to the process of giving up control over a smart contract by removing the ability to make further changes to it." score={adminAnalysis?.renounced?.score} total="5" scoreBottom={1} scoreTop={4} />
          </Col>

          <Col sm={12} lg={6}>
            <div className="ModalAnalysis_ContainerScore TarpScore">
              <h2
                style={{
                  fontSize: "40px",
                  paddingBottom: "0",
                  marginTop: "15px"
                }}
              >
                Score: {adminAnalysis?.totalScore?.score ? (adminAnalysis?.totalScore?.score > 100 ? 100 : adminAnalysis?.totalScore?.score) : 0}
              </h2>
              <ProgressBar variant={adminAnalysis?.totalScore?.score < 45 ? "danger" : adminAnalysis?.totalScore?.score < 70 ? "warning" : "success"} now={valueScore} />
              <h4>Risk level: {adminAnalysis?.totalScore?.score < 45 ? "High" : adminAnalysis?.totalScore?.score < 70 ? "Medium" : "Low"}</h4>
	  {/* <p>You are prepared to accept that the value will fluctuate (volatility) with the aim of achieving higher returns in the medium to long term. You accept that there is an increased (higher) medium of capital loss over choosing more low medium projects.</p> */}

              <button type="button" name="Holders" className="TarpScore_ButtonRequest" onClick={() => handleShowModal(true)}>
                Request new analysis
              </button>
            </div>
          </Col>
          <Col md={2} className="containerButtonFullView">
            <Button secondary onPress={() => setView()} text="Close Advantis.AI score" />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default TarpScore
