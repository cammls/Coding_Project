$(document).ready(function() {
  var client = algoliasearch('7G7ED6C2ZX', '69c2bcb7e80bf6c3fc83b811bb6c0296');
  var index = client.initIndex('user');
  var $input = $('input');
  $input.keyup(function() {
    index.search($input.val(), {
      hitsPerPage: 10,
      facets: '*'
    }, searchCallback);
  }).focus();
});

function searchCallback(err, content) {
  if (err) {
    console.error(err);
    return;
  }

$('#top-search').autocomplete(
    {hint: false}, [
    {
      source: $.fn.autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      //value to be displayed in input control after user's suggestion selection
      displayKey: 'name',
      //hash of templates used when rendering dataset
      templates: {
        //'suggestion' templating function used to render a single suggestion
        suggestion: function(suggestion) {
          return '<span>' +
            suggestion._highlightResult.name.value + '</span><span>' +
            suggestion._highlightResult.team.value + '</span>';
        }
      }
    }
  ]);
};
