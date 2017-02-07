app.controller('chatCtrl', ['$scope','dataService', function($scope, dataService) {
  $scope.something = function(){
    dataService.doSomething()
    .then(function success(response) {

    }, function error(error) {
      });
  }
  // $scope.getStripeData();
}])
