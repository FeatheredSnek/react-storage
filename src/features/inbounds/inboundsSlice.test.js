import { selectInbound } from "./inboundsSlice"
import mockdata from "../../mockdata"

const result = {
  id: "inbound1",
  created_at: "2022-10-01T12:50:45.000Z",
  item_id: "item1",
  date: "2022-11-09",
  price: 18.0,
  units: 48,
  itemName: "Concrete"
}

test("should return inbound data with item name given proper inbound id", () => {
  expect(selectInbound(mockdata, "inbound1")).toStrictEqual(result)
})
