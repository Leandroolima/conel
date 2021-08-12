const express = require('express');
const router = express.Router();
const multer = require('multer');
const trabalheControllers = require('../controllers/trabalhe-controllers')
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


router.post('/', upload.single('arquivo'), trabalheControllers.postTrabalhe);
router.get('/', trabalheControllers.getTrabalhe)
router.get('/:id_trabalhe', trabalheControllers.getUmCurriculo)
router.delete('/:id_trabalhe', trabalheControllers.deleteCurriculo)


module.exports = router