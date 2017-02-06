app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

    $urlRouterProvider.otherwise("/404")

    var errorState = {
      name: 'error',
      url: '/404',
      templateUrl: "views/error.html"
    }

    var homeState = {
      name: 'home',
      url: "/",
      templateUrl: "views/home.html",
      controller: 'homeCtrl',
      controllerAs: 'vm'
    }

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: '/views/auth/login.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    }

    var registerState = {
      name: 'register',
      url: '/register',
      templateUrl: '/views/auth/register.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    }

    var uploadState = {
      name: 'upload',
      url: '/upload',
      templateUrl: '/views/test_uploads/upload.html',
      controller: 'uploadCtrl',
      constrollerAs: 'vm'
    }

    var displayuploadState = {
      name: 'display_upload',
      url: '/display_upload',
      templateUrl: '/views/test_uploads/display_upload.html',
      controller: 'displayuploadCtrl',
      constrollerAs: 'vm'
    }

    $stateProvider.state(loginState)
    $stateProvider.state(registerState)
    $stateProvider.state(homeState)
    $stateProvider.state(errorState)
    $stateProvider.state(uploadState)
    $stateProvider.state(displayuploadState)

    $locationProvider.html5Mode(true)

})
