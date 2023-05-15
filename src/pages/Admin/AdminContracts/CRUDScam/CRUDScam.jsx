/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Table } from "react-bootstrap"
import Loading from "../../../../components/Loading/Loading"
import CRUDScamTable from "./Table/CRUDScamTable"
import NavBarAdmin from "../../NavBar/NavBarAdmin"
import ModalCRUDScam from "./Modal/ModalCRUDScam"
import { adminGetAllScam } from "../../../../store/actions/adminActions"

import "./CRUDScam.css"
import LoginAdmin from "../../LoginAdmin/LoginAdmin"

function CRUDScam() {
  const dispatch = useDispatch()

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const infoScamsContracts = useSelector((state) => state.admin?.allScams)
  const [showModal, setShowModal] = useState(false)
  const [CRUDScamState, setCRUDScamState] = useState("")
  const [LoadingBoolean, setLoadingBoolean] = useState(true)

  const handleShow = () => {
    setShowModal(true)
  }

  /* useEffect dispatch  */
  useEffect(async () => {
    await dispatch(adminGetAllScam())
    setLoadingBoolean(false)
  }, [])

  if (LoadingBoolean) {
    return (
      <Container fluid className="CRUDScam_Container">
        <Loading />
      </Container>
    )
  }

  if (userLogin) {
    return (
      <Container fluid className="CRUDScam_Container">
        <ModalCRUDScam setShowModal={setShowModal} showModal={showModal} setCRUDScamState={setCRUDScamState} CRUDScamState={CRUDScamState} />
        <NavBarAdmin />
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        <Container fluid className="CRUDScam_Container_Table">
          <Container className="CRUDScam_Container_Table">
            <div className="ApprovedContracts_Container_Buttons">
              <h3>Last contracts | Scams contracts </h3>
              <div className="ApprovedContracts_Container_Buttons">
                <button type="button" onClick={handleShow} style={{ marginRight: "5%", paddingBottom: "5%" }}>
                  New
                </button>
              </div>
            </div>
            <Row className="SecurityAudtis_Row_ContainerTable">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Text </th>
                    <th>Address</th>
                    <th>Network</th>
                  </tr>
                </thead>
                <tbody>
                  {infoScamsContracts?.scam?.map((data, idx) => (
                    <CRUDScamTable setCRUDScamState={setCRUDScamState} CRUDScamState={CRUDScamState} setShowModal={setShowModal} key={`${data?.address}-${idx}`} num={idx} id={data?._id} address={data?.address} name={data?.name} network={data?.network} />
                  ))}
                </tbody>
              </Table>
            </Row>
            <Row className="CRUDScam_Row__Pagination">
              <Col>
                <p>
                  Showing 1-
                  {infoScamsContracts?.scam?.length} out of {infoScamsContracts?.scam?.length}
                </p>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    )
  }
  return <LoginAdmin />
}

export default CRUDScam
