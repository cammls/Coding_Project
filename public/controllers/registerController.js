app.controller('registerCtrl', ['$scope', 'authService', '$location', '$state', function($scope, authService, $location, $state) {
    var vm = this
    vm.credentials = {
      first_name : "",
      last_name : "",
      email : "",
      role : "",
      password : "",
      picture: []
    }

    vm.createUser = function (credentials) {      
      authService
        .register(credentials)
        .catch(function(err){
          console.log(err)
        })
        .then(function(){
          $state.go('createCompany')
        });
    };
}])
