import React from "react"
import { Container, Spinner } from "react-bootstrap"

import "./Loading.css"

function Loading() {
  return (
    <Container fluid className="Loading_ContainerLoading">
      <div className="Loading_Container_Spinner">
        <Spinner animation="grow" variant="info" />
      </div>
    </Container>
  )
}

export default Loading
