import mockdata from "../../mockdata"
import { selectOutboundsByDestinationId } from "./outboundsSlice"

const result = [
  {
    id: "outbound1",
    created_at: "2022-10-01T12:55:31.000Z",
    item_id: "item1",
    units: 24,
    date: "2022-11-14",
    destination: "d1",
    itemAveragePrice: "19.00",
    itemName: "Concrete"
  },
  {
    id: "outbound2",
    created_at: "2022-10-01T12:55:44.000Z",
    item_id: "item2",
    units: 24,
    date: "2022-11-14",
    destination: "d1",
    itemAveragePrice: "6.99",
    itemName: "Bricks"
  },
  {
    id: "outbound6",
    created_at: "2022-10-01T12:56:36.000Z",
    item_id: "item2",
    units: 24,
    date: "2022-11-22",
    destination: "d1",
    itemAveragePrice: "6.99",
    itemName: "Bricks"
  },
  {
    id: "outbound7",
    created_at: "2022-10-01T12:56:41.000Z",
    item_id: "item1",
    units: 48,
    date: "2022-11-22",
    destination: "d1",
    itemAveragePrice: "19.00",
    itemName: "Concrete"
  }
]

test("should select outbound data table given a proper destination id", () => {
  const selectResult = selectOutboundsByDestinationId(mockdata, "d1")
  expect(selectResult).toStrictEqual(result)
})

test("should return empty array when there are no items for a destination", () => {
  const selectResult = selectOutboundsByDestinationId(mockdata, "d1337")
  expect(selectResult).toHaveLength(0)
})
