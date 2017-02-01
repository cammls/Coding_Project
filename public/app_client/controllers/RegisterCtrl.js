app.controller('registerController', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {
    var vm = this;
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    vm.onSubmit = function () {
      AuthService
        .register(vm.credentials)
        .catch(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile')
        });
    };
}])
