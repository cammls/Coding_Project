app.controller('chatCtrl', ['$scope','$log', 'chatSocket', 'messageFormatter', 'authService', function($scope, $log, chatSocket, messageFormatter, authService) {

  if (authService.isLoggedIn()) {
    $scope.isLoggedIn = true
    $scope.currentUser = authService.currentUser()     
  }
  $scope.messageLog = []
  $scope.data = {
    message : ""
  }


  // OSEF UN PEU DES NICKNAME, A SETTER SELON LE NOM DU CURRENT USER QUOI
  $scope.sendMessage = function(message) {
    chatSocket.emit('message', $scope.userName, message)
    $scope.data.message = ""
    $scope.youreTalkingToMe = true
  }

  $scope.$on('socket:broadcast', function(event, data) {
   if (!data.payload) {
     $log.error('invalid message', 'event', event,
                'data', JSON.stringify(data))
     return;
   }
   $scope.$apply(function() {
     newMessageLog = {
      time: new Date(),
      source: data.source,
      message: data.payload
     }
     $scope.messageLog.push(
      newMessageLog
     )
    })
   })

}])
