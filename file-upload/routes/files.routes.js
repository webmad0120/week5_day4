const express = require('express')
const router = express.Router()
const Picture = require('../models/picture.model')


// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })


// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')



router.get('/gallery', (req, res, next) => {
  Picture.find()
    .then(allPictures => res.render('gallery-index', { allPictures }))
    .catch(err => next(err))
})



router.get('/upload-local', (req, res) => res.render('file-form-local'))
router.post('/upload-local', upload.single('phototoupload'), (req, res, next) => {

  console.log('Esto es lo que hace Multer: ', req.file)

  Picture.create({
    description: req.body.description,
    path: `/uploads/${req.file.filename}`,
    name: req.file.originalname
  })
    .then(() => res.redirect('/files/gallery'))
    .catch(err => next(err))
})




router.get('/upload-cloud', (req, res) => res.render('file-form-cloud'))
router.post('/upload-cloud', uploadCloud.single('phototoupload'), (req, res, next) => {
  console.log("Y esto es lo que hace multer cuando colabora con Cloudinary", req.file)

  Picture.create({
    description: req.body.description,
    path: req.file.secure_url,
    name: req.file.originalname
  })
    .then(() => res.redirect('/files/gallery'))
    .catch(err => next(err))
})










module.exports = router