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
    return $http.get('/api/users', {
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
    console.log(user_id, comp_id)
    return $http.post('/api/addrel', {user_id: user_id, comp_id: comp_id} )

  }
  var createCompany = function(company) {
    return $http.post('/api/company/new', company)

    }

  return {
    getProfile : getProfile,
    getStripeData: getStripeData,
    getCompanies: getCompanies,
    getUsers: getUsers,
    tieUsertoCompany: tieUsertoCompany,
    createCompany: createCompany,
    getPipedriveData : getPipedriveData
  }
}]);
