const { Room, Booking } = require("./index");

const booking1 = new Booking({
  name: "John Doe",
  email: "johndoe@example.com",
  checkIn: new Date("2023-06-15"),
  checkOut: new Date("2023-06-18"),
  discount: 10,
});

const booking2 = new Booking({
  name: "Jane Smith",
  email: "janesmith@example.com",
  checkIn: new Date("2023-07-15"),
  checkOut: new Date("2023-07-25"),
  discount: 5,
});

const room1 = {
  name: "Standard",
  rate: 100,
  discount: 0,
  // bookings: [booking1, booking2],
};
const room = new Room(room1);
room.addBooking(booking1).addBooking(booking2);
console.log(room.bookings[0]);
describe("if room is occupied method", () => {
  test("Si existen reservas para esa habitación", () => {
    expect(room.isOccupied(new Date("2023-07-17"))).toBe(true);
    expect(room.isOccupied(new Date("2023-09-08"))).toBe(false);
  });
});
// describe("returns percentage of days with ocupancy within the range of days given method", () => {
//   ocupacion 0 en los dias dados
//   ocupacion 100 en los dias ocupados
// });
// describe("total ocupancy percentage across all rooms method", () => {
//   ocupacion 0
//   ocupacion 25
//   ocupacion 50
//   ocupacion 100
// });
// describe("returns an array of the rooms that are not ocupied for the range of days method", () => {

// });

// describe("returns the fee with discounts on room and booking method", () => {
//   descuento del 0
//   decuento del 20 solo en room
//   decuento del 70 solo en room
//   decuento del 20 solo en booking
//   decuento del 70 solo en booking
//   descuento del 20 en room y 0 en booking
//   descuento del 0 en room y 30 en booking
//   desceunto de 20 en room y 40 en booking
// });
