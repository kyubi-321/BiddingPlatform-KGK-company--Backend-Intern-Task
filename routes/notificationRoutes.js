const express = require('express');
const { getNotifications, markRead } = require('../controllers/notificationController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getNotifications);
router.post('/mark-read', auth, markRead);

module.exports = router;
