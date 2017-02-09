app.controller('userCtrl', ['$scope', 'dataService', '$location', '$state','$rootScope', function($scope, dataService, $location, $state, $rootScope) {
  $scope.getUsers = function(){
    dataService.getUsers()
    .then(function mySucces(response) {
          $scope.Users = response.data.records;
      }, function myError(error) {
          console.error(error.statusText);
      });
  }
}])