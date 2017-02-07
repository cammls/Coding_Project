app.controller('loginCtrl', [ '$scope', 'authService', '$state', '$rootScope', '$location', function($scope, authService, $state, $rootScope, $location) {
  var vm = this;

  vm.credentials = {
    email : "",
    password : ""
  };

  vm.onSubmit = function () {
    authService
    .login(vm.credentials)
    .catch(function(err){
      console.log(err)
    })
    .then(function() {
      $rootScope.isLoggedIn = authService.isLoggedIn();
      $rootScope.currentUser = authService.currentUser();
      $state.go('home')
    });
  };

}]);
