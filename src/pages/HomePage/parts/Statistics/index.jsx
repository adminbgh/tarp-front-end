/*eslint-disable */
import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"

/* import Images */
import { formatNumbers } from "../../../../services/formatNumbers"

function Statistics() {
  const infoHomeData = useSelector((state) => state?.user?.homeData)

  const Item = ({ text, text2, dataNumber }) => (
    <Col sm={12} xl={12} className="containerCol">
      <div className="ContainerInfo">
        <div className="Statistics_Info">
          <h2>{formatNumbers(dataNumber) || "0"}</h2>
          <h4>{text}</h4>
        </div>
        <div className="Statistics_Text">
          <p>
            {formatNumbers(dataNumber) || "0"} {text2}
          </p>
        </div>
      </div>
    </Col>
  )

  return (
    <Container fluid="sm" className="HomePage_Container_Statistics">
      <Row className="HomePage_Row_Statistics">
        <h4>We care about you and the safety of your investment</h4>
        <Item text="Contracts analyzed" text2="this week" dataNumber={infoHomeData?.contractsWeek} />
	  {/* <Item text="Scams detected" text2="scams detected this week" dataNumber={infoHomeData?.scamDetect} /> */}
      </Row>
    </Container>
  )
}

export default Statistics
