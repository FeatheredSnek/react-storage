import { message } from "antd"

const notifications = {
  noChange: () => {
    message.info("No data has been changed")
  },

  success: (text = "Operation successful") => {
    message.success(text)
  },

  error: (text = "Operation error") => {
    message.error(text)
  }
}

export default notifications
