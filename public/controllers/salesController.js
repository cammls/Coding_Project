app.controller('salesCtrl', ['$scope','dataService', function($scope, dataService) {
  $scope.getPipedriveData = function(){
    dataService.getPipedriveData()
    .then(function mySucces(response) {
          $scope.pipedriveData = response.data;
          console.log('success');// console.log(response.data);
      }, function myError(error) {
          console.log('failure');// console.error(error.statusText);
      });
  }
  $scope.getPipedriveData();
}])
