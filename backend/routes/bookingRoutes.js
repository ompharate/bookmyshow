const express = require('express');
const { allBookings, newBooking, getBookingById ,deleteBooking} = require('../controllers/bookingController');
const bookingRouter = express.Router();


// for fetching all bookings
bookingRouter.get('/',allBookings);

// fot new bookings
bookingRouter.post('/book',newBooking);

// get booking by id
bookingRouter.get('/:id',getBookingById);

// for deleting bookings
bookingRouter.delete("/:id", deleteBooking);

module.exports = bookingRouter;