app.controller('uploadCtrl', ['$scope', '$location', '$state', '$http', function($scope, $location, $state, $http) {

  $scope.user = {
    picture: []
  }

  $scope.uploadPicture = function(user) {
    if (user.picture.length != 0) {
      // SHOULD BE PLACED INSIDE USER SERVICE
      console.log(user.picture)
      var fd = new FormData
      fd.append('picture', user.picture)
      for (var pair of fd.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }
      return $http.post('/api/users_upload', fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
        }
      }).then(function(response) {
        console.log(response)
      })
    }
  }
}])
