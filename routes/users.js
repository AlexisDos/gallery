var express = require('express');
var router = express.Router();

const UserController = require('../controllers/users');

router.post('/', UserController.createUser);
router.get('/', UserController.findAllUsers);
router.get('/:userId', UserController.findUserByPk);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.destroyUser);

module.exports = router;
