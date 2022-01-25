const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
console.log('routes')
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.modifyUser)

module.exports = router;