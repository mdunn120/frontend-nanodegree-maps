// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'nhNfJnDFdEElR3rW5rIfBQ',
  consumer_secret: 'EZT8hUIjrk44KMG1Ox0yFyKkWDc',
  token: 'ptJyRqoMFjJm2fA_8pWyWrFskf6cOla2',
  token_secret: 'U2ocqjGLOxAVp9ZX6EaZ4tN1pk0',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business('yelp-san-francisco')
  .then(console.log)
  .catch(console.error);

yelp.phoneSearch({ phone: '+15555555555' })
  .then(console.log)
  .catch(console.error);

// A callback based API is also available:
yelp.business('yelp-san-francisco', function(err, data) {
  if (err) return console.log(error);
  console.log(data);
});