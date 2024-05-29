const { io } = require('../app');

const notifyUsers = (itemId, bidAmount) => {
  io.emit('update', { itemId, bidAmount });
};

module.exports = { notifyUsers };
