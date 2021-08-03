const express = require('express');
const router = express.Router();
const multer = require('multer');
const cadastrosController = require('../controllers/cadastros-controllers')

const storeg = multer.diskStorage({

    destination: function (req, file, cb){
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})
/*const fileFilter = (req, file, cb) =>{

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  ||  file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.ms-powerpoint' ){
   
        cb(null, true);
    }else{
        cb(null, false)
    }
}*/
const upload = multer({ 
    storage: storeg
});


router.post('/', upload.single('arquivo'), cadastrosController.postCadastro);
router.get('/', cadastrosController.getCadastro);
router.get('/:id_cadastrado', cadastrosController.getUmCadastro);


module.exports = router