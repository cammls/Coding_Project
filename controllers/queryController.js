var path             = require('path')
var querySvc         = require('../services/pipedriveAPIQuery.js')

var prepareQuery = function(req, res) {
  // console.log('  ctrl->');
  querySvc.get_pipedrive_deals(req.body, function(error, data){
    if (error) {
      // console.log(error);
      res.json({ 'error' : error})
    } else {
      // console.log(data[0]);
      res.json({ 'pipedrive_json' : data})
    }
  })
}

exports.prepareQuery = prepareQuery
