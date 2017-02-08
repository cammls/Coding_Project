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

    var salesState = {
      name: 'sales',
      url: '/sales',
      templateUrl: '/views/sales.html',
      controller: 'salesCtrl',
    }

    var userprofileState = {
      name: 'userprofile',
      url: '/userprofile',
      templateUrl: '/views/userprofile.html',
      controller: 'userprofileCtrl',
      controllerAs: 'vm'
    }
    var companyState = {
      name: 'companyprofile',
      url: '/companyprofile',
      templateUrl: '/views/companyprofile.html',
      controller: 'companyprofileCtrl',
      controllerAs: 'vm'
    }

    $stateProvider.state(loginState)
    $stateProvider.state(registerState)
    $stateProvider.state(homeState)
    $stateProvider.state(errorState)
    $stateProvider.state(financeState)
<<<<<<< HEAD
    $stateProvider.state(logoutState)
    $stateProvider.state(createCompanyState)
=======
    $stateProvider.state(salesState)
    $stateProvider.state(userprofileState)
    $stateProvider.state(companyState)
>>>>>>> 1f47d3a26e16dcfe71d810fa084a1bd3db91d9c4

    $locationProvider.html5Mode(true)

})
