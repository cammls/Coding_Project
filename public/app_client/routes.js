app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    var registerState = {
      name: 'register',
      url: '/register',
      templateUrl: '/app_client/views/register.html',
      controller: 'registerController',
      controllerAs: 'vm'
    }

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: '/app_client/views/login.html',
      controller: 'loginController',
      controllerAs: 'vm'
    }

    var profileState = {
      name: 'profile',
      url: '/profile',
      templateUrl: '/app_client/views/profile.html',
      controller: 'profileController',
      controllerAs: 'vm'
    }

    $stateProvider.state(registerState)
    $stateProvider.state(loginState)
    $stateProvider.state(profileState)

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

})
