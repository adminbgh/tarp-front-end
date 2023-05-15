import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Footer, NavBar } from "../../components"
import Eclipse from "../../components/elements/eclipse"
import AboutUs from "./Parts/AboutUs"
import { isMobile } from "react-device-detect"
import "./styles.scss"
function AboutPage() {
  return (
    <>
      <NavBar />
      <Container fluid className="AboutPage_Container">
        <div className="Gradient">
          <Container className="containerText flex">
            <Row className="justify-content-md-center">
              <Col sm={12}>
                <h2>OUR MISSION</h2>
              </Col>
              <Col sm={12}>
                <h3>Make crypto a safer space for every investor.</h3>
              </Col>
              <Col sm={12} md={9} className="flex">
                <p>
                  You shouldn’t have to guess if a crypto project is safe. With Advantis.AI, we will help you protect yourself from rug pulls, honeypots, malicious code, and more. <br /> Start scanning a contract and protect your crypto portfolio today!
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
      <Eclipse styles={{ top: "100vh", right: "-15%", width: "50%", height: "50%" }} className={isMobile ? "hidden" : "null"} />
      <AboutUs />
      <Footer />
    </>
  )
}

export default AboutPage
