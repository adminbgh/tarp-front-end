import { Container, Row, Col, Image, Stack } from "react-bootstrap"
import React from "react"
import Button from "../../../../components/elements/Buttons"
import JustinIMG from "../../../../images/JustinIMG.png"
import MattIMG from "../../../../images/MattIMG.png"
import twitter from "../../../../images/icons/twitter.svg"
import youtube from "../../../../images/icons/youtube.svg"

function AboutUs() {
  function openLink(link) {
    return window.open(link, "_blank")
  }

  return (
    <Container fluid className="Container_AboutUs">
      <Container>
        <Row>
          <Col md={6}>
            <div className="containerTextAbout">
              <h2>ABOUT US</h2>
              <p>Developers Matt and Justin have been heavily involved in cryptocurrency for a combined total of 24 years. After witnessing numerous rug pulls, honeypots and scams, they knew something had to change.</p>
              <p>Together, they launched TARP Token in December 2021 with a mission to create a safe environment for every type of crypto investor while giving them the resources they need to thrive in the crypto space!</p>
              <p>Advantis AI is powered by Advantis Token. Advantis AI will be evolving into Advantis Token in December 2022.</p>
            </div>
            <div className="containerButton flex pointer">
              <Button text="Buy TARP" onPress={() => openLink("https://pancakeswap.finance/swap?outputCurrency=0x6C0A568a3fFb61957812fb3e300e4C10B708d336")} />
              <p className="LearnMore" onClick={() => openLink("https://pancakeswap.finance/swap?outputCurrency=0x6C0A568a3fFb61957812fb3e300e4C10B708d336")}>
                Learn more
              </p>
            </div>
          </Col>
          <Col md={{ span: 3, offset: 3 }}>
            <div className="ContainerDescription">
              <Image src={MattIMG} alt="Matt" />

              <div>
                <h4>
                  Matt M. <span>CEO</span>
                </h4>
              </div>
              <div className="flexStart socialMedia">
                <Image src={twitter} onClick={() => openLink("https://twitter.com/mattmortier")}></Image>
                <Image src={youtube} onClick={() => openLink("https://www.youtube.com/c/mattmortiercrypto")}></Image>
              </div>
            </div>
            <div className="ContainerDescription">
              <Image src={JustinIMG} alt="Justin" />

              <div>
                <h4>
                  Justin H. <span>CTO</span>
                </h4>
              </div>
              <div className="flexStart socialMedia">
                <Image src={twitter} onClick={() => openLink("https://twitter.com/justmoonshot")}></Image>
                <Image src={youtube} onClick={() => openLink("https://www.youtube.com/c/justmoonshot")}></Image>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default AboutUs
