app.controller('navigationController', [ '$scope', 'AuthService', '$state', '$rootScope',  function($scope, AuthService, $state, $rootScope) {

  $scope.logout = function() {
    AuthService.logout()
    $scope.isLoggedIn = AuthService.isLoggedIn();
    $scope.currentUser = AuthService.currentUser();
    $rootScope.islogged = false;
    $state.go('login')
  }  

  $scope.isLoggedIn = AuthService.isLoggedIn();
  $scope.currentUser = AuthService.currentUser();

}]);
