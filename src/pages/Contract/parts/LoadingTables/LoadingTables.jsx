import React from "react"
import "./LoadingTables.css"
import LoadingContract from "../../../../images/loading-contract-2x.gif"

function LoadingTables() {
  return (
    <div className="LoadingTables_Container">
      <div className="LoadingTables_Container_Image">
        <img src={LoadingContract} alt="Loading..." />
        <p className="LoadingTables_Text"> We are loading the information of this contract. Please wait a moment...</p>
      </div>
    </div>
  )
}

export default LoadingTables
