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

  // var createProduct = function(product) {
  //   var fd = new FormData
  //   for(var key in product)
  //     fd.append(key, product[key])
  //
  //   return $http.post('/api/products', fd, {
  //     transformRequest: angular.identity,
  //     headers: {
  //       'Content-Type': undefined,
  //       Authorization: authService.getToken()
  //     }
  //   }).then(function(response) {
  //     console.log(response)
  //   })
  // }

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
    tieUsertoCompany: tieUsertoCompany,
    createCompany: createCompany,
    getPipedriveData : getPipedriveData
    // createProduct : createProduct,
    // getProducts : getProducts,
    // voteFor : voteFor,
    // getUserVote : getUserVote,
    // ratingProduct : ratingProduct,
    // currentRateProduct : currentRateProduct,
    // placeBid : placeBid
  }
}]);
