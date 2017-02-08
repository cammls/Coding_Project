<<<<<<< HEAD
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
  $scope.linkedinLink = "https://www.linkedin.com/oauth/v2/authorization"
  + "?response_type=code"
  + "&client_id=77vorb23vqewoi"
  + "&redirect_uri=https%3A%2F%2Flocalhost%3A8080%2Fcompany"
  + "&state=987654321";

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
=======
app.controller('profileCtrl', ['$scope', 'authService', '$location', '$state', function($scope, authService, $location, $state) {
  $scope.test=[1,2,3];
  
>>>>>>> 1f47d3a26e16dcfe71d810fa084a1bd3db91d9c4
}])
