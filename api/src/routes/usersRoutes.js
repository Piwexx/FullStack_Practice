const router = require('express').Router();
const {getUser, login, register} = require("../components/users/controllers/usersController")
const authMiddleware = require("../components/users/middleware/userExtractor")
// Rutas que NO requieren autenticación
router.post('/register',register)
router.post('/login',login)

// Middleware aplicado solo a las rutas que siguen
router.use(authMiddleware); 

// Rutas que requieren autenticación
router.get('/',getUser)


module.exports = router;