app.controller('chatCtrl', ['$scope','$log', 'chatSocket', 'messageFormatter', 'nickName', function($scope, $log, chatSocket, messageFormatter, nickName) {

  $scope.nickName = nickName
  $scope.data = {
    message : ""
  }

  // OSEF UN PEU DES NICKNAME, A SETTER SELON LE NOM DU CURRENT USER QUOI
  $scope.sendMessage = function(message) {
    $log.debug('sending message', message)
    chatSocket.emit('message', nickName, message)
    $log.debug('message sent', message)
    $scope.data.message = ""
  }

  $scope.$on('socket:broadcast', function(event, data) {
   $log.debug('got a message', event.name)
   if (!data.payload) {
     $log.error('invalid message', 'event', event,
                'data', JSON.stringify(data))
     return;
   }
   $scope.$apply(function() {
     $scope.messageLog = messageFormatter(
           new Date(), data.source,
           data.payload) + $scope.messageLog;
     })
   })

}])
