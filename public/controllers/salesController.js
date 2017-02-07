app.controller('salesCtrl', ['$scope','dataService', function($scope, dataService) {
  $scope.getPipedriveData = function(){
    dataService.getPipedriveData()
    .then(function mySucces(response) {
          $scope.pipedriveData = response.data;
          console.log(response.data);
      }, function myError(error) {
          console.error(error.statusText);
      });
  }
  $scope.getPipedriveData();
}])
