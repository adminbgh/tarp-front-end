import React from "react"
import { Col } from "react-bootstrap"

function Statistics({ title, icon, data, subData, button, lpToken, network, tokenAddress }) {
  const openLink = () => {
    if (button == "Team Finance") window.open(`https://www.team.finance/view-coin/${tokenAddress}`, "_blank")
    if (button == "Pink Finance") window.open(`https://www.pinksale.finance/pinklock/detail/${tokenAddress}`, "_blank")
    if (button == "Unicrypt") {
      if (network == "ETH") window.open(`https://app.unicrypt.network/amm/uni-v2/pair/${lpToken}`, "_blank")
      if (network == "BSC") window.open(`https://app.unicrypt.network/amm/pancake-v2/pair/${lpToken}`, "_blank")
    }
  }

  return (
    <Col sm={12} md={4} xl={4}>
      <div onClick={() => openLink()} className="Contract_ContainerInfo">
        <div className="Contract_Statistics_Title">
          <h4>{title}</h4>
          <h3>{icon}</h3>
        </div>
        <div className="Contract_Statistics_Info">
          <h2>{data || "000 000"}</h2>
        </div>
        <div className="Contract_Statistics_Text">
          <p>{subData && subData}</p>
          <p className="Contract_NameLink">{button && button}</p>
        </div>
      </div>
    </Col>
  )
}

export default Statistics
