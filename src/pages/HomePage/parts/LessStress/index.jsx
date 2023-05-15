import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import ImageLessStress from "../../../../images/BackgroundLessStress.png"
import Divider from "../../../../images/divider.svg"
/* import Eclipse from "../../../../images/eclipse.svg" */

function LessStress() {
  return (
    <Container fluid className="containerLessStress">
      <Row className="RowLessStress">
        <Col md={5}>
          <Image fluid src={ImageLessStress} alt="ImageLessStress" />
        </Col>
        <Col md={4} className="containerTextLessStress">
          <h2>
            LESS STRESS. <br /> MORE CONFIDENCE FOR EVERY CRYPTO INVESTOR.
          </h2>
          <p>There are so many crypto scams, but few people have a tech-savvy background to know what to look out for.</p>
          <br />
          <p>With Advantis.AI, the self-learning AI, you can easily understand the risks whether you’re just beginning in crypto or have been around for a while - so you can make more informed decisions in the tokens you’re interested in.</p>
          <img src={Divider} alt="Divider" />
          <br />
        </Col>
      </Row>
      <div className="eclipse"> </div>
    </Container>
  )
}

export default LessStress
