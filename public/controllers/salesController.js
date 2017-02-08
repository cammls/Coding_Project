app.controller('salesCtrl', ['$scope','dataService', function($scope, dataService) {
  // MAIN
  $scope.income = 0;
  $scope.deal_count = 0
  $scope.getPipedriveData = function(){
    dataService.getPipedriveData()
    .then(function mySucces(response) {
      // console.log(response.data)
      $scope.pipedriveData = response.data;
      for (var i = 0; i < response.data.pipedrive_json.length; i++) {
        if (response.data.pipedrive_json[i].status === 'won') {
          // console.log(response.data.pipedrive_json[i].status);
          $scope.income += response.data.pipedrive_json[i].value;
          $scope.deal_count ++
        }
      }
    }, function myError(error) {
    console.error(error.statusText);
  });
}

$scope.getPipedriveData();
}])
// $scope.calculateSum = function(data){
//   var sum=0;
//   var counter=0;
//   for (var property in data) {
//     if (data.hasOwnProperty(property)) {
//       sum += data[property];
//       counter++;
//     }
//   }
//   return sum;
// };
