import { getItemName, getItemAveragePrice } from "./itemsSlice"
import mockdata from "./../mockdata.js"

test("should return item name", () => {
  expect(getItemName(mockdata, "item1")).toBe("Concrete")
})

test("should return computed average price of an item", () => {
  expect(getItemAveragePrice(mockdata, "item1")).toBeCloseTo(19)
})
