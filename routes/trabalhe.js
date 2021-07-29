const express = require('express');
const router = express.Router();
const multer = require('multer');
const trabalheControllers = require('../controllers/trabalhe-controllers')

const storeg = multer.diskStorage({

    destination: function (req, file, cb){
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})
const fileFilter = (req, file, cb) =>{

    if (file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png' || file.mimetype === 'application/pdf'){
   
        cb(null, true);
    }else{
        cb(null, false)
    }
}
const upload = multer({ 
    storage: storeg,
    fileFilter: fileFilter
});


router.post('/', upload.single('arquivo'), trabalheControllers.postTrabalhe);

module.exports = router