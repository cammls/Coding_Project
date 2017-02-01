app.factory('DataService',  ['$http', 'AuthService', function($http, AuthService) {

  var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ AuthService.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };


}]);
