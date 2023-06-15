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
  occupancyPercentage(startDate, endDate) {
    const rangeDates = getRange(startDate, endDate);
    let occupiedDates = [];
    for (let date of rangeDates) {
      this.isOccupied(date) ? occupiedDates.push(date) : 0;
    }
    const totalPercentage = (occupiedDates.length / rangeDates.length) * 100;
    return totalPercentage < 100 ? totalPercentage : 100;
  }

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
  getFee() {
    const rate = this.room.rate;
    const totalDiscount = rate - (100 - this.discount - this.room.discount);
    const price = totalDiscount >= rate ? rate : rate - totalDiscount;
    return price;
  }
}

function getRange(startDate, endDate) {
  let range = [];
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    range = [...range, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return range;
}

function totalOccupancyPercentage(rooms, startDate, endDate) {
  const rangeDates = getRange(startDate, endDate);
  const occupiedDates = [];
  for (let room of rooms) {
    for (let day of rangeDates) {
      room.isOccupied(day) ? occupiedDates.push(day) : 0;
    }
  }
  const totalOccupancyPercentage =
    (occupiedDates.length / rangeDates.length) * 100;
  return totalOccupancyPercentage < 100 ? totalOccupancyPercentage : 100;
}

module.exports = {
  Room,
  Booking,
  totalOccupancyPercentage,
};
