const router = require('express').Router();
const {getUser} = require("../controllers/usersController")

// Rutas que NO requieren autenticación
router.post('/',register)
router.post('/',login)

// Middleware aplicado solo a las rutas que siguen
router.use(authMiddleware); 

// Rutas que requieren autenticación
router.get('/',getUser)


module.exports = router;