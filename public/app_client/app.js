var app = angular.module('twitterMean', [
          'ui.router',
          'ui.bootstrap'
        ]);

app.run(function($rootScope) {
  $rootScope.islogged = false
})
