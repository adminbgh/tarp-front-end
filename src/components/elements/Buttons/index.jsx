import React from "react"
import { Spinner } from "react-bootstrap"
import "./styles.scss"

function Button({ text, className, onPress, secondary, loading, outlined, disabled, hidden, applyStyle, rounded }) {
  return (
    <div
      className={`button ${className} hidden-${hidden} secondary-button-${secondary} rounder-${rounded} button-loading-${loading} button-disabled-${disabled} button-outlined-${outlined}`}
      onClick={(e) => {
        if (!disabled && !loading) {
          onPress(e)
        }
      }}
      style={applyStyle ? applyStyle : {}}
    >
      {loading ? (
        <span>
          <Spinner animation="border" variant="dark" />
        </span>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}

export default Button
