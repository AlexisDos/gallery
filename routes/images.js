const express = require('express');
const router = express.Router();

const ImagesController = require('../controllers/images');

router.post('/', ImagesController.createImage);
router.get('/', ImagesController.findAllImages);
router.get('/:imageId', ImagesController.findImageByPk);
router.put('/:imageId', ImagesController.updateImage);
// router.put('/:userId/:imageId', ImagesController.updateStatus);
router.delete('/:imageId', ImagesController.destroyImage);

module.exports = router;