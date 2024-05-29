const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { notifyUsers } = require('./services/notificationService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/items/:itemId/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = { io };

