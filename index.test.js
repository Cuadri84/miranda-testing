const { Room, Booking } = require("./index");

const rooms = [
  {
    name: "Standard",
    rate: 100,
    discount: 0,
    bookings: [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        checkin: "2023-06-15",
        checkout: "2023-06-20",
        discount: 10,
      },
      {
        name: "Jane Smith",
        email: "janesmith@example.com",
        checkin: "2023-07-01",
        checkout: "2023-07-05",
        discount: 5,
      },
      {
        name: "Robert Johnson",
        email: "robertjohnson@example.com",
        checkin: "2023-07-10",
        checkout: "2023-07-15",
        discount: 20,
      },
      {
        name: "Alice Brown",
        email: "alicebrown@example.com",
        checkin: "2023-08-01",
        checkout: "2023-08-10",
        discount: 15,
      },
      {
        name: "Michael Johnson",
        email: "michaeljohnson@example.com",
        checkin: "2023-09-05",
        checkout: "2023-09-10",
        discount: 10,
      },
    ],
  },
];

describe("constructor method of room", () => {});
describe("if room is occupied method", () => {});
describe("returns percentage of days with ocupancy within the range of days given method", () => {});
describe("total ocupancy percentage across all rooms method", () => {});
describe("returns an array of the rooms that are not ocupied for the range of days method", () => {});
describe("constructor method of booking", () => {});
describe("returns the fee with discounts on room and booking method", () => {});
