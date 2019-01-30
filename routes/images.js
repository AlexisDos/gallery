const express = require('express');
const router = express.Router();

const ImagesController = require('../controllers/images');

router.post('/', ImagesController.uploadImage);
router.get('/', ImagesController.findAllImages);
router.get('/all/:status', ImagesController.findAllImagesByStatus);
router.get('/:imageId', ImagesController.findImageByPk);
//router.put('/:imageId', ImagesController.updateImage);
router.put('/:userId/:imageId', ImagesController.updateStatus);
router.delete('/:imageId', ImagesController.destroyImage);


// router.post('/', {
// 	ImagesController.uploadImage
	
// 	ImagesController.createImage
// });

module.exports = router;