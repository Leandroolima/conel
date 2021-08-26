const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const UsuariosControllers = require('../controllers/usuario-controller');

router.post('/', UsuariosControllers.cadastrarUsuario)
router.post('/login', UsuariosControllers.postLogin)
router.get('/login',UsuariosControllers.getLogin)

router.get('/login/auto', login, (req, res, next)=>{
    return res.status(200).send({Ebaa:"ebba"})
} )

module.exports = router;