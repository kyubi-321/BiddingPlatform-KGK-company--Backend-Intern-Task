const express = require('express');
const { getAllBids, placeBid } = require('../controllers/bidController');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/', getAllBids);
router.post('/', auth, placeBid);

module.exports = router;
