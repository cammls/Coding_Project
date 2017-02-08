app.controller('logoutCtrl', [ '$scope', 'authService', '$state', '$rootScope',  function($scope, authService, $state, $rootScope) {

    authService.logout()
    $rootScope.isLoggedIn = authService.isLoggedIn()
    $rootScope.currentUser = authService.currentUser()
    $state.go('home')


}]);
