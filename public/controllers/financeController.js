app.controller('financeCtrl', ['$scope','dataService', function($scope, dataService) {
  $scope.testeuh = "testeuheuhueh"
  $scope.getStripeData = function(){
    dataService.getStripeData()
    .then(function mySucces(response) {
          $scope.stripeData = response.data;
          console.log(response.data)
      }, function myError(error) {
          console.error(error.statusText);
      });
  }
  $scope.getStripeData();
}])
