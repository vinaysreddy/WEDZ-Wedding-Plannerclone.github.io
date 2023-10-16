const express = require('express');
const router = express.Router();
const { addService, getServices } = require('../controllers/serviceController');
const auth = require('../middlewares/authMiddleware');  // if authentication is required

router.post('/', auth, addService);  // protected route, only authenticated users (or admins) can add services
router.get('/', getServices);  // public route, anyone can view services

module.exports = router;
