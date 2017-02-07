app.controller('mainCtrl', [ '$scope', 'authService', '$state', '$rootScope',  function($scope, authService, $state, $rootScope) {

  $scope.logout = function() {
    console.log("logout?")
    authService.logout()
    $rootScope.isLoggedIn = authService.isLoggedIn();
    $rootScope.currentUser = authService.currentUser();
    $state.go('login')
  }

  $rootScope.isLoggedIn = authService.isLoggedIn();
  $rootScope.currentUser = authService.currentUser();

}]);
