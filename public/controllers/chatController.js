app.controller('chatCtrl', ['$scope','$log', 'chatSocket', 'messageFormatter', 'nickName', function($scope, $log, chatSocket, messageFormatter, nickName) {

  $scope.nickName = nickName
  $scope.messageLog = 'Ready to chat!'

  // OSEF UN PEU DES NICKNAME, A SETTER SELON LE NOM DU CURRENT USER QUOI
  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)')

    if (angular.isDefined(match) &&
        angular.isArray(match) && match.length === 2) {
      var oldNick = nickName
      nickName = match[1]
      $scope.message = ''
      $scope.messageLog = messageFormatter(new Date(),
                      nickName, 'nickname changed - from ' +
                      oldNick + ' to ' + nickName + '!') +
                      $scope.messageLog
      $scope.nickName = nickName
    }

    $log.debug('sending message', $scope.message)
    chatSocket.emit('message', nickName, $scope.message)
    $log.debug('message sent', $scope.message)
    $scope.message = ''
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
