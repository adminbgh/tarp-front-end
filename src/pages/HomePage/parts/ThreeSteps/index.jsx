/*eslint-disable */
import React from "react"
import { Container, Col, Row } from "react-bootstrap"
import Button from "../../../../components/elements/Buttons"

function ThreeSteps({ step1, step2, step3, background, button, tittle }) {
  const Item = ({ img, text, text2 }) => (
    <Col md={4}>
      <div className="container">
        <img src={img} alt={text} />
        <span>{text}</span>
        <br />
        {text2 && <p>{text2}</p>}
      </div>
    </Col>
  )

  return (
    <Container fluid className={`three-step-container background-${background}`}>
      {tittle && <h4>{tittle?.text}</h4>}

      <Row>
        <Item img={step1?.img} text={step1?.text} text2={step1?.text2} />
        <Item img={step2?.img} text={step2?.text} text2={step2?.text2} />
        <Item img={step3?.img} text={step3?.text} text2={step3?.text2} />
      </Row>
      <Row className="justify-content-md-center">
        <Col md={2}>{button && <Button text="Analyze" onPress={() => button.scroll()} />}</Col>
      </Row>
    </Container>
  )
}

export default ThreeSteps
