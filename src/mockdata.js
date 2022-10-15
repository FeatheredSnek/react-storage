const mockdata = {
  destinations: [
    {
      id: "d1",
      label: "Skyscraper"
    },
    {
      id: "d2",
      label: "Hoszpital"
    }
  ],
  inbounds: [
    {
      id: "inbound1",
      created_at: "2022-10-01T12:50:45.000Z",
      item_id: "item1",
      date: "2022-11-09",
      price: 18.0,
      units: 48
    },
    {
      id: "inbound2",
      created_at: "2022-10-01T12:51:29.000Z",
      item_id: "item2",
      date: "2022-11-09",
      price: 6.99,
      units: 48
    },
    {
      id: "inbound3",
      created_at: "2022-10-01T12:52:13.000Z",
      item_id: "item1",
      date: "2022-11-12",
      price: 19.5,
      units: 144
    },
    {
      id: "inbound4",
      created_at: "2022-10-01T12:52:32.000Z",
      item_id: "item1",
      date: "2022-11-13",
      price: 19.5,
      units: 48
    },
    {
      id: "inbound5",
      created_at: "2022-10-01T12:52:46.000Z",
      item_id: "item2",
      date: "2022-11-13",
      price: 6.99,
      units: 96
    },
    {
      id: "inbound6",
      created_at: "2022-10-01T14:11:11.000Z",
      item_id: "item3",
      date: "2022-11-20",
      price: 113.6,
      units: 12
    }
  ],
  items: [
    {
      id: "item1",
      name: "Concrete"
    },
    {
      id: "item2",
      name: "Bricks"
    },
    {
      id: "item3",
      name: "Windows"
    }
  ],
  outbounds: [
    {
      id: "outbound1",
      created_at: "2022-10-01T12:55:31.000Z",
      item_id: "item1",
      units: 24,
      date: "2022-11-14",
      destination: "d1"
    },
    {
      id: "outbound2",
      created_at: "2022-10-01T12:55:44.000Z",
      item_id: "item2",
      units: 24,
      date: "2022-11-14",
      destination: "d1"
    },
    {
      id: "outbound3",
      created_at: "2022-10-01T12:56:06.000Z",
      item_id: "item2",
      units: 48,
      date: "2022-11-18",
      destination: "d2"
    },
    {
      id: "outbound4",
      created_at: "2022-10-01T12:56:17.000Z",
      item_id: "item1",
      units: 16,
      date: "2022-11-21",
      destination: "d2"
    },
    {
      id: "outbound5",
      created_at: "2022-10-01T12:56:25.000Z",
      item_id: "item2",
      units: 24,
      date: "2022-11-21",
      destination: "d2"
    },
    {
      id: "outbound6",
      created_at: "2022-10-01T12:56:36.000Z",
      item_id: "item2",
      units: 24,
      date: "2022-11-22",
      destination: "d1"
    },
    {
      id: "outbound7",
      created_at: "2022-10-01T12:56:41.000Z",
      item_id: "item1",
      units: 48,
      date: "2022-11-22",
      destination: "d1"
    }
  ]
}

export default mockdata
