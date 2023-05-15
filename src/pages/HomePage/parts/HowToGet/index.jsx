import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import iphoneIMG from "../../../../images/iphone.svg"
import Button from "../../../../components/elements/Buttons"

function HowToGet({ showLogin, showSignUp }) {
  return (
    <Container fluid className="containerHowToGet">
      <Row>
        <Col md={4} className="containerTextLessStress">
          <h2>HOW TO GET NOTIFIED IF A CONTRACT CHANGES</h2>
	  {/* <p>Create a free account and track your crypto portfolio! </p>
          <br />
          <p>Would you like to enhance your investing experience even further?</p> */}
	  <br />
          <p>Coming soon: Advantis.AI PRO. <br/> Get notified when a project you’re invested in changes certain contract code or when the liquidity lock is expired and more!</p>
          <br />
          <Col className="containerSignUp" style={{ display: 'flex' }}>
            <Button text="Sign up" onPress={() => showSignUp()} />
            <p style={{ marginLeft: '15px' }}>
              Already have an account? <span style={{ cursor: 'pointer' }} onClick={() => showLogin()}> Log in.</span>
            </p>
          </Col>
        </Col>
        <Col md={5}>
          <Image fluid src={iphoneIMG} alt="iphoneIMG" />
        </Col>
      </Row>
      <div className="eclipse"> </div>
    </Container>
  )
}

export default HowToGet
