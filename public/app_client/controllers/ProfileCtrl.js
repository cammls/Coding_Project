app.controller('profileController', ['$scope', 'DataService', '$location', function($scope, DataService, $location) {
    var vm = this;

    $scope.user = {};

    DataService.getProfile()
    .then(function(data) {
      $scope.user = data;
    })
    .catch(function (e) {
      console.log(e);
    });
}])
