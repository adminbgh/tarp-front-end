import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Table } from "react-bootstrap"
import RejectedContractsTable from "./Table/RejectedContractsTable"
import ModalAnalysis from "../Modal/ModalAnalysis"
import "./RejectedContracts.css"
import NavBarAdmin from "../../NavBar/NavBarAdmin"
import { adminGetListContract } from "../../../../store/actions/adminActions"
import Loading from "../../../../components/Loading/Loading"
import LoginAdmin from "../../LoginAdmin/LoginAdmin"

function RejectedContracts() {
  const dispatch = useDispatch()

  const infoApproved = useSelector((state) => state?.admin?.listContract)

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false)
  const [contractAddress, setContractAddress] = useState()
  const [disabledButtom, setDisabledButtom] = useState(false)
  const [LoadingBoolean, setLoadingBoolean] = useState(true)

  /* useEffect use dispatch */
  useEffect(async () => {
    await dispatch(adminGetListContract("rejected"))
    setLoadingBoolean(false)
  }, [])

  if (LoadingBoolean) {
    return (
      <Container fluid className="RejectedContracts_Container">
        <Loading />
      </Container>
    )
  }

  if (userLogin) {
    return (
      <Container fluid className="RejectedContracts_Container">
        <NavBarAdmin />
        <ModalAnalysis AddressContract={contractAddress} setShowModal={setShowModal} showModal={showModal} />
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        <Container fluid className="RejectedContracts_Container_Table">
          <Container className="RejectedContracts_Container_Table">
            <div className="RejectedContracts_Container_Buttons">
              <div>
                <h3>Last contracts | Rejected Contracts</h3>
              </div>
              <div className="RejectedContracts_Container_Buttons">
                <button type="button" disabled style={{ opacity: "0.3" }}>
                  New
                </button>
                <button type="button" disabled style={{ opacity: "0.3" }}>
                  Disputing
                </button>
              </div>
            </div>
            <Row className="RejectedContracts_Row_ContainerTable">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project name</th>
                    <th>Token price</th>
                    <th>ADVANTIS AI Score</th>
                  </tr>
                </thead>
                <tbody>
                  {infoApproved?.data?.map((data, idx) => (
                    <RejectedContractsTable setDisabledButtom={setDisabledButtom} disabledButtom={disabledButtom} setContractAddress={setContractAddress} setShowModal={setShowModal} key={data?.address} num={idx} name={data?.symbol} img={data?.img} marketCap={data?.tokenPrice} difVolume={data?.difVolume} segurityPoints={data?.tarpScore} address={data?.address} />
                  ))}
                </tbody>
              </Table>
            </Row>
            <Row className="RejectedContracts_Row__Pagination">
              <Col>
                <p>
                  Showing 1-
                  {infoApproved?.data?.length} out of {infoApproved?.data?.length}
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

export default RejectedContracts
