/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Table } from "react-bootstrap"
import NavBarAdmin from "../../NavBar/NavBarAdmin"
import SecurityAuditsTable from "./Table/SecurityAuditsTable"
import ModalSecurity from "./Modal/ModalSecurity"
import { adminGetAllAudits } from "../../../../store/actions/adminActions"
import Loading from "../../../../components/Loading/Loading"

import "./SecurityAudits.css"
import LoginAdmin from "../../LoginAdmin/LoginAdmin"

function SecurityAudits() {
  const dispatch = useDispatch()

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const infoAllAudits = useSelector((state) => state.admin?.allAudits)
  const infoOneAudit = useSelector((state) => state.admin?.oneAudit.audit)
  const [showModal, setShowModal] = useState(false)
  const [LoadingBoolean, setLoadingBoolean] = useState(true)

  /* useEffect dispatch  */
  useEffect(async () => {
    await dispatch(adminGetAllAudits())
    setLoadingBoolean(false)
  }, [])

  if (LoadingBoolean) {
    return (
      <Container fluid className="SecurityAudits_Container">
        <Loading />
      </Container>
    )
  }

  if (userLogin) {
    return (
      <Container fluid className="SecurityAudits_Container">
        <ModalSecurity setShowModal={setShowModal} showModal={showModal} name={infoOneAudit?.name} contract={infoOneAudit?.contract} email={infoOneAudit?.email} network={infoOneAudit?.network} description={infoOneAudit?.description} date={infoOneAudit?.date} id={infoOneAudit?._id} />
        <NavBarAdmin />
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        <Container fluid className="SecurityAudits_Container_Table">
          <Container className="SecurityAudits_Container_Table">
            <h3>Last contracts </h3>
            <Row className="SecurityAudtis_Row_ContainerTable">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Requested by</th>
                    <th>Contract address</th>
                    <th>Network</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {infoAllAudits?.audits?.map((data, idx) => (
                    <SecurityAuditsTable setShowModal={setShowModal} key={data?.address} num={idx} name={data?.name} contract={data?.contract} email={data?.email} network={data?.network} description={data?.description} date={data?.date} id={data?._id} />
                  ))}
                </tbody>
              </Table>
            </Row>
            <Row className="SecurityAudits_Row__Pagination">
              <Col>
                <p>
                  Showing 1-
                  {infoAllAudits?.audits?.length} out of {infoAllAudits?.audits?.length}
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

export default SecurityAudits
