import { selectInbound, selectAllInbounds } from "./inboundsSlice"
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

const result2 = [
  {
    id: "inbound1",
    created_at: "2022-10-01T12:50:45.000Z",
    item_id: "item1",
    date: "2022-11-09",
    price: 18.0,
    units: 48,
    itemName: "Concrete"
  },
  {
    id: "inbound2",
    created_at: "2022-10-01T12:51:29.000Z",
    item_id: "item2",
    date: "2022-11-09",
    price: 6.99,
    units: 48,
    itemName: "Bricks"
  },
  {
    id: "inbound3",
    created_at: "2022-10-01T12:52:13.000Z",
    item_id: "item1",
    date: "2022-11-12",
    price: 19.5,
    units: 144,
    itemName: "Concrete"
  },
  {
    id: "inbound4",
    created_at: "2022-10-01T12:52:32.000Z",
    item_id: "item1",
    date: "2022-11-13",
    price: 19.5,
    units: 48,
    itemName: "Concrete"
  },
  {
    id: "inbound5",
    created_at: "2022-10-01T12:52:46.000Z",
    item_id: "item2",
    date: "2022-11-13",
    price: 6.99,
    units: 96,
    itemName: "Bricks"
  },
  {
    id: "inbound6",
    created_at: "2022-10-01T14:11:11.000Z",
    item_id: "item3",
    date: "2022-11-20",
    price: 113.6,
    units: 12,
    itemName: "Windows"
  }
]

test("should return inbound data with item name given proper inbound id", () => {
  expect(selectInbound(mockdata, "inbound1")).toStrictEqual(result)
})

test('should return all inbounds with item names', () => { 
  expect(selectAllInbounds(mockdata)).toStrictEqual(result2)
})