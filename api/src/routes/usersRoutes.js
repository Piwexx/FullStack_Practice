const router = require('express').Router();
const {getUser} = require("../controllers/usersController")

router.get('/',getUser)

module.exports = router;