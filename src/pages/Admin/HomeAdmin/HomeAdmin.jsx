/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi"
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap"
import { adminGetListContract, adminGetTotalsHome } from "../../../store/actions/adminActions"
import { formatNumbers } from "../../../services/formatNumbers"
import Loading from "../../../components/Loading/Loading"
import NavBarAdmin from "../NavBar/NavBarAdmin"
import LastContracts from "./LastContracts/LastContracts"
import "./HomeAdmin.scss"
import LoginAdmin from "../LoginAdmin/LoginAdmin"

function HomeAdmin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const infoHomeAdmin = useSelector((state) => state?.admin?.listContract)
  const infoHomeTotals = useSelector((state) => state?.admin?.totalsHome)
  const [LoadingBoolean, setLoadingBoolean] = useState(true)

  const [tableRows, setTableRows] = useState(10)

  const userLogin = JSON.parse(localStorage.getItem("user"))

  useEffect(async () => {
    await dispatch(adminGetListContract("all"))
    await dispatch(adminGetTotalsHome())
    setLoadingBoolean(false)
  }, [])

  const handleNavigateApproved = async () => {
    await dispatch(adminGetListContract("analyzed"))
    navigate("/admin/approved")
  }

  if (LoadingBoolean) {
    return (
      <Container fluid className="SecurityAudits_Container">
        <Loading />
      </Container>
    )
  }

  if (userLogin) {
    return (
      <Container fluid className="HomeAdmin_Container">
        <NavBarAdmin />
        {/* -----STATISTICS---- */}
        <Container fluid="sm" className="HomeAdmin_Container_Statistics">
          <Row className="HomeAdmin_Row_Statistics">
            <Col sm={6} md={6} xl={3} className="HomeAdmin_Container_Col">
              <div className="HomeAdmin_ContainerInfo">
                <div className="HomeAdmin_Statistics_Title">
                  <h4>Security audits</h4>
                  <h3>
                    <HiOutlineDotsCircleHorizontal />
                  </h3>
                </div>
                <div className="HomeAdmin_Statistics_Info">
                  <h2>{formatNumbers(infoHomeTotals?.totalAudits ? infoHomeTotals?.totalAudits : "0")}</h2>
                </div>
                <div className="HomeAdmin_Statistics_Text">
                  <Link to="/admin/security">
                    <p>Show requests</p>
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6} md={6} xl={3} className="HomeAdmin_Container_Col">
              <div className="HomeAdmin_ContainerInfo">
                <div className="HomeAdmin_Statistics_Title">
                  <h4>Rejected contracts</h4>
                  <h3>
                    <HiOutlineDotsCircleHorizontal />
                  </h3>
                </div>
                <div className="HomeAdmin_Statistics_Info">
                  <h2>{formatNumbers(infoHomeAdmin?.rejectedContract)}</h2>
                </div>
                <div className="HomeAdmin_Statistics_Text">
                  <Link to="/admin/rejected">
                    <p style={{ cursor: "pointer" }}>Show requests</p>
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6} md={6} xl={3} className="HomeAdmin_Container_Col">
              <div className="HomeAdmin_ContainerInfo">
                <div className="HomeAdmin_Statistics_Title">
                  <h4>Approved contracts</h4>

                  <h3>
                    <HiOutlineDotsCircleHorizontal />
                  </h3>
                </div>
                <div className="HomeAdmin_Statistics_Info">
                  <h2>{formatNumbers(infoHomeAdmin?.analyzedContracts)}</h2>
                </div>
                <div className="HomeAdmin_Statistics_Text pointer">
                  <div onClick={() => handleNavigateApproved()}>
                    <p>Show requests</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} md={6} xl={3} className="HomeAdmin_Container_Col">
              <div className="HomeAdmin_ContainerInfo">
                <div className="HomeAdmin_Statistics_Title">
                  <h4>Pending contracts</h4>
                  <h3>
                    <HiOutlineDotsCircleHorizontal />
                  </h3>
                </div>
                <div className="HomeAdmin_Statistics_Info">
                  <h2>{formatNumbers(infoHomeAdmin?.pendingContracts)}</h2>
                </div>
                <div className="HomeAdmin_Statistics_Text">
                  <Link to="/admin/pending">
                    <p>Show requests</p>
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6} md={6} xl={3} className="HomeAdmin_Container_Col">
              <div className="HomeAdmin_ContainerInfo">
                <div className="HomeAdmin_Statistics_Title">
                  <h4>ADD Scams</h4>
                  <h3>
                    <HiOutlineDotsCircleHorizontal />
                  </h3>
                </div>
                <div className="HomeAdmin_Statistics_Info">
                  <h2>{formatNumbers(infoHomeTotals?.totalScams)}</h2>
                </div>
                <div className="HomeAdmin_Statistics_Text">
                  <Link to="/admin/scam">
                    <p>Show requests</p>
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6} md={6} xl={3} className="HomeAdmin_Container_Col">
              <div className="HomeAdmin_ContainerInfo">
                <div className="HomeAdmin_Statistics_Title">
                  <h4>Text Compare</h4>
                  <h3>
                    <HiOutlineDotsCircleHorizontal />
                  </h3>
                </div>
                <div className="HomeAdmin_Statistics_Info">
                  <h2>{formatNumbers(infoHomeTotals?.totalCompareText)}</h2>
                </div>
                <div className="HomeAdmin_Statistics_Text">
                  <Link to="/admin/comparetext">
                    <p>Show requests</p>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
          {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
          {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */} {/* TABLE TABLE TABLE */}
          <Container fluid className="LastContracts_Container">
            <h3>Last contracts </h3>
            <Row className="LastContracts_Container_Table">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>ADVANTIS AI Score /24h</th>
                    <th>Audited by</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {infoHomeAdmin?.data?.map((data, idx) => {
                    if (idx < tableRows) {
                      return <LastContracts key={data?.address} num={idx} name={data?.symbol} img={data?.img} tokenPrice={data?.tokenPrice} difVolume={data?.difVolume} segurityPoints={data?.tarpScore} address={data?.address} type={data?.type} scam={data?.scam} />
                    }
                  })}
                </tbody>
              </Table>
            </Row>
            <Row className="LastContracts_Row__Pagination">
              <Col>
                <p>
                  Showing 1-
                  {infoHomeAdmin?.data?.length} out of {infoHomeAdmin?.data?.length}
                </p>
              </Col>
              <Col sm={6} style={{ marginLeft: "5%" }}>
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
                        All
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

export default HomeAdmin
