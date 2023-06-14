const { Room, Booking } = require("./index");

const booking1 = new Booking({
  name: "John Doe",
  email: "johndoe@example.com",
  checkIn: new Date("2023-06-01"),
  checkOut: new Date("2023-06-02"),
  discount: 10,
});

const booking2 = new Booking({
  name: "Jane Smith",
  email: "janesmith@example.com",
  checkIn: new Date("2023-07-15"),
  checkOut: new Date("2023-07-25"),
  discount: 0,
});

const room1 = {
  name: "Standard",
  rate: 100,
  discount: 0,
};

describe("if room is occupied method", () => {
  it("booking fo that room", () => {
    const room = new Room(room1);
    room.addBooking(booking1).addBooking(booking2);
    expect(room.isOccupied(new Date("2023-07-17"))).toBe(true);
  });
  it("not booking for that room", () => {
    const room = new Room(room1);
    room.addBooking(booking1);
    expect(room.isOccupied(new Date("2023-09-08"))).toBe(false);
  });
});

describe("get fee method", () => {
  it("0 discount", () => {
    const room3 = new Room(room1);
    const booking = new Booking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-15"),
      checkOut: new Date("2023-06-18"),
      discount: 0,
      room: room3,
    });
    expect(booking.getFee()).toBe(100);
  });
  it("20 discount in room", () => {
    const room3 = new Room({ name: "Standard", rate: 100, discount: 20 });
    const booking = new Booking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-15"),
      checkOut: new Date("2023-06-18"),
      discount: 0,
      room: room3,
    });
    expect(booking.getFee()).toBe(80);
  });
  it("only discount in booking", () => {
    const room3 = new Room({ name: "Standard", rate: 100, discount: 0 });
    const booking = new Booking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-15"),
      checkOut: new Date("2023-06-18"),
      discount: 30,
      room: room3,
    });
    expect(booking.getFee()).toBe(70);
  });
  it("discount in room and in booking", () => {
    const room3 = new Room({ name: "Standard", rate: 100, discount: 10 });
    const booking = new Booking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-15"),
      checkOut: new Date("2023-06-18"),
      discount: 5,
      room: room3,
    });
    expect(booking.getFee()).toBe(85);
  });
  it("discount negative to be rate", () => {
    const room3 = new Room({ name: "Standard", rate: 100, discount: 30 });
    const booking = new Booking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-15"),
      checkOut: new Date("2023-06-18"),
      discount: 95,
      room: room3,
    });
    expect(booking.getFee()).toBe(100);
  });
});
describe("returns percentage of days with ocupancy within the range of days given method", () => {
  it("0% occupancy", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    expect(
      room.occupancyPercentage(new Date("2023-06-01"), new Date("2023-06-05"))
    ).toBe(0);
  });
  it("50% occupancy", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-02"),
      discount: 10,
    });
    expect(
      room.occupancyPercentage(new Date("2023-06-01"), new Date("2023-06-05"))
    ).toBe(50);
  });
  it("100% occupancy", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-05"),
      discount: 10,
    });
    expect(
      room.occupancyPercentage(new Date("2023-06-01"), new Date("2023-06-05"))
    ).toBe(100);
  });
  it("0% occupancy with various bookings", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room
      .addBooking({
        name: "John Doe",
        email: "johndoe@example.com",
        checkIn: new Date("2023-05-01"),
        checkOut: new Date("2023-05-05"),
        discount: 10,
      })
      .addBooking({
        name: "John Doe",
        email: "johndoe@example.com",
        checkIn: new Date("2023-07-01"),
        checkOut: new Date("2023-07-05"),
        discount: 10,
      });
    expect(
      room.occupancyPercentage(new Date("2023-06-01"), new Date("2023-06-05"))
    ).toBe(0);
  });
  it("50% occupancy with various bookings", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room
      .addBooking({
        name: "John Doe",
        email: "johndoe@example.com",
        checkIn: new Date("2023-06-01"),
        checkOut: new Date("2023-06-02"),
        discount: 10,
      })
      .addBooking({
        name: "John Doe",
        email: "johndoe@example.com",
        checkIn: new Date("2023-07-02"),
        checkOut: new Date("2023-07-05"),
        discount: 10,
      });
    expect(
      room.occupancyPercentage(new Date("2023-06-01"), new Date("2023-06-05"))
    ).toBe(50);
  });
  it("100% occupancy with various bookings", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room
      .addBooking({
        name: "John Doe",
        email: "johndoe@example.com",
        checkIn: new Date("2023-06-01"),
        checkOut: new Date("2023-06-03"),
        discount: 10,
      })
      .addBooking({
        name: "John Doe",
        email: "johndoe@example.com",
        checkIn: new Date("2023-06-02"),
        checkOut: new Date("2023-06-05"),
        discount: 10,
      });
    expect(
      room.occupancyPercentage(new Date("2023-06-01"), new Date("2023-06-05"))
    ).toBe(100);
  });
});
