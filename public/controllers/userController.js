app.controller('userCtrl', ['$scope', 'dataService', '$location', '$state','$rootScope', function($scope,$stateParams, dataService, $location, $state, $rootScope) {
  $scope.getUsers = function(){
    dataService.getUsers()
    .then(function mySucces(response) {
          $scope.Users = response.data.records;
      }, function myError(error) {
          console.error(error.statusText);
      });
  }

  $scope.showUser = function(){
    id = "71" // TO CHANGE OF COURSE
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
}])
