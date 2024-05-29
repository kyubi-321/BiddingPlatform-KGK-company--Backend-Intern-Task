const { Notification } = require('../models');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.user.id } });
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
};

const markRead = async (req, res) => {
  try {
    await Notification.update({ isRead: true }, { where: { userId: req.user.id } });
    res.send({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getNotifications, markRead };
