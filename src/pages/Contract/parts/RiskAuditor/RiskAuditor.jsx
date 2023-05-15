import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./RiskAuditor.css"
import { Container, Row, Col } from "react-bootstrap"
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"

import "react-circular-progressbar/dist/styles.css"
import Button from "../../../../components/elements/Buttons"

function RiskAuditor({ adminAnalysis, setView }) {
  /*  colores constantes de riesgos / ORDEN:  verde --> amarillo --> rojo */

  const ItemProgress = ({ value, text, text2 }) => {
    const [valueScore, setValueScore] = useState(0)

    useEffect(() => {
      setTimeout(() => {
        setValueScore(value)
      }, 800)
    }, [])

    /*  colores constantes de riesgos / ORDEN:  verde --> amarillo --> rojo */
    const colorSimilarity = value < 45 ? "#22A7F2" : value < 70 ? "#22A7F2" : "#22A7F2"

    return (
      <Col className="RiskAuditor_Col" sm={6} md={4}>
        <div className="RiskAuditor_DivCircle flex">
          <h5>
            {text} <br /> {text2 && text2}
          </h5>
          <CircularProgressbarWithChildren
            strokeWidth={10}
            value={valueScore ? valueScore : 0}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 1,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "18px",
              fontWeight: "600",
              fontFamily: "Inter",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 3,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: colorSimilarity,
              textColor: "#ffffff",
              trailColor: "rgba(196, 196, 196, 0.05)",
              backgroundColor: "rgba(196, 196, 196, 0.05)"
            })}
          >
            <h4>{value ? `${value.toFixed(1)}%` : "0%"}</h4>
          </CircularProgressbarWithChildren>
        </div>
      </Col>
    )
  }

  return (
    <Container className="RiskAuditor_Container">
      <Container>
        <Row>
          <Col sm={12}>
            <p className="RiskAuditor_Title" style={{ textAlign: "start", paddingBottom: "50px" }}>
              Risk weighting system <b>| Risk weighting system to evaluate crypto contracts for security vulnerabilities. </b>
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row gap={7}>
          <ItemProgress value={adminAnalysis?.similarityWithScam?.percentage} text="Contract similarity weighting" />
          <ItemProgress value={adminAnalysis?.liquidityLocket?.percentage} text="Liquidity weighting" />
          <ItemProgress value={adminAnalysis?.codeAnalysis?.percentage} text="Code weighting" />
        </Row>
	  {/* <Row>
          <Col sm={12} md={7}>
            <p className="RiskAuditor_TextFooter">{adminAnalysis?.contractDescription ? adminAnalysis?.contractDescription : ""} </p>
          </Col>
        </Row> */}
        <Col md={2} className="containerButtonFullView">
          <Button secondary onPress={() => setView()} text="Close risk auditor" />
        </Col>
      </Container>
    </Container>
  )
}

export default RiskAuditor
