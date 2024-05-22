const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createDesign ,uploadDesignFile, getAllDesign ,deleteDesign ,updateDesign} = require('../controllers/design.controller.js')

const storage = multer.diskStorage({
    
    destination:(req,file,cb)=>{
        let destination = `design`
        cb(null ,destination)
    },

    filename:(req ,file,cb)=>{
        cb(null ,file.originalname)
    }

})
const upload = multer({storage})


router.route('/createDesign').post(createDesign)
router.route('/deleteDesign/:id').delete(deleteDesign)
router.route('/updateDesign/:id').put(updateDesign)

router.route('/uploadDesignFile/:designId').post(upload.single('file') ,uploadDesignFile)

router.route('/getAllDesign').get(getAllDesign)

module.exports = router