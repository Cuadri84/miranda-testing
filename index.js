var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Room = /** @class */ (function () {
    function Room(_a) {
        var name = _a.name, bookings = _a.bookings, rate = _a.rate, discount = _a.discount;
        this.name = name;
        this.bookings = bookings || [];
        this.rate = rate;
        this.discount = discount;
    }
    Room.prototype.addBooking = function (booking) {
        this.bookings.push(__assign(__assign({}, booking), { room: this }));
        return this;
    };
    Room.prototype.isOccupied = function (date) {
        for (var i = 0; i < this.bookings.length; i++) {
            if (date >= this.bookings[i].checkIn &&
                date <= this.bookings[i].checkOut) {
                return true;
            }
        }
        return false;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        var rangeDates = getRange(startDate, endDate);
        var occupiedDates = [];
        for (var _i = 0, rangeDates_1 = rangeDates; _i < rangeDates_1.length; _i++) {
            var date = rangeDates_1[_i];
            this.isOccupied(date) ? occupiedDates.push(date) : 0;
        }
        var totalPercentage = (occupiedDates.length / rangeDates.length) * 100;
        return totalPercentage < 100 ? totalPercentage : 100;
    };
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var rangeDates = getRange(startDate, endDate);
        var occupiedDates = [];
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var room = rooms_1[_i];
            for (var _a = 0, rangeDates_2 = rangeDates; _a < rangeDates_2.length; _a++) {
                var day = rangeDates_2[_a];
                room.isOccupied(day) ? occupiedDates.push(day) : 0;
            }
        }
        var totalOccupancyPercentage = (occupiedDates.length / rangeDates.length) * 100;
        return totalOccupancyPercentage < 100 ? totalOccupancyPercentage : 100;
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        var rangeDates = getRange(startDate, endDate);
        var available = [];
        for (var _i = 0, rooms_2 = rooms; _i < rooms_2.length; _i++) {
            var room = rooms_2[_i];
            for (var _a = 0, rangeDates_3 = rangeDates; _a < rangeDates_3.length; _a++) {
                var day = rangeDates_3[_a];
                if (room.isOccupied(day)) {
                    break;
                }
                if (!available.includes(room.name)) {
                    available.push(room.name);
                }
            }
        }
        return available.length ? available : "No room available";
    };
    return Room;
}());
var Booking = /** @class */ (function () {
    function Booking(_a) {
        var name = _a.name, email = _a.email, checkIn = _a.checkIn, checkOut = _a.checkOut, discount = _a.discount, room = _a.room;
        this.name = name;
        this.email = email;
        this.checkIn = new Date(checkIn);
        this.checkOut = new Date(checkOut);
        this.discount = discount;
        this.room = room;
    }
    Booking.prototype.getFee = function () {
        var rate = this.room.rate;
        var totalDiscount = rate - (100 - this.discount - this.room.discount);
        var price = totalDiscount >= rate ? rate : rate - totalDiscount;
        return price;
    };
    return Booking;
}());
function getRange(startDate, endDate) {
    var range = [];
    var theDate = new Date(startDate);
    while (theDate < endDate) {
        range = __spreadArray(__spreadArray([], range, true), [new Date(theDate)], false);
        theDate.setDate(theDate.getDate() + 1);
    }
    return range;
}
module.exports = {
    Room: Room,
    Booking: Booking,
};
