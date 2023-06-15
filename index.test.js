const {
  Room,
  Booking,
  totalOccupancyPercentage,
  availableRooms,
} = require("./index");

//ROOM OCCUPIED-------------------------------------------------------------------

describe("if room is occupied method", () => {
  it("booking fo that room", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 0,
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
        name: "Jane Smith",
        email: "janesmith@example.com",
        checkIn: new Date("2023-07-15"),
        checkOut: new Date("2023-07-25"),
        discount: 0,
      });
    expect(room.isOccupied(new Date("2023-07-17"))).toBe(true);
  });
  it("not booking for that room", () => {
    const room = new Room({
      name: "Standard",
      rate: 100,
      discount: 0,
    });
    room.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-02"),
      discount: 10,
    });
    expect(room.isOccupied(new Date("2023-09-08"))).toBe(false);
  });
});

//GET FEE----------------------------------------------------------------

describe("get fee method", () => {
  it("0 discount", () => {
    const room3 = new Room({
      name: "Standard",
      rate: 100,
      discount: 0,
    });
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

//PECENTAGE -------------------------------------------------------------------------------

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

//TOTAL PERCENTAGE-------------------------------------------------------------------

describe("totalOccupancyPercentage", () => {
  it("0 ocupation in two rooms", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-01"),
      checkOut: new Date("2023-07-06"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    rooms.push(room1, room2);
    expect(
      totalOccupancyPercentage(
        rooms,
        new Date("2023-06-01"),
        new Date("2023-06-10")
      )
    ).toBe(0);
  });

  it("50 ocupation in two rooms", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-05"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    rooms.push(room1, room2);
    expect(
      totalOccupancyPercentage(
        rooms,
        new Date("2023-06-01"),
        new Date("2023-06-11")
      )
    ).toBe(50);
  });

  it("100 ocupation in two rooms", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-08"),
      discount: 10,
    });

    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-05"),
      checkOut: new Date("2023-06-10"),
      discount: 10,
    });
    rooms.push(room1, room2);
    expect(
      totalOccupancyPercentage(
        rooms,
        new Date("2023-06-01"),
        new Date("2023-06-10")
      )
    ).toBe(100);
  });

  it("0 ocupation in four rooms", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-01"),
      checkOut: new Date("2023-07-06"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    const room3 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room3.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    const room4 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room4.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    rooms.push(room1, room2, room3, room4);
    expect(
      totalOccupancyPercentage(
        rooms,
        new Date("2023-06-01"),
        new Date("2023-06-10")
      )
    ).toBe(0);
  });

  it("50 ocupation in four rooms", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-05"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    const room3 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room3.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    const room4 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room4.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-07-02"),
      checkOut: new Date("2023-07-05"),
      discount: 10,
    });
    rooms.push(room1, room2, room3, room4);
    expect(
      totalOccupancyPercentage(
        rooms,
        new Date("2023-06-01"),
        new Date("2023-06-11")
      )
    ).toBe(50);
  });

  it("100 ocupation in four rooms", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-08"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-05"),
      checkOut: new Date("2023-06-10"),
      discount: 10,
    });
    const room3 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room3.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-05"),
      checkOut: new Date("2023-06-10"),
      discount: 10,
    });
    const room4 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room4.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-05"),
      checkOut: new Date("2023-06-10"),
      discount: 10,
    });
    rooms.push(room1, room2, room3, room4);
    expect(
      totalOccupancyPercentage(
        rooms,
        new Date("2023-06-01"),
        new Date("2023-06-10")
      )
    ).toBe(100);
  });
});

//AVAILABLE ROOMS TESTS---------------------------------------------------------

describe("availableRooms", () => {
  it("two rooms- no rooms available", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-09"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-09"),
      discount: 10,
    });
    rooms.push(room1, room2);
    expect(
      availableRooms(rooms, new Date("2023-06-01"), new Date("2023-06-09"))
    ).toBe("No room available");
  });

  it("two rooms- one room available", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-01"),
      checkOut: new Date("2023-06-09"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-04"),
      checkOut: new Date("2023-06-09"),
      discount: 10,
    });
    rooms.push(room1, room2);
    const expected = ["Deluxe"];
    expect(
      availableRooms(rooms, new Date("2023-06-01"), new Date("2023-06-09"))
    ).toEqual(expect.arrayContaining(expected));
  });

  it("two rooms- both rooms available", () => {
    const rooms = [];
    const room1 = new Room({
      name: "Standard",
      rate: 100,
      discount: 30,
    });
    room1.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-05"),
      checkOut: new Date("2023-06-09"),
      discount: 10,
    });
    const room2 = new Room({
      name: "Deluxe",
      rate: 100,
      discount: 30,
    });
    room2.addBooking({
      name: "John Doe",
      email: "johndoe@example.com",
      checkIn: new Date("2023-06-04"),
      checkOut: new Date("2023-06-09"),
      discount: 10,
    });
    rooms.push(room1, room2);
    const expected = ["Standard", "Deluxe"];
    expect(
      availableRooms(rooms, new Date("2023-06-01"), new Date("2023-06-09"))
    ).toEqual(expect.arrayContaining(expected));
  });
});
