const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const articleCtrl = require('../controllers/article');

router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/', auth, articleCtrl.getAllArticle);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;