import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./SimilarContractsTable.css"
import { Dropdown } from "react-bootstrap"
import _ from "lodash"

function SimilarContractsTable({ similarity, address, AddressContract, num, name, description, setModalInfoCreate, ModalInfoCreate, setModalInfo, ModalInfo }) {
  const handleChange = (e) => {
    if (ModalInfoCreate) {
      const ultimoSimilarContractCreate = ModalInfoCreate.similarContracts?.reverse().find((similar) => similar.address === address) || {}
      if (e.target.name === "similarity") {
        return setModalInfoCreate({
          ...ModalInfoCreate,
          similarContracts: _.uniqBy(
            [
              ...(ModalInfoCreate.similarContracts || []),
              {
                ...ultimoSimilarContractCreate,
                address,
                [e.target.name]: Number(e.target.value)
              }
            ].reverse(),
            "address"
          )
        })
      }

      return setModalInfoCreate({
        ...ModalInfoCreate,
        similarContracts: _.uniqBy(
          [
            ...(ModalInfoCreate.similarContracts || []),
            {
              ...ultimoSimilarContractCreate,
              address,
              [e.target.name]: e.target.value
            }
          ].reverse(),
          "address"
        )
      })
    }

    const ultimoSimilarContract = ModalInfo.similarContracts?.reverse().find((similar) => similar.address === address) || {}

    console.log("ModalInfo array objeto", {
      ...ModalInfo,
      address: AddressContract,
      similarContracts: _.uniqBy(
        [
          ...(ModalInfo.similarContracts || []),
          {
            ...ultimoSimilarContract,
            address,
            [e.target.name]: e.target.value
          }
        ].reverse(),
        "address"
      )
    })

    return setModalInfo({
      ...ModalInfo,
      address: AddressContract,
      similarContracts: _.uniqBy(
        [
          ...(ModalInfo.similarContracts || []),
          {
            ...ultimoSimilarContract,
            address,
            [e.target.name]: e.target.value
          }
        ].reverse(),
        "address"
      )
    })
  }

  return (
    <tr>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="imgSimilarContracts" width="35px" height="35px" style={{ borderRadius: "100%" }}></div>
          <p>
            <input
              type="text"
              name="name"
              className="InputName"
              defaultValue={name || `Project ${num}`}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </p>
        </div>
      </td>

      <td>
        <div className="td_Center">
          <div className="Div_InputSimilarity">
            <p>% Similarity</p>
          </div>
          <div>
            <input
              type="number"
              name="similarity"
              className="InputSimilarity"
              defaultValue={similarity}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            <p id="PorcentajeInput">%</p>
          </div>
        </div>
      </td>

      <td>
        <div className="td_Center">
          <div className="Div_InputSimilarity ">
            <p>Description</p>
          </div>
          <div style={{ width: "70%" }}>
            <input
              type="text"
              name="description"
              className="InputSimilarityText"
              defaultValue={description || null}
              placeholder="Missing Input Validation"
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="Container_DropDown">
          <div>
            <p>Risk</p>
          </div>

          <div>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-button-dark-example1" className="SimilarContracts_DropDown" variant="secondary">
                Medium
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="#/action-1">Minor</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                <Dropdown.Item href="#/action-3">High</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default SimilarContractsTable
