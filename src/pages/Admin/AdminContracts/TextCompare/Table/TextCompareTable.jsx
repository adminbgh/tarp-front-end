import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TextCompareTable.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { adminGetCompareTexts, adminDeleteCompareText } from "../../../../../store/actions/adminActions";

function TextCompareTable({ text, id, num, setShowModal, setTextCompareState, textCompareState, name }) {
  const dispatch = useDispatch();

  const handleShow = async () => {
    await setTextCompareState({
      ...textCompareState,
      text,
      id,
      name: name || `Compare #${num}${1}`
    });
    setShowModal(true);
  };
  const handleDeleteText = async () => {
    await dispatch(adminDeleteCompareText(id));
    await dispatch(adminGetCompareTexts());
    setShowModal(false);
  };

  return (
    <tr>
      <td>{num + 1}</td>
      <td style={{ width: "15%" }}>
        <div>{name || `Compare #${num}${1}`}</div>
      </td>

      <td>
        <div className="td_Center">
          <div className="ContractAddress_Div">
            <p>{text}</p>
          </div>
        </div>
      </td>

      <td>
        <div>
          <button type="button" onClick={() => handleShow()}>
            View Text
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
  );
}

export default TextCompareTable;
