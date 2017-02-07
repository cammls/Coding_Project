app.controller('financeCtrl', ['$scope','dataService', function($scope, dataService) {
  $scope.getStripeData = function(){
    dataService.getStripeData()
    .then(function mySucces(response) {
          $scope.stripeData = response.data;
          console.log(response.data);
          // $scope.stripeBalance = response.data.balance;
          // $scope.stripeCharges = response.data.charges;
          // $scope.stripeCustomers = response.data.customers;
      }, function myError(error) {
          console.error(error.statusText);
      });
  }
  $scope.getStripeData();
}])
