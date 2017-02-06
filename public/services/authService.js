app.factory('authService',  ['$http', '$window', function($http, $window) {

    var saveToken = function (token) {
      localStorage['coding-project'] = token
    };

    var getToken = function () {
      return localStorage['coding-project']
    };

    var isLoggedIn = function() {
      var token = getToken()
      var payload
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
          id: payload.id,
          email: payload.email,
          first_name: payload.first_name,
          last_name: payload.last_name,
          role: payload.role
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
      localStorage.removeItem('coding-project');
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
