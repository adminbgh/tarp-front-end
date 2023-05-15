import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SecurityAuditsTable.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { adminGetOneAudits, adminGetAllAudits, adminDeleteOneAudits } from "../../../../../store/actions/adminActions";

function SecurityAuditsTable({ name, email, contract, num, network, setShowModal, id }) {
  const dispatch = useDispatch();
  const handleShow = async () => {
    await dispatch(adminGetOneAudits(id));
    setShowModal(true);
  };
  const handleDelete = async () => {
    await dispatch(adminDeleteOneAudits(id));
    await dispatch(adminGetAllAudits());
    setShowModal(false);
  };

  return (
    <tr>
      <td>{num + 1}</td>
      <td>
        <div>{name}</div>
      </td>

      <td>
        <div className="td_Center">
          <div className="ContractAddress_Div">
            <p>{`${contract.substr(0, 15)}...`}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="Network_Center">{network}</div>
      </td>
      <td>
        <p>{email}</p>
      </td>

      <td>
        <div>
          <button type="button" onClick={() => handleShow()}>
            Show request
          </button>
        </div>
      </td>
      <td>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <BsThreeDotsVertical style={{ cursor: "pointer" }} {...bindTrigger(popupState)} />
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </td>
    </tr>
  );
}

export default SecurityAuditsTable;
