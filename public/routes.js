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
    var financeState = {
      name: 'finance',
      url: "/finance",
      templateUrl: "views/finance.html",
      controller: 'financeCtrl',
      // controllerAs: 'vm'
    }

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: '/views/auth/login.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    }
    var logoutState = {
      name: 'logout',
      url: '/logout',
      controller: 'logoutCtrl',
      controllerAs: 'vm'
    }

    var registerState = {
      name: 'register',
      url: '/register',
      templateUrl: '/views/auth/register.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    }
    var createCompanyState = {
      name: 'createCompany',
      url: '/company',
      templateUrl: '/views/createCompany.html',
      controller: 'companyCtrl',
      controllerAs: 'vm'
    }

    $stateProvider.state(loginState)
    $stateProvider.state(registerState)
    $stateProvider.state(homeState)
    $stateProvider.state(errorState)
    $stateProvider.state(financeState)
    $stateProvider.state(logoutState)
    $stateProvider.state(createCompanyState)

    $locationProvider.html5Mode(true)

})
