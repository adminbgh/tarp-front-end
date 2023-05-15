import React, { useEffect, useState } from "react"
import { Container, Dropdown, Row, Modal, Button, ProgressBar, Table, Col } from "react-bootstrap"
import "./ModalAnalysis.css"
import { useSelector, useDispatch } from "react-redux"
import Checkbox from "@mui/material/Checkbox"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import SimiliarContractsTable from "./SimilarContractsTable/SimilarContractsTable"
import AlertModal from "./AlertModal/AlertModal"
import { adminGetOneAnalysis, adminGetSimilarContracts, adminAnalysis, adminUpdateAnalysis, adminGetListContract, adminHoneyPotCompare, adminAnalisisContractInfo } from "../../../../store/actions/adminActions"
import { formatNumbers } from "../../../../services/formatNumbers"

const InputTarpScore = ({ name, nameInput, placeholder, onChangeInput, valueText }) => {
  return (
    <div className="ModalAnalysis_Inputs_TarpScore">
      <Col sm={5} md={4}>
        <div>
          <label>{name}</label>
        </div>
      </Col>
      <Col>
        <input type="number" value={valueText} className="ModalAnalysis_Input" name={nameInput} placeholder={placeholder && placeholder} onChange={(e) => onChangeInput(e)} />
      </Col>
      <div style={{ marginRight: "10px" }}>
        <p>Risk</p>
      </div>

      <div className="Container_DropDown">
        <Col sm={3}>
          <div>
            <Dropdown size="sm">
              <Dropdown.Toggle className="SimilarContracts_DropDown" variant="secondary">
                Medium
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="#/action-1">Minor</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                <Dropdown.Item href="#/action-3">High</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </div>
    </div>
  )
}

