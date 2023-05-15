/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Table } from "react-bootstrap"
import TextCompareTable from "./Table/TextCompareTable"
import NavBarAdmin from "../../NavBar/NavBarAdmin"
import ModalTextCompare from "./Modal/ModalTextCompare"
import { adminGetCompareTexts } from "../../../../store/actions/adminActions"
import Loading from "../../../../components/Loading/Loading"

import "./TextCompare.css"
import LoginAdmin from "../../LoginAdmin/LoginAdmin"

function TextCompare() {
  const dispatch = useDispatch()

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const infoCompareTexts = useSelector((state) => state.admin?.compareTexts)
  const [showModal, setShowModal] = useState(false)
  const [textCompareState, setTextCompareState] = useState("")
  const [LoadingBoolean, setLoadingBoolean] = useState(true)

  const handleShow = () => {
    setShowModal(true)
  }

  /* useEffect dispatch  */
  useEffect(async () => {
    await dispatch(adminGetCompareTexts())
    setLoadingBoolean(false)
  }, [])

  if (LoadingBoolean) {
    return (
      <Container fluid className="TextCompare_Container">
        <Loading />
      </Container>
    )
  }

  if (userLogin) {
    return (
      <Container fluid className="TextCompare_Container">
        <ModalTextCompare setShowModal={setShowModal} showModal={showModal} setTextCompareState={setTextCompareState} textCompareState={textCompareState} />
        <NavBarAdmin />
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        <Container fluid className="TextCompare_Container_Table">
          <Container className="TextCompare_Container_Table">
            <div className="ApprovedContracts_Container_Buttons">
              <h3>Last contracts | Text Compare </h3>
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
                    <th>Text description</th>
                    <th>Network</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {infoCompareTexts?.data?.map((data, idx) => (
                    <TextCompareTable setTextCompareState={setTextCompareState} textCompareState={textCompareState} setShowModal={setShowModal} key={data?._id} num={idx} id={data?._id} text={data?.text} name={data?.name} />
                  ))}
                </tbody>
              </Table>
            </Row>
            <Row className="TextCompare_Row__Pagination">
              <Col>
                <p>
                  Showing 1-
                  {infoCompareTexts?.data?.length} out of {infoCompareTexts?.data?.length}
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

export default TextCompare
