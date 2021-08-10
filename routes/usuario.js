const express = require('express');
const router = express.Router();

const UsuariosControllers = require('../controllers/usuario-controller');

router.post('/', UsuariosControllers.cadastrarUsuario)
router.post('/login', UsuariosControllers.postLogin)
router.get('/login',UsuariosControllers.getLogin)

module.exports = router;