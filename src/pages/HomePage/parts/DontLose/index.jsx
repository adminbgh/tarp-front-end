import React from "react"
import { Container, Row, Col } from "react-bootstrap"
/* import Eclipse from "../../../../images/eclipse.svg" */
import Divider from "../../../../images/divider.svg"

function DontLose({ showSignUp }) {
  return (
    <Container fluid className="containerDontLose">
      <Container className="containerTexts">
        <Row>
          <Col md={6}>
            <h2>
              DON’T LOSE MONEY ON CRYPTO <br /> SCAMS
            </h2>
            <p>
              Crypto scams are everywhere, but they aren’t easily
              <br /> recognizable.
            </p>
            <br />
            <p>
              You deserve to be knowledgable so you can protect yourself <br />
              and your investments.
            </p>
            <img src={Divider} alt="Divider" />
            <br />
            <h5 onClick={() => showSignUp()}>Sign up</h5>
          </Col>
        </Row>
        <div className="eclipse"> </div>
      </Container>
    </Container>
  )
}

export default DontLose
