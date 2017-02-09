app.controller('userCtrl', ['$scope', 'dataService', '$location', '$state','$rootScope', function($scope, dataService, $location, $state, $rootScope) {
  dataService.getUsers()
    .then(function mySucces(response) {          
          $scope.users = response.data;
      }, function myError(error) {
          console.error(error.statusText);
      });
}])
