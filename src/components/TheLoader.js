import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadingStarted } from "../store/loaderSlice"
import { WarningOutlined, LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"


const Loader = ({ children }) => {
  const loaderStatus = useSelector((state) => state.loader.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadingStarted())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Spin
      spinning={loaderStatus !== "success"}
      indicator={
        loaderStatus === "loading" ? <LoadingOutlined /> : <WarningOutlined />
      }
      tip={
        loaderStatus === "loading"
          ? "Loading data..."
          : "API error, try again later"
      }
    >
      {children}
    </Spin>
  )
}
export default Loader
