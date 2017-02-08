app.controller('chatCtrl', ['$scope','$log', 'chatSocket', 'messageFormatter', 'authService', function($scope, $log, chatSocket, messageFormatter, authService) {

  if (authService.isLoggedIn()) {
    $scope.isLoggedIn = true
      $scope.currentUser = authService.currentUser()
  }
  $scope.messageLog = []
  $scope.data = {
    message : ""
  }

  $scope.sendMessage = function(message) {    
    chatSocket.emit('message', $scope.currentUser.first_name + " " + $scope.currentUser.last_name , message)
    $scope.data.message = ""
    $scope.youreTalkingToMe = true
  }

  $scope.$on('socket:broadcast', function(event, data) {
   if (!data.payload) {
     $log.error('invalid message', 'event', event,
                'data', JSON.stringify(data))
     return;
   }
   console.log(data)
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
