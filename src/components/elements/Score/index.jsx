import React, { useEffect, useState } from "react"
import "./styles.scss"
import secureScore from "../../../images/icons/secureScore.svg"
import dangerScore from "../../../images/icons/dangerScore.svg"
import mediumScore from "../../../images/icons/mediumScore.svg"
import { round } from "../../../services/formatNumbers"

function Score({ score }) {
  if (score >= 70)
    return (
      <div className={`containerScore Secure`}>
        <div className="flex">
          <img src={secureScore} alt="secureScore" /> <span>Score: {round(score)}</span>
        </div>
      </div>
    )
  if (score >= 40)
    return (
      <div className={`containerScore Medium`}>
        <div className="flex">
          <img src={mediumScore} alt="secureScore" /> <span>Score: {round(score)}</span>
        </div>
      </div>
    )
  if (score >= 1) {
    return (
      <div className={`containerScore Danger`}>
        <div className="flex">
          <img src={dangerScore} alt="secureScore" /> <span>Score: {round(score) || 0}</span>
        </div>
      </div>
    )
  }
  return <></>
}

export default Score
