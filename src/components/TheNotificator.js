import { useEffect } from "react"
import { message } from "antd"
import { useSelector } from "react-redux"

const notifications = {
  success: (text = "Operation successful", key) => {
    message.success({
      content: text,
      duration: 2,
      key
    })
  },

  error: (text = "Operation error", key) => {
    message.success({
      content: text,
      duration: 2,
      key
    })
  }
}

const Notificator = () => {
  const inboundsLoaderStatus = useSelector((state) => state.inbounds.status)
  const outboundsLoaderStatus = useSelector((state) => state.outbounds.status)
  const destinationsLoaderStatus = useSelector(
    (state) => state.destinations.status
  )

  useEffect(() => {
    if (inboundsLoaderStatus === "success") {
      notifications.success("Inbound operation successful", "inbound")
    } else if (inboundsLoaderStatus === "error") {
      notifications.error("An error has occured!", "inbound")
    }
  }, [inboundsLoaderStatus])

  useEffect(() => {
    if (outboundsLoaderStatus === "success") {
      notifications.success("Outbound operation successful", "outbound")
    } else if (outboundsLoaderStatus === "error") {
      notifications.error("An error has occured!", "outbound")
    }
  }, [outboundsLoaderStatus])

  useEffect(() => {
    if (destinationsLoaderStatus === "success") {
      notifications.success("Destination operation successful", "destination")
    } else if (destinationsLoaderStatus === "error") {
      notifications.error("An error has occured!", "destination")
    }
  }, [destinationsLoaderStatus])

  return <></>
}

export default Notificator
