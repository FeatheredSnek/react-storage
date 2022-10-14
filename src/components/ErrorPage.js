import React from "react"
import { useNavigate } from "react-router-dom"
import { Result, Button } from "antd"
import "./ErrorPage.css"

const errorMessages = {
  "500": "Sorry, something went wrong.",
  "404": "Sorry, the address you visited does not exist."
}

const ErrorPage = ({type}) => {
  const navigate = useNavigate()
  const errorType = type || "500"

  return (
    <div className="ErrorPage">
      <Result
        status={errorType}
        title={`${errorType} error`}
        subTitle={errorMessages[errorType]}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back to overview
          </Button>
        }
      />
    </div>
  )
}

export default ErrorPage
