const express = require('express');
const router = express.Router();
const multer = require('multer');
const denunciaControllers = require('../controllers/denuncia-controllers')
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
    storage: storeg,
});


router.post('/', upload.single('arquivo'), denunciaControllers.postDenuncia);
router.get('/', denunciaControllers.getDenuncia)
router.get('/:id_denuncia', denunciaControllers.getUmaDenuncia)
router.delete('/:id_denuncia', denunciaControllers.deleteDenuncia)

module.exports = router