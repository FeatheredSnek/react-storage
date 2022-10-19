import { message } from "antd"

const notifications = {
  noChange: () => {
    message.info("No data has been changed")
  },

  success: (text = "Operation successful") => {
    message.success(text)
  }
}

export default notifications
