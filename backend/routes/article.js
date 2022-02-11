const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const articleCtrl = require('../controllers/article');

router.post('/', multer, articleCtrl.createArticle);
router.get('/', articleCtrl.getAllArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;