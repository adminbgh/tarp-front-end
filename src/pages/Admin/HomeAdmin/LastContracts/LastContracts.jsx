import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router"
import { Image, ProgressBar } from "react-bootstrap"
import { BsDot } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { formatNumbers } from "../../../../services/formatNumbers"
import { checkContract, searchContract, setNullInfoContract } from "../../../../store/actions/userActions"
import gradientImg from "../../../../images/LogoDisabled.png"
import "./LastContracts.css"

function LastContracts({ name, img, segurityPoints, num, type, address, tokenPrice, scam }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleShowProject = async (e) => {
    e.preventDefault()
    await dispatch(checkContract(e.target.name))
      .then(() => {
        dispatch(searchContract(e.target.name))
        dispatch(setNullInfoContract())
        navigate("/contract")
      })
      .catch(() => {
        setOpen(true)
        setReadLoading(false)
        setError(true)
      })
  }
  return (
    <tr>
      <td>{num + 1}</td>
      <td>
        <div>
          <Image
            src={img === "https://ethplorer.io/undefined" ? "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg" : img || "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = gradientImg
            }}
            fluid
            style={{ borderRadius: "50px", height: "30px", width: "30px" }}
          />
          <p>{name}</p>
        </div>
      </td>
      <td>
        <div className="ProgressBar_Center">
          <p>{formatNumbers(Math.round(segurityPoints))}</p>
          <ProgressBar variant={segurityPoints < 40 ? "danger" : segurityPoints < 70 ? "warning" : "success"} now={segurityPoints} />
        </div>
      </td>
      <td>
        <div className="td_Center">
          <div className="MarketCap_Div">
            <p>{formatNumbers(tokenPrice ? tokenPrice.toFixed(1) : 0)}</p>
          </div>
        </div>
      </td>

      <td>
        <BsDot className={scam ? "LastContracts_ApprovedDot danger" : type === "analized" ? "LastContracts_ApprovedDot success" : "LastContracts_ApprovedDot warning"} /> {scam ? "Rejected " : type === "analized" ? "Approved" : "Pending"}
      </td>
      <td>
        <div>
          <button type="button" name={address} onClick={(e) => handleShowProject(e)}>
            Show project
          </button>
        </div>
      </td>
    </tr>
  )
}

export default LastContracts
