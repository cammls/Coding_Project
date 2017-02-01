app.controller('loginController', [ '$scope', 'AuthService', '$state', '$rootScope', function($scope, AuthService, $state, $rootScope) {
  var vm = this;

  vm.credentials = {
    email : "",
    password : ""
  };

  vm.onSubmit = function () {
    AuthService
    .login(vm.credentials)
    .catch(function(err){
      alert(err);
    })
    .then(function() {
      $rootScope.islogged = true
      $state.go("profile")
    });
  };

}]);
