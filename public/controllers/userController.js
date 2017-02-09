app.controller('userCtrl', ['$stateParams','$scope', 'dataService', '$location', '$state','$rootScope', function($stateParams,$scope, dataService, $location, $state, $rootScope) {
    id = $stateParams.id

  $scope.getUsers = function(){
    dataService.getUsers()
    .then(function mySucces(response) {
          $scope.Users = response.data.records;
      }, function myError(error) {
          console.error(error.statusText);
      });
  }

  $scope.showUser = function(){
     dataService.showUser(id)
     .then(function mySucces(response) {
           $scope.User = response.data[0]._fields[0];
       }, function myError(error) {
           console.error(error.statusText);
       });
  }

  $scope.Follow= function() {
    console.log("je follow")
    dataService.follow($rootScope.currentUser.id, id)
  }

  $scope.Following = function() {
    dataService.following(id)
    .then(function mySucces(response) {
          $scope.Following = response.data;
          console.log($scope.Following)
      }, function myError(error) {
          console.error(error.statusText);
      });
  }

  $scope.showUser()
  $scope.Following()
  $scope.getUsers()
  console.log($stateParams)
  console.log("user")
}])