function ModalAnalysis({ showModal, setShowModal, AddressContract }) {
  const dispatch = useDispatch()
  const infoOneAnalysis = useSelector((state) => state.admin?.oneAnalysis)
  const honeyPot = useSelector((state) => state.admin?.honeyPotCompare)
  const analisisContract = useSelector((state) => state.admin?.analisisContractInfo?.data)
  const infoSimilarContracts = useSelector((state) => state.admin?.similarContracts || [])
  const adminParams = infoOneAnalysis?.adminParams
  const infoBuyAndSell = useSelector((state) => state?.user?.buyAndSell)

  const [open, setOpen] = useState(false)
  const [openAlertError, setOpenAlertError] = useState(false)
  const [AlertShow, setAlertShow] = useState(false)
  const [sumaProgress, setSumaProgress] = useState(0)
  const [sumaProgressApprove, setSumaProgressApprove] = useState(adminParams?.totalScore?.score)

  const [ModalInfo, setModalInfo] = useState({
    address: "",
    similarity: "",
    description: "",
    similarContracts: ""
  })

  const [ModalInfoCreate, setModalInfoCreate] = useState({
    address: "",
    initialState: true,
    buyLast60Days: 0,
    sellLast60Days: 0,
    buyLast300Days: 0,
    sellLast300Days: 0,
    allowToOpeningForTrade: true,
    similarityWithScam: 0,
    liquidityLocket: 0,
    codeAnalysis: 0,
    contractCodeAudith: 0,
    renounced: 0,
    contractDescription: "Text of the risks associated with this contract will be in this section. This text will automatically change due to changing risk within the contracts.S",
    similarContracts: infoSimilarContracts?.data
  })

  useEffect(() => {
    const sum = ModalInfoCreate?.similarityWithScam + ModalInfoCreate?.liquidityLocket + ModalInfoCreate?.codeAnalysis + ModalInfoCreate?.renounced
    const sumApprove = adminParams?.totalScore?.score

    if (sum > 100) {
      setSumaProgress(100)
    }

    if (sumApprove > 100) {
      setSumaProgressApprove(100)
    }

    setSumaProgress(sum > 0 ? sum : 0)
    setSumaProgressApprove(sumApprove > 0 ? sumApprove : 0)
  }, [adminParams?.totalScore, ModalInfoCreate, ModalInfoCreate?.similarityWithScam, ModalInfoCreate?.liquidityLocket, ModalInfoCreate?.codeAnalysis, ModalInfoCreate?.renounced])

  useEffect(() => {
    if (ModalInfoCreate?.renounced > 5 || ModalInfoCreate?.renounced < 0) setModalInfoCreate({ ...ModalInfoCreate, renounced: 5 })
    if (ModalInfoCreate?.codeAnalysis > 43 || ModalInfoCreate?.codeAnalysis < 0) setModalInfoCreate({ ...ModalInfoCreate, codeAnalysis: 43 })
    if (ModalInfoCreate?.similarityWithScam > 43 || ModalInfoCreate?.similarityWithScam < 0) setModalInfoCreate({ ...ModalInfoCreate, similarityWithScam: 43 })
    if (ModalInfoCreate?.liquidityLocket > 16 || ModalInfoCreate?.liquidityLocket < 0) setModalInfoCreate({ ...ModalInfoCreate, liquidityLocket: 9 })
  }, [ModalInfoCreate?.similarityWithScam, ModalInfoCreate?.liquidityLocket, ModalInfoCreate?.codeAnalysis, ModalInfoCreate?.renounced])

  useEffect(() => {
    if (ModalInfo?.renounced > 10 || ModalInfo?.renounced < 0) setModalInfo({ ...ModalInfo, renounced: 5 })
    if (ModalInfo?.codeAnalysis > 43 || ModalInfo?.codeAnalysis < 0) setModalInfo({ ...ModalInfo, codeAnalysis: 43 })
    if (ModalInfo?.similarityWithScam > 43 || ModalInfo?.similarityWithScam < 0) setModalInfo({ ...ModalInfo, similarityWithScam: 43 })
    if (ModalInfo?.liquidityLocket > 16 || ModalInfo?.liquidityLocket < 0) setModalInfo({ ...ModalInfo, liquidityLocket: 9 })
  }, [ModalInfo?.similarityWithScam, ModalInfo?.liquidityLocket, ModalInfo?.codeAnalysis, ModalInfo?.renounced])

  const handleCloseAlertFeedback = (reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
    setOpenAlertError(false)
  }

  /* ----General--------General--------General---- */
  const handleCloseAlert = () => {
    setAlertShow(!AlertShow)
  }

  const handleCloseModal = () => {
    setModalInfo({ address: AddressContract })
  }

  /* ----Update--------Update--------Update---- */
  /* ----Update--------Update--------Update---- */
  /* ----Update--------Update--------Update---- */
  const handleChange = (e) => {
    if (e.target.name === "contractDescription") {
      return setModalInfo({
        ...ModalInfo,
        [e.target.name]: e.target.value,
        address: AddressContract
      })
    }
    return setModalInfo({
      ...ModalInfo,
      [e.target.name]: Number(e.target.value),
      address: AddressContract
    })
  }

  const handleClose = () => {
    handleCloseModal()
    setShowModal(false)
    setModalInfo("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(adminUpdateAnalysis(ModalInfo))
      .then(() => setOpen(true))
      .catch(() => setOpenAlertError(true))
    dispatch(adminGetListContract("analyzed"))
    handleClose()
  }

  /* ----Create--------Create--------Create---- */
  /* ----Create--------Create--------Create---- */
  /* ----Create--------Create--------Create---- */
  const handleChangeCreate = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === "contractDescription") {
      return setModalInfoCreate({
        ...ModalInfoCreate,
        address: AddressContract,
        [name]: value
      })
    }
    return setModalInfoCreate({
      ...ModalInfoCreate,
      address: AddressContract,
      [e.target.name]: Number(e.target.value)
    })
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault()

    if (ModalInfoCreate.address === "" && ModalInfoCreate.similarityWithScam === undefined && ModalInfoCreate.liquidityLocket === undefined && ModalInfoCreate.codeAnalysis === undefined && ModalInfoCreate.renounced === undefined && ModalInfoCreate.renounced === undefined && ModalInfoCreate.contractDescription === undefined && ModalInfoCreate.similarContracts === undefined) {
      return alert("Please fill fields")
    }

    await dispatch(adminAnalysis(ModalInfoCreate))
      .then(() => setOpen(true))
      .catch(() => setOpenAlertError(true))
    await dispatch(adminGetListContract("pendings"))
    handleClose()
  }

  useEffect(() => {
    setModalInfo({
      ...ModalInfo,
      similarContracts: adminParams?.similarContracts
    })
  }, [])

  useEffect(async () => {
    dispatch(adminGetOneAnalysis(AddressContract))
    dispatch(adminGetSimilarContracts(AddressContract))
    dispatch(adminHoneyPotCompare(AddressContract))
    await dispatch(adminAnalisisContractInfo(AddressContract))

    setModalInfo({
      address: AddressContract,
      similarContracts: adminParams?.similarContracts
    })
    setModalInfoCreate({
      address: AddressContract,
      similarContracts: infoSimilarContracts?.data
    })
  }, [AddressContract])

  /* ALERTAS ALERT ALERTAS */

  const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />)

  /* return */

  return (
    <div className="Modal_Container">
      {/*  -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- */
      /* -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- */
      /* -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- */
      /* -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZCREATE----- -----MODAL PRIMERA VEZ CREATE-----  */
      /* -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- */
      /* -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- -----MODAL PRIMERA VEZ CREATE----- */}

      {infoOneAnalysis?.message === "No admin analyis" ? (
        <Modal backdrop="static" className="Modal_Container_Analysis" show={showModal} onHide={handleClose} fullscreen centered>
          <Modal.Body>
            <Container fluid>
              <div className="ModalHeader">
                <div>
                  <h3>Manage analysis </h3>
                </div>
                <Button id="ButtonClose" variant="secondary" onClick={handleClose}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.511719 18.5391C0.652344 18.6719 0.8125 18.7617 0.992188 18.8086C1.17188 18.8555 1.35156 18.8555 1.53125 18.8086C1.71094 18.7617 1.86719 18.6719 2 18.5391L9.5 11.0391L17 18.5391C17.1328 18.6719 17.2891 18.7617 17.4688 18.8086C17.6484 18.8555 17.8281 18.8555 18.0078 18.8086C18.1953 18.7695 18.3555 18.6797 18.4883 18.5391C18.6211 18.4062 18.707 18.25 18.7461 18.0703C18.793 17.8906 18.793 17.7109 18.7461 17.5312C18.707 17.3516 18.6211 17.1953 18.4883 17.0625L10.9883 9.55078L18.4883 2.05078C18.6211 1.91797 18.7109 1.76172 18.7578 1.58203C18.8047 1.40234 18.8047 1.22266 18.7578 1.04297C18.7109 0.863281 18.6211 0.707031 18.4883 0.574219C18.3477 0.433594 18.1875 0.34375 18.0078 0.304688C17.8281 0.257812 17.6484 0.257812 17.4688 0.304688C17.2891 0.34375 17.1328 0.433594 17 0.574219L9.5 8.07422L2 0.574219C1.86719 0.433594 1.70703 0.34375 1.51953 0.304688C1.33984 0.257812 1.16016 0.257812 0.980469 0.304688C0.800781 0.34375 0.644531 0.433594 0.511719 0.574219C0.378906 0.707031 0.289062 0.863281 0.242188 1.04297C0.203125 1.22266 0.203125 1.40234 0.242188 1.58203C0.289062 1.76172 0.378906 1.91797 0.511719 2.05078L8.01172 9.55078L0.511719 17.0625C0.378906 17.1953 0.289062 17.3516 0.242188 17.5312C0.195312 17.7109 0.191406 17.8906 0.230469 18.0703C0.277344 18.25 0.371094 18.4062 0.511719 18.5391Z"
                      fill="#B6B6B6"
                    />
                  </svg>
                </Button>
              </div>

              <Container fluid className="ModalAnalysis_Container_Table">
                <Container className="ModalAnalysis_Container_Table">
                  <div className="ModalAnalysis_Container_Buttons">
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <div>
                          <h3>
                            <strong>Similar contracts | </strong> &nbsp; Similarities with suspicious contracts
                          </h3>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row className="ModalAnalysis_Row_TableSimilar">
                    <Table striped hover>
                      <tbody className="ModalAnalysis_TableBody">
                        {infoSimilarContracts?.data?.map((data, idx) => (
                          <SimiliarContractsTable key={data?.address} num={idx} name={data?.scamName} address={data?.address} similarity={data?.similarity} setModalInfoCreate={setModalInfoCreate} ModalInfoCreate={ModalInfoCreate} />
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                  <Row className="ModalAnalysis_Row__Pagination">
                    <Col>
                      <p>
                        Showing 1-{infoSimilarContracts?.data?.length} out of {infoSimilarContracts?.data?.length}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Container>

              <Container className="ModalBody_Container">
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <div className="ModalAnalysis_Container_Title">
                      <h3>
                        <strong>Risk weighting system| </strong> &nbsp; Risk weighting system to evaluate crypto contracts for security vulnerabilities.
                      </h3>
                    </div>
                  </Col>
                </Row>
                <Row className="Container_Inputs">
                  <Col sm={4}>
                    <label>Similarity with scams</label> <input disabled style={{ cursor: "no-drop" }} type="number" className="ModalAnalysis_Input" name="similarityWithScam" />
                  </Col>
                  <Col sm={4}>
                    <label>Locked liquidity</label> <input disabled style={{ cursor: "no-drop" }} type="number" className="ModalAnalysis_Input" name="liquidityLocket" />
                  </Col>
                  <Col sm={4}>
                    <label>Code analysis</label> <Checkbox disabled color="default" name="codeAnalysis" />
                  </Col>
                  <Col sm={12} style={{ paddingTop: "30px", margin: 0 }}>
                    <label id="ModalAnalysis_Text_RiskDescription">Risk description</label> <textarea type="text" id="ModalAnalysis_Input_RiskDescription" name="contractDescription" placeholder="Good Contract" onChange={(e) => handleChangeCreate(e)} />
                  </Col>
                </Row>
              </Container>
              {/* ---- MODAL BODY---- */}
              {/* ---- MODAL BODY---- */}
              {/* ---- MODAL BODY---- */}
              <Container fluid className="ModalBody_Container">
                <Container>
                  <Row>
                    <Col sm={12} md={12} lg={12}>
                      <div className="ModalAnalysis_Container_Title">
                        <h3>
                          <strong>ADVANTIS AI Score | </strong> &nbsp; Relative risk or safety of the token
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="Container_Inputs">
                    <Col sm={12} lg={6}>
                      <InputTarpScore
                        name="Similarity with scams"
                        nameInput="similarityWithScam"
                        valueText={ModalInfoCreate?.similarityWithScam ? (ModalInfoCreate?.similarityWithScam > 43 ? 43 : ModalInfoCreate?.similarityWithScam) : null}
                        placeholder={infoSimilarContracts?.data?.length > 1 && infoSimilarContracts?.data[0]?.similarity ? Math.trunc(infoSimilarContracts?.data[0]?.similarity * 43) / 100 : 0}
                        onChangeInput={handleChangeCreate}
                      />
                      <InputTarpScore name="Code analysis" nameInput="codeAnalysis" valueText={ModalInfoCreate?.codeAnalysis ? (ModalInfoCreate?.codeAnalysis > 43 ? 43 : ModalInfoCreate?.codeAnalysis) : null} placeholder={infoBuyAndSell?.data?.sellsPercentage <= 2 ? 0 : 43} onChangeInput={handleChangeCreate} />
                      <InputTarpScore name="Locked liquidity" nameInput="liquidityLocket" valueText={ModalInfoCreate?.liquidityLocket ? (ModalInfoCreate?.liquidityLocket > 8 ? 9 : ModalInfoCreate?.liquidityLocket) : null} placeholder={analisisContract?.liquidity?.percentage > 33 ? 9 : 0} onChangeInput={handleChangeCreate} />
                      <InputTarpScore name="Renounced" nameInput="renounced" valueText={ModalInfoCreate?.renounced ? (ModalInfoCreate?.renounced > 5 ? 5 : ModalInfoCreate?.renounced) : null} placeholder={analisisContract?.renounced ? 5 : 0} onChangeInput={handleChangeCreate} />
                    </Col>
                    <Col sm={12} lg={6}>
                      <div className="ModalAnalysis_ContainerScore">
                        <h2>Score: {sumaProgress ? sumaProgress : "0"}</h2>
                        <ProgressBar variant={sumaProgress < 40 ? "danger" : sumaProgress < 70 ? "warning" : "success"} now={sumaProgress} />
                        <h4>Risk level: {sumaProgress < 40 ? "High" : sumaProgress < 70 ? "Medium" : "Low"}</h4>
                        <p>You are prepared to accept that the value will fluctuate (volatility) with the aim of achieving higher returns in the medium to long term. You accept that there is an increased (higher) medium of capital loss over choosing more low medium projects.</p>
                      </div>
                    </Col>
                  </Row>
                </Container>
                {/*  ---- MODAL FOOTER---- ---- MODAL FOOTER---- ---- MODAL FOOTER---- */}
              </Container>
              <div className="ModalAnalysis_Container_Footer">
                <div>
                  <Row>
                    <Col>
                      <button type="button" className="ButtonDontSave" onClick={() => handleCloseAlert()}>
                        Don’t save
                      </button>
                    </Col>
                    <Col>
                      <button
                        type="button"
                        className="ButtonSave"
                        onClick={(e) => {
                          handleSubmitCreate(e)
                        }}
                      >
                        Save changes
                      </button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      ) : (
        /* MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION */
        /* MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION */
        /* MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION */
        /* MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION */
        /* MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION MODAL CON INFORMACION */
        <Modal backdrop="static" className="Modal_Container_Analysis" show={showModal} onHide={handleClose} fullscreen centered>
          <Modal.Body>
            <Container fluid>
              <div className="ModalHeader">
                <div>
                  <h3>Manage analysis </h3>
                </div>
                <Button id="ButtonClose" variant="secondary" onClick={handleClose}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.511719 18.5391C0.652344 18.6719 0.8125 18.7617 0.992188 18.8086C1.17188 18.8555 1.35156 18.8555 1.53125 18.8086C1.71094 18.7617 1.86719 18.6719 2 18.5391L9.5 11.0391L17 18.5391C17.1328 18.6719 17.2891 18.7617 17.4688 18.8086C17.6484 18.8555 17.8281 18.8555 18.0078 18.8086C18.1953 18.7695 18.3555 18.6797 18.4883 18.5391C18.6211 18.4062 18.707 18.25 18.7461 18.0703C18.793 17.8906 18.793 17.7109 18.7461 17.5312C18.707 17.3516 18.6211 17.1953 18.4883 17.0625L10.9883 9.55078L18.4883 2.05078C18.6211 1.91797 18.7109 1.76172 18.7578 1.58203C18.8047 1.40234 18.8047 1.22266 18.7578 1.04297C18.7109 0.863281 18.6211 0.707031 18.4883 0.574219C18.3477 0.433594 18.1875 0.34375 18.0078 0.304688C17.8281 0.257812 17.6484 0.257812 17.4688 0.304688C17.2891 0.34375 17.1328 0.433594 17 0.574219L9.5 8.07422L2 0.574219C1.86719 0.433594 1.70703 0.34375 1.51953 0.304688C1.33984 0.257812 1.16016 0.257812 0.980469 0.304688C0.800781 0.34375 0.644531 0.433594 0.511719 0.574219C0.378906 0.707031 0.289062 0.863281 0.242188 1.04297C0.203125 1.22266 0.203125 1.40234 0.242188 1.58203C0.289062 1.76172 0.378906 1.91797 0.511719 2.05078L8.01172 9.55078L0.511719 17.0625C0.378906 17.1953 0.289062 17.3516 0.242188 17.5312C0.195312 17.7109 0.191406 17.8906 0.230469 18.0703C0.277344 18.25 0.371094 18.4062 0.511719 18.5391Z"
                      fill="#B6B6B6"
                    />
                  </svg>
                </Button>
              </div>

              <Container fluid className="ModalAnalysis_Container_Table">
                <Container className="ModalAnalysis_Container_Table">
                  <div className="ModalAnalysis_Container_Buttons">
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <div>
                          <h3>
                            <strong>Similar contracts | </strong> &nbsp; Similarities with suspicious contracts
                          </h3>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Table striped hover>
                      <tbody className="ModalAnalysis_TableBody">
                        {adminParams?.similarContracts?.map((data, idx) => (
                          <SimiliarContractsTable key={data?.address} num={idx} AddressContract={AddressContract} name={data?.scamName} description={data?.description} address={data?.address} similarity={data?.similarity} setModalInfo={setModalInfo} ModalInfo={ModalInfo} />
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                  <Row className="ModalAnalysis_Row__Pagination">
                    <Col>
                      <p>
                        Showing 1-
                        {adminParams?.similarContracts?.length} out of {adminParams?.similarContracts?.length}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Container>

              <Container className="ModalBody_Container">
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <div className="ModalAnalysis_Container_Title">
                      <h3>
                        <strong>Risk weighting system | </strong> &nbsp; Risk weighting system to evaluate crypto contracts for security vulnerabilities.
                      </h3>
                    </div>
                  </Col>
                </Row>
                <Row className="Container_Inputs">
                  <Col sm={4}>
                    <label>Similarity with scams</label> <input disabled style={{ cursor: "no-drop" }} value={adminParams?.similarityWithScam?.percentage?.toFixed(2)} type="number" className="ModalAnalysis_Input" name="similarityWithScam" onChange={(e) => handleChange(e)} />
                  </Col>
                  <Col sm={4}>
                    <label>Locked liquidity</label> <input disabled style={{ cursor: "no-drop" }} value={adminParams?.liquidityLocket?.percentage?.toFixed(2)} type="number" className="ModalAnalysis_Input" name="liquidityLocket" onChange={(e) => handleChange(e)} />
                  </Col>
                  <Col sm={4}>
                    <label>Code analysis</label> <Checkbox disabled color="default" name="codeAnalysis" onChange={(e) => handleChange(e)} />
                  </Col>
                  <Col sm={12} style={{ paddingTop: "30px", margin: 0 }}>
                    <label id="ModalAnalysis_Text_RiskDescription">Risk description</label> <textarea id="ModalAnalysis_Input_RiskDescription" name="contractDescription" defaultValue={adminParams?.contractDescription} onChange={(e) => handleChange(e)} />
                  </Col>
                </Row>
              </Container>
              {/* ---- MODAL BODY---- */}
              {/* ---- MODAL BODY---- */}
              {/* ---- MODAL BODY---- */}
              <Container fluid className="ModalBody_Container">
                <Container>
                  <Row>
                    <Col sm={12} md={12} lg={12}>
                      <div className="ModalAnalysis_Container_Title">
                        <h3>
                          <strong>ADVANTIS AI Score | </strong> &nbsp; Relative risk or safety of the token
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="Container_Inputs">
                    <Col sm={12} lg={6}>
                      <div className="ModalAnalysis_Inputs_TarpScore">
                        <Col sm={5} md={4}>
                          <div>
                            <label>Similarity with scams</label>
                          </div>
                        </Col>
                        <Col>
                          <input defaultValue={adminParams?.similarityWithScam?.score} type="number" className="ModalAnalysis_Input" name="similarityWithScam" onChange={(e) => handleChange(e)} />
                        </Col>
                        <div style={{ marginRight: "10px" }}>
                          <p>Risk</p>
                        </div>

                        <div className="Container_DropDown">
                          <Col sm={3}>
                            <div>
                              <Dropdown size="sm">
                                <Dropdown.Toggle className="SimilarContracts_DropDown" variant="secondary">
                                  Medium
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                  <Dropdown.Item href="#/action-1">Minor</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">High</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                        </div>
                      </div>

                      <div className="ModalAnalysis_Inputs_TarpScore">
                        <Col sm={5} md={4}>
                          <div>
                            <label>Locked liquidity </label>
                          </div>
                        </Col>
                        <Col>
                          <input defaultValue={adminParams?.liquidityLocket?.score} type="number" className="ModalAnalysis_Input" name="liquidityLocket" onChange={(e) => handleChange(e)} />
                        </Col>
                        <div style={{ marginRight: "10px" }}>
                          <p>Risk</p>
                        </div>

                        <div className="Container_DropDown">
                          <Col sm={3}>
                            <div>
                              <Dropdown size="sm">
                                <Dropdown.Toggle className="SimilarContracts_DropDown" variant="secondary">
                                  Medium
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                  <Dropdown.Item href="#/action-1">Minor</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">High</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                        </div>
                      </div>

                      <div className="ModalAnalysis_Inputs_TarpScore">
                        <Col sm={5} md={4}>
                          <div>
                            <label>Code analysis </label>
                          </div>
                        </Col>
                        <Col>
                          <input defaultValue={adminParams?.codeAnalysis?.score} type="number" className="ModalAnalysis_Input" name="codeAnalysis" onChange={(e) => handleChange(e)} />
                        </Col>
                        <div style={{ marginRight: "10px" }}>
                          <p>Risk</p>
                        </div>

                        <div className="Container_DropDown">
                          <Col sm={3}>
                            <div>
                              <Dropdown size="sm">
                                <Dropdown.Toggle className="SimilarContracts_DropDown" variant="secondary">
                                  Medium
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                  <Dropdown.Item href="#/action-1">Minor</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">High</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                        </div>
                      </div>

                      <div className="ModalAnalysis_Inputs_TarpScore">
                        <Col sm={5} md={4}>
                          <div>
                            <label>Renounced</label>
                          </div>
                        </Col>
                        <Col>
                          <input defaultValue={adminParams?.renounced?.score} type="number" className="ModalAnalysis_Input" name="renounced" onChange={(e) => handleChange(e)} />
                        </Col>

                        <div style={{ marginRight: "10px" }}>
                          <p>Risk</p>
                        </div>

                        <div className="Container_DropDown">
                          <Col sm={3}>
                            <div>
                              <Dropdown size="sm">
                                <Dropdown.Toggle className="SimilarContracts_DropDown" variant="secondary">
                                  Medium
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                  <Dropdown.Item href="#/action-1">Minor</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">High</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                        </div>
                      </div>
                    </Col>

                    <Col sm={12} lg={6}>
                      <div className="ModalAnalysis_ContainerScore">
                        <h2>Score: {sumaProgressApprove ? sumaProgressApprove : "0"}</h2>
                        <ProgressBar variant={sumaProgressApprove < 40 ? "danger" : sumaProgressApprove < 70 ? "warning" : "success"} now={sumaProgressApprove} />
                        <h4>Risk level: {sumaProgressApprove < 40 ? "High" : sumaProgressApprove < 70 ? "Medium" : "Low"}</h4>
                        <p>You are prepared to accept that the value will fluctuate (volatility) with the aim of achieving higher returns in the medium to long term. You accept that there is an increased (higher) medium of capital loss over choosing more low medium projects.</p>
                      </div>
                    </Col>
                  </Row>
                </Container>
                {/*  ---- MODAL FOOTER---- ---- MODAL FOOTER---- ---- MODAL FOOTER---- */}
              </Container>
              <div className="ModalAnalysis_Container_Footer">
                <div>
                  <Row>
                    <Col>
                      <button type="button" className="ButtonDontSave" onClick={() => handleCloseAlert()}>
                        Don’t save
                      </button>
                    </Col>
                    <Col>
                      <button
                        type="button"
                        className="ButtonSave"
                        onClick={(e) => {
                          handleSubmit(e)
                        }}
                      >
                        Save changes
                      </button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlertFeedback}>
        <Alert onClose={handleCloseAlertFeedback} severity="success" sx={{ width: "100%" }}>
          Analysis updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertError} autoHideDuration={6000} onClose={handleCloseAlertFeedback}>
        <Alert onClose={handleCloseAlertFeedback} severity="error" sx={{ width: "100%" }}>
          An error occurred while updating the analysis!
        </Alert>
      </Snackbar>
      <AlertModal AlertShow={AlertShow} handleCloseAlert={handleCloseAlert} handleClose={handleClose} />
    </div>
  )
}

export default ModalAnalysis
