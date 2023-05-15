import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./RejectedContractsTable.css"
import { Image, ProgressBar } from "react-bootstrap"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { formatNumbers } from "../../../../../services/formatNumbers"
import { adminGetOneAnalysis, adminGetSimilarContracts, adminMarkScam, adminUnCheckScam, adminGetListContract } from "../../../../../store/actions/adminActions"
import gradient from "../../../../../images/LogoDisabled.png"

function RejectedContractsTable({ name, img, marketCap, difVolume, segurityPoints, num, setShowModal, address, setContractAddress }) {
  const dispatch = useDispatch()
  const [disabledButtom, setDisabledButtom] = useState(false)
  const handleShow = async () => {
    setDisabledButtom(true)
    await dispatch(adminGetSimilarContracts(address))
    await dispatch(adminGetOneAnalysis(address))
    setContractAddress(address)
    setShowModal(true)
    setDisabledButtom(false)
  }

  const handleMarkScam = async () => {
    setDisabledButtom(true)
    await dispatch(adminMarkScam(address))
    await dispatch(adminGetListContract("rejected"))
    alert("Contract marked as scam")
    setDisabledButtom(false)
  }

  const handleUnCheckScam = async () => {
    setDisabledButtom(true)
    await dispatch(adminUnCheckScam(address))
    await dispatch(adminGetListContract("rejected"))
    alert("Contract unmarked as scam")
    setDisabledButtom(false)
  }

  return (
    <tr>
      <td>{num + 1}</td>
      <td>
        <div>
          <Image
            src={img === "https://ethplorer.io/undefined" ? gradient : img || gradient}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = gradient
            }}
            width="28px"
            height="28px"
            fluid
            style={{ borderRadius: "50px" }}
          />
          <p> {name}</p>
        </div>
      </td>

      <td>
        <div className="td_Center">
          <div className="MarketCap_Div">
            <p>{formatNumbers(marketCap ? marketCap.toFixed(1) : 0)}</p>
          </div>
          <div>
            <p className={Math.sign(difVolume || 0) === -1 ? "td_Negative" : "td_Positive"}>{difVolume || 0}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="ProgressBar_Center">
          <p>{formatNumbers(Math.round(segurityPoints))}</p>
          <ProgressBar variant={segurityPoints < 40 ? "danger" : segurityPoints < 70 ? "warning" : "success"} now={segurityPoints} />
        </div>
      </td>
      <td>
        <div className="RejectedContractsTable_Td_ButtonCheck">
          {/* MARK BUTTON */}
          <button type="button" disabled style={{ cursor: "no-drop", opacity: "0.4" }} onClick={() => handleMarkScam()}>
            <svg width="15" height="15" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.941406 10.334C1.03906 10.4316 1.15234 10.4961 1.28125 10.5273C1.41406 10.5586 1.54492 10.5586 1.67383 10.5273C1.80273 10.4961 1.91406 10.4336 2.00781 10.3398L5.5 6.84766L8.99219 10.3398C9.08594 10.4336 9.19727 10.4961 9.32617 10.5273C9.45508 10.5586 9.58398 10.5586 9.71289 10.5273C9.8418 10.4961 9.95508 10.4316 10.0527 10.334C10.1504 10.2363 10.2148 10.123 10.2461 9.99414C10.2773 9.86523 10.2773 9.73633 10.2461 9.60742C10.2148 9.47852 10.1523 9.36719 10.0586 9.27344L6.57227 5.77539L10.0586 2.2832C10.1523 2.18945 10.2148 2.07812 10.2461 1.94922C10.2812 1.82031 10.2812 1.69141 10.2461 1.5625C10.2148 1.43359 10.1504 1.32227 10.0527 1.22852C9.95508 1.12695 9.8418 1.06055 9.71289 1.0293C9.58398 0.998047 9.45508 0.998047 9.32617 1.0293C9.19727 1.06055 9.08594 1.12305 8.99219 1.2168L5.5 4.70898L2.00781 1.2168C1.91406 1.12305 1.80078 1.06055 1.66797 1.0293C1.53906 0.998047 1.4082 0.998047 1.27539 1.0293C1.14648 1.06055 1.03516 1.125 0.941406 1.22266C0.84375 1.32031 0.779297 1.43359 0.748047 1.5625C0.720703 1.69141 0.720703 1.82227 0.748047 1.95508C0.779297 2.08398 0.841797 2.19336 0.935547 2.2832L4.42773 5.77539L0.935547 9.27344C0.841797 9.36719 0.779297 9.47852 0.748047 9.60742C0.716797 9.73633 0.716797 9.86523 0.748047 9.99414C0.779297 10.123 0.84375 10.2363 0.941406 10.334Z"
                fill="#B6B6B6"
              />
            </svg>
          </button>
        </div>
      </td>
      <td>
        <div className="RejectedContractsTable_Td_ButtonCheck">
          {/* UNMARK BUTTON */}
          <button type="button" disabled={disabledButtom} onClick={() => handleUnCheckScam()}>
            <svg width="15" height="15" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.29297 11.0371C4.64062 11.0371 4.9082 10.8945 5.0957 10.6094L10.5801 2.125C10.6465 2.02344 10.6953 1.92578 10.7266 1.83203C10.7578 1.73828 10.7734 1.64453 10.7734 1.55078C10.7734 1.32031 10.6973 1.13086 10.5449 0.982422C10.3926 0.833984 10.1973 0.759766 9.95898 0.759766C9.79492 0.759766 9.6582 0.792969 9.54883 0.859375C9.43945 0.921875 9.33398 1.03125 9.23242 1.1875L4.26953 9.05078L1.72656 5.82812C1.54297 5.59766 1.31641 5.48242 1.04688 5.48242C0.808594 5.48242 0.611328 5.55859 0.455078 5.71094C0.298828 5.86328 0.220703 6.05664 0.220703 6.29102C0.220703 6.39648 0.238281 6.49805 0.273438 6.5957C0.3125 6.69336 0.375 6.79297 0.460938 6.89453L3.49609 10.6328C3.71484 10.9023 3.98047 11.0371 4.29297 11.0371Z"
                fill="#B6B6B6"
              />
            </svg>
          </button>
        </div>
      </td>

      <td>
        <div>
          <button type="button" disabled={disabledButtom} style={disabledButtom ? { cursor: "progress" } : { cursor: "pointer" }} onClick={() => handleShow()}>
            Manage analysis
          </button>
        </div>
      </td>
      <td>
        <BsThreeDotsVertical />
      </td>
    </tr>
  )
}

export default RejectedContractsTable
