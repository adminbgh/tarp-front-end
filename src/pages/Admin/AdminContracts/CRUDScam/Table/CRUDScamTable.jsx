/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./CRUDScamTable.css"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useDispatch } from "react-redux"
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { adminGetAllScam, adminDeleteScamContract } from "../../../../../store/actions/adminActions"

function CRUDScamTable({ address, network, name, num, setShowModal, setCRUDScamState, CRUDScamState }) {
  const dispatch = useDispatch()

  const handleShow = async () => {
    await setCRUDScamState({
      ...CRUDScamState,
      address,
      network,
      name: name || `Scam Contract #${num}${1}`
    })
    setShowModal(true)
  }
  const handleDeleteText = async () => {
    await dispatch(adminDeleteScamContract(address))
    await dispatch(adminGetAllScam())
    setShowModal(false)
  }

  return (
    <tr>
      <td>{num + 1}</td>
      <td style={{ width: "15%" }}>
        <div>{name || `Scam Contract #${num}${1}`}</div>
      </td>

      <td>
        <div className="td_Center">
          <div className="CRUDScamTable_ContractAddress_Div">
            <p>{`${address.substr(0, 8)}...${address.substr(9, 8)}`}</p>
          </div>
        </div>
      </td>

      <td>
        <div>
          <p>{network}</p>
        </div>
      </td>
      <td>
        <div>
          <button type="button" onClick={() => handleShow()}>
            View Scam
          </button>
        </div>
      </td>
      <td>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <BsThreeDotsVertical style={{ cursor: "pointer" }} {...bindTrigger(popupState)} />
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={() => handleDeleteText()}>Delete</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </td>
    </tr>
  )
}

export default CRUDScamTable
