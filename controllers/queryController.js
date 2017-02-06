var path             = require('path')
var querySvc         = require('../services/pipedriveAPIQuery.js')

var prepareQuery = function(req, res) {
  console.log('  ctrl->');
  querySvc.get_pipedrive_data(req.body, function(error, data){
    if (error) {
      // console.log(error);
      res.json({ 'error' : error})
    } else {
      // console.log(data);
      res.json({ 'pipedrive_json' : data})
    }
  })
}

exports.prepareQuery = prepareQuery
