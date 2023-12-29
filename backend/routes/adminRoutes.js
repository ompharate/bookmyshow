const express = require('express');
const { addAdmin,getAdmin,loginAdmin,getAdminById } = require('../controllers/adminController');
const adminRouter = express.Router();

// For fetching all admin's
adminRouter.get('/',getAdmin);

// for creating admin
adminRouter.post('/create',addAdmin);

// for login admin
adminRouter.post('/login',loginAdmin);

// for retrieving admin by its id
adminRouter.get('/:id',getAdminById);
module.exports = adminRouter;