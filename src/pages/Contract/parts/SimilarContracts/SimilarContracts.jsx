/* eslint-disable react/no-array-index-key */
import React, { useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./SimilarContracts.scss"
import { Container, Row, Col, Table } from "react-bootstrap"
import { BsDot } from "react-icons/bs"
import Button from "../../../../components/elements/Buttons"

function SimilarContracts({ adminAnalysis, setView, setViewAll }) {
  const [filteredSimilarContracts, setFilteredSimilarContracts] = React.useState([])

  useEffect(() => {
    const filter = adminAnalysis?.similarContracts?.filter((thing, index, self) => index === self.findIndex((t) => t.scamName === thing.scamName))
    setFilteredSimilarContracts(filter)
  }, [adminAnalysis?.similarContracts])

  if (adminAnalysis?.similarContracts) {
    return (
      <Container className="SimilarContracts_Container">
        <Row className="SimilarContracts_Row_Container_Buttons">
          <Col sm={12} md={12}>
            <p className="SimilarContract_Text" style={{ textAlign: "start", paddingBottom: "50px" }}>
              Similar contracts <b>| Similarity with contracts</b>
            </p>
          </Col>
        </Row>
        <Row className="SimilarContracts_Container_Table">
          <Col sm={12} md={12}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="Th_SimilarContractName">Project name</th>
                  <th>% Similarity</th>

                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {filteredSimilarContracts?.map((data, index) => (
                  <tr key={index}>
                    {/* index */}
                    <td>{index + 1}</td>
                    {/* name */}
                    <td>
                      <div className="SimilarContracts_Td_ProyectName">{data?.scamName ? data?.scamName : `Project #${index}`}</div>
                    </td>
                    {/* % Similarity */}
                    <td>
                      <div className="ProgressBar_Center">
                        <p>{data?.similarity ? data?.similarity?.toFixed(2) : "0"}% similarity</p>
                      </div>
                    </td>
                    {/* Severity */}
                    <td>
                      <BsDot className={data?.similarity < 55 ? "BuyAndChecker_ApprovedDot success" : data?.similarity < 70 ? "BuyAndChecker_ApprovedDot warning" : "BuyAndChecker_ApprovedDot danger"} /> {data?.similarity < 55 ? "Low" : data?.similarity < 70 ? "Medium" : "High"}
                    </td>
                    {/*  show report */}
                    {/*   <td>
                      <p className="TextShowReport pointer">Show report</p>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={2} className="containerButtonFullView">
            <Button secondary onPress={() => setView()} text="Close similar contracts" />
          </Col>
        </Row>
      </Container>
    )
  }
  return <></>
}

export default SimilarContracts
