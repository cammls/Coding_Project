app.controller('financeCtrl', ['$scope','dataService', function($scope, dataService) {
  $scope.getStripeData = function(){
    dataService.getStripeData()
    .then(function mySucces(response) {
          $scope.stripeData = response.data;
      }, function myError(error) {
          console.error(error.statusText);
      });
  }
  $scope.getStripeData();
}])
