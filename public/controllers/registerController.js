app.controller('registerCtrl', ['$scope', 'authService', '$location', '$state', function($scope, authService, $location, $state) {
    var vm = this;
    vm.credentials = {
      first_name : "",
      last_name : "",
      email : "",
      role : "",
      password : ""
    };
    vm.onSubmit = function () {
      authService
        .register(vm.credentials)
        .catch(function(err){
          console.log(err)
        })
        .then(function(){
          $state.go('createCompany')
        });
    };
}])
