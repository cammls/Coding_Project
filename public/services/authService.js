app.factory('authService',  ['$http', '$window', function($http, $window) {

    var saveToken = function (token) {
      localStorage['mpcc-token'] = token;
    };

    var getToken = function () {
      return localStorage['mpcc-token'];
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
          pseudonym : payload.pseudonym,
          id : payload.user_id,
          credits : payload.credits
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).then(function(response){
        saveToken(response.data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(response) {
        saveToken(response.data.token);
      });
    };

    logout = function() {
      localStorage.removeItem('mpcc-token');
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
