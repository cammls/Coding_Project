app.factory('dataService',  ['$http', 'authService', function($http, authService) {

  var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authService.getToken()
      }
    })
  }
  var getStripeData = function() {
    return $http.get('/api/stripe_data', {
      headers: {
        Authorization: 'Bearer '+ authService.getToken()
    }
    })
  }

  var getPipedriveData = function() {
    return $http.get('/api/pipedrive_data', {
      headers: {
        Authorization: 'Bearer '+ authService.getToken()
    }
    })
  }

  var getUsers = function() {
      return $http.get('/api/companies', {
        headers: {
          Authorization: 'Bearer '+ authService.getToken()
      }
      })
    }
  var getCompanies = function() {
    return $http.get('/api/companies', {
      headers: {
        Authorization: 'Bearer '+ authService.getToken()
    }
    })
  }

  var tieUsertoCompany = function(user_id, comp_id) {
    return $http.post('/api/belongs', {user_id: user_id, comp_id: comp_id} )

  }

  var follow = function(user_id, id) {
    return $http.post('/api/follow', {user_id: user_id, id: id})
  }

  var createCompany = function(company) {
    return $http.post('/api/company/new', company)
    }


    var showUser = function(id){
      // console.log(id)
      return $http.get('/api/user/'+id)
    }

    var following = function(id){
      return $http.get('/api/following/'+id)
    }

  return {
    getProfile : getProfile,
    getStripeData: getStripeData,
    getCompanies: getCompanies,
    tieUsertoCompany: tieUsertoCompany,
    createCompany: createCompany,
    getPipedriveData : getPipedriveData,
    follow : follow,
    following : following,
    showUser: showUser,
    getUsers: getUsers

  }
}]);
