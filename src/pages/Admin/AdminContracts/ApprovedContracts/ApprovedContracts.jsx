import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap"
import ApprovedContractsTable from "./Table/ApprovedContractsTable"
import ModalAnalysis from "../Modal/ModalAnalysis"
import NavBarAdmin from "../../NavBar/NavBarAdmin"
import { adminClearListContract, adminGetListContract } from "../../../../store/actions/adminActions"
import Loading from "../../../../components/Loading/Loading"
import "./ApprovedContracts.scss"
import LoginAdmin from "../../LoginAdmin/LoginAdmin"
import { colors, styled, TextField } from "@mui/material"

function ApprovedContracts() {
  const dispatch = useDispatch()

  const userLogin = JSON.parse(localStorage.getItem("user"))

  const infoApproved = useSelector((state) => state?.admin?.listContract)

  const [showModal, setShowModal] = useState(false)
  const [contractAddress, setContractAddress] = useState()
  const [disabledButtom, setDisabledButtom] = useState(false)
  const [LoadingBoolean, setLoadingBoolean] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [filterContracts, setFilterContracts] = useState([])
  const [tableRows, setTableRows] = useState(10)

  useEffect(async () => {
    setLoadingBoolean(true)
    await dispatch(adminClearListContract())
    await dispatch(adminGetListContract("analyzed"))
    setFilterContracts(infoApproved?.data)
    setLoadingBoolean(false)
  }, [])

  useEffect(async () => {
    setFilterContracts(infoApproved?.data)
  }, [infoApproved?.data])

  const handleSearch = (e) => {
    setSearchText(e.target.value)

    //filter infoApproved?.data? by name
    const filtered = infoApproved?.data?.filter((data) => {
      return data?.symbol?.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilterContracts(filtered)
  }

  if (LoadingBoolean) {
    return (
      <Container fluid className="ApprovedContracts_Container">
        <Loading />
      </Container>
    )
  }

  if (userLogin) {
    return (
      <Container fluid className="ApprovedContracts_Container">
        <NavBarAdmin />
        <ModalAnalysis AddressContract={contractAddress} setShowModal={setShowModal} showModal={showModal} />
        {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
        <Container fluid className="ApprovedContracts_Container_Table">
          <Container className="ApprovedContracts_Container_Table">
            <div className="ApprovedContracts_Container_Buttons">
              <div>
                <h3>Last contracts Approved Contracts</h3>
              </div>
              <div className="ApprovedContracts_Container_Buttons">
                <TextField id="filled-basic" label="Search name" variant="filled" onChange={(e) => handleSearch(e)} />
              </div>
            </div>
            <Row className="ApprovedContracts_Row_ContainerTable">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project name</th>
                    <th>Token price</th>
                    <th>ADVANTIS.AI Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filterContracts?.map((data, idx) => {
                    if (idx < tableRows) {
                      return <ApprovedContractsTable scam={data?.scam} setDisabledButtom={setDisabledButtom} disabledButtom={disabledButtom} setContractAddress={setContractAddress} setShowModal={setShowModal} key={data?.address} num={idx} name={data?.symbol} img={data?.img} marketCap={data?.tokenPrice} difVolume={data?.difVolume} segurityPoints={data?.tarpScore} address={data?.address} />
                    }
                    return null
                  })}
                </tbody>
              </Table>
            </Row>
            <Row className="ApprovedContracts_Row__Pagination" style={{ marginTop: "20px" }}>
              <Col>
                <p>
                  Showing 1-
                  {infoApproved?.data?.length} out of
                  {infoApproved?.data?.length}
                </p>
              </Col>
              <Col>
                <div className="Footer_Centrado_Dropdown">
                  <p>Show rows</p>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {tableRows == "99999999999" ? "All" : tableRows}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="HomePageCoins_Dropdown_Items">
                      <Dropdown.Item name="5" onClick={(e) => setTableRows(e.target.name)}>
                        5
                      </Dropdown.Item>
                      <Dropdown.Item name="10" onClick={(e) => setTableRows(e.target.name)}>
                        10
                      </Dropdown.Item>
                      <Dropdown.Item name="15" onClick={(e) => setTableRows(e.target.name)}>
                        15
                      </Dropdown.Item>
                      <Dropdown.Item name="30" onClick={(e) => setTableRows(e.target.name)}>
                        30
                      </Dropdown.Item>
                      <Dropdown.Item name="50" onClick={(e) => setTableRows(e.target.name)}>
                        50
                      </Dropdown.Item>
                      <Dropdown.Item name="99999999999" onClick={(e) => setTableRows(e.target.name)}>
                        ALL
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    )
  }
  return <LoginAdmin />
}

export default ApprovedContracts
