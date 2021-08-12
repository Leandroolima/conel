const express = require('express');
const router = express.Router();
const multer = require('multer');
const cadastrosController = require('../controllers/cadastros-controllers')
const login = require('../middleware/login');

const storeg = multer.diskStorage({

    destination: function (req, file, cb){
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({ 
    storage: storeg
});


router.post('/', upload.single('arquivo'), cadastrosController.postCadastro);
router.get('/', cadastrosController.getCadastro);
router.get('/:id_cadastrado', cadastrosController.getUmCadastro);
router.delete('/:id_cadastrado', cadastrosController.deleteCadastro)


module.exports = router