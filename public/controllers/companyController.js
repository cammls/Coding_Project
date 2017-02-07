app.controller('companyCtrl', ['$scope', 'dataService', '$location', '$state','$rootScope', function($scope, dataService, $location, $state, $rootScope) {
  $scope.getCompanies = function(){
    dataService.getCompanies()
    .then(function mySucces(response) {
          $scope.Companies = response.data.records;
      }, function myError(error) {
          console.error(error.statusText);
      });
  }
    // $scope.ChosenCompany=
    $scope.ChooseCompany = function(){
    dataService.tieUsertoCompany($rootScope.currentUser.id,$scope.ChosenCompany )
    $state.go('home')
  }
  var vm = this;
  vm.company_fields = {
    name : "",
    description : "",
    industry : ""
  };
  vm.onSubmit = function () {
    dataService
      .createCompany(vm.company_fields)
      .then(function mySucces(response) {
            $scope.comp_id = response.data[0]._fields[0].identity.low;
            dataService.tieUsertoCompany($rootScope.currentUser.id,parseInt($scope.comp_id))
        }, function myError(error) {
            console.error(error.statusText);
        });
  };
  $scope.getCompanies()
}])
