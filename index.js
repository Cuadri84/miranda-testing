class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name;
    this.bookings = bookings || [];
    this.rate = rate;
    this.discount = discount;
  }
  addBooking(booking) {
    this.bookings.push({ ...booking, room: this });
    return this;
  }
  isOccupied(date) {
    for (let i = 0; i < this.bookings.length; i++) {
      if (
        date >= this.bookings[i].checkIn &&
        date <= this.bookings[i].checkOut
      ) {
        return true;
      }
    }
    return false;
  }
  // occupancyPercentage() {}
  // totalOccupancyPercentage() {}
  // availableRooms() {}
}
class Booking {
  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = new Date(checkIn);
    this.checkOut = new Date(checkOut);
    this.discount = discount;
    this.room = room;
  }
  getFee() {}
}

module.exports = {
  Room,
  Booking,
};
