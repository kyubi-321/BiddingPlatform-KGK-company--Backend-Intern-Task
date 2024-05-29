const express = require('express');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', auth, upload.single('image'), createItem);
router.put('/:id', auth, upload.single('image'), updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
