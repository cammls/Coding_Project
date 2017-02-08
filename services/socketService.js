module.exports = function (io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
    });
  });
};
