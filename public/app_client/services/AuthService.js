app.factory('AuthService',  ['$http', '$window', function($http, $window) {

    var saveToken = function (token) {
      localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).then(function(data){
        saveToken(data.data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(data) {
        saveToken(data.data.token);
      });
    };

    logout = function() {
      localStorage.removeItem('mean-token');
    };

    return {
      saveToken : saveToken,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      register : register,
      login : login,
      getToken : getToken,
      logout : logout
    };

}]);
