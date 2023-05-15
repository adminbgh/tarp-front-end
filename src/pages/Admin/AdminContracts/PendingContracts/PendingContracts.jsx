/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Table } from "react-bootstrap"
import { adminGetListContract, adminGetTotalsHome, changeAutoApproval } from "../../../../store/actions/adminActions"
import PendingContractsTable from "./Table/PendingContractsTable"
import ModalAnalysis from "../Modal/ModalAnalysis"
import NavBarAdmin from "../../NavBar/NavBarAdmin"
import Loading from "../../../../components/Loading/Loading"
import LoginAdmin from "../../LoginAdmin/LoginAdmin"
import "./PendingContracts.scss"

function PendingContracts() {
  const dispatch = useDispatch()

  const infoPendings = useSelector((state) => state?.admin?.listContract)
  const autocomplete = useSelector((state) => state?.admin?.totalsHome?.autocomplete)

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false)
  const [contractAddress, setContractAddress] = useState()
  const [disabledButtom, setDisabledButtom] = useState(false)
  const [autoApproval, setAutoApproval] = useState(autocomplete)
  const [LoadingBoolean, setLoadingBoolean] = useState(true)

  /* useEffect use dispatch */
  useEffect(async () => {
    await dispatch(adminGetListContract("pendings"))
    setLoadingBoolean(false)
  }, [ModalAnalysis])

  if (LoadingBoolean) {
    return (
      <Container fluid className="PendingContracts_Container">
        <Loading />
      </Container>
    )
  }

  const onSwitch = async () => {
    if (!disabledButtom) {
      setDisabledButtom(true)
      const res = await dispatch(changeAutoApproval())
      setAutoApproval(res?.data?.autocomplete)
      dispatch(adminGetTotalsHome())
      setDisabledButtom(false)
    }
  }

  if (userLogin) {
    return (
      <Container fluid className="PendingContracts_Container">
        <NavBarAdmin />
        <ModalAnalysis AddressContract={contractAddress} setShowModal={setShowModal} showModal={showModal} />
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        <Container fluid className="PendingContracts_Container_Table">
          <Container className="PendingContracts_Container_Table">
            <div className="PendingContracts_Container_Buttons">
              <div>
                <h3>Last contracts | Pendings Contracts </h3>
              </div>
              <div className="PendingContracts_Container_Buttons">
                <div className={`containerSwitch flex loading-${disabledButtom}`}>
                  <h5>Auto approval.</h5>
                  <div class="toggler" onClick={onSwitch}>
                    <input checked={autoApproval || autocomplete} id={`toggler-1 loading-${disabledButtom}`} name="toggler-1" type="checkbox" value="1" />
                    <label for="toggler-1">
                      <svg class="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <polyline class="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
                      </svg>
                      <svg class="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <line class="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
                        <line class="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Row className="PendingContracts_Row_ContainerTable">
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
                  {infoPendings?.data?.map((data, idx) => (
                    <PendingContractsTable scam={data?.scam} setDisabledButtom={setDisabledButtom} disabledButtom={disabledButtom} setContractAddress={setContractAddress} setShowModal={setShowModal} key={data?.address} num={idx} name={data?.symbol} img={data?.img} marketCap={data?.tokenPrice} difVolume={data?.difVolume} segurityPoints={data?.tarpScore} address={data?.address} />
                  ))}
                </tbody>
              </Table>
            </Row>
            <Row className="PendingContracts_Row__Pagination">
              <Col>
                <p>
                  Showing 1-
                  {infoPendings?.data?.length} out of {infoPendings?.data?.length}
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

export default PendingContracts
