const express = require("express");
const router = express.Router();
const withAuth = require('../middleware/withAuth');
// Controllers
const UserController = require("../controller/UserController");


router.post('/chat', UserController.chatBot);

router.use(withAuth);


module.exports = router;
