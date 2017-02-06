app.controller('registerCtrl', ['$scope', 'authService', '$location', '$state', function($scope, authService, $location, $state) {
    var vm = this;
    vm.credentials = {
      pseudonym : "",
      email : "",
      password : ""
    };
    vm.onSubmit = function () {
      authService
        .register(vm.credentials)
        .catch(function(err){
          console.log(err)
        })
        .then(function(){
          $state.go('home')
        });
    };
}])
