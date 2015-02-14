var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var avgAbv = document.getElementById("averageAbv");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

function loadBeers(beers) {
  beerList.innerHTML = _.template(beerTemplate)({ beers: beers });
  averageAbv.innerHTML = 'Average ABV: ' + getAverageAbv(beers) + '%';
}

function setActiveFilter(active) {
  for (i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }
  active.classList.add('btn-active');
}

function filter(arr, callback) {
  var filtered = [];
  for (i=0; i<arr.length; i++) {
    if (callback(arr[i])) {
      filtered.push(arr[i]);
    }
  }
  return filtered;
}

function map(arr, callback) {
  var mapped = [];
  for (i=0; i<arr.length; i++) {
    mapped.push(callback(arr[i]));
  }
  return mapped;
}

function reduce(arr, callback, initial) {
  var last = initial;
  for (i=0; i<arr.length; i++) {
    last = callback(last, arr[i]);
  }
  return last;
}

// function getAverageAbv(beers) {
//   var abvs = [];
//   var sum = 0;
//   for (var i=0; i<beers.length; i++) {
//     abvs.push(beers[i].abv);
//     sum += beers[i].abv;
//   }
//   return Math.round((sum / abvs.length) * 10) / 10;
// }

function add(a, b) {
  return a + b;
}

function getAverageAbv(beers) {
  var sum = reduce(map(beers, function (beer) {
    return beer.abv;
  }), add, 0);

  return Math.round((sum / beers.length) * 10) / 10;
}

loadBeers(beers);

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var clicked = e.target;
  var filterName = clicked.dataset.filter;
  var i;

  setActiveFilter(clicked);
      
  switch (filterName) {
    case 'all':
      loadBeers(beers);
      break;
    case 'domestic':
      loadBeers(filter(beers, function (beer) {
        return beer.locale === 'domestic';
      }));
      break;
    case 'imports':
      loadBeers(filter(beers, function (beer) {
        return beer.locale === 'import';
      }));
      break;
    case 'ale':
      loadBeers(filter(beers, function (beer) {
        return beer.type === 'ale' || beer.type === 'ipa';
      }));
      break;
    case 'lager':
      loadBeers(filter(beers, function (beer) {
        return beer.type === 'lager';
      }));
      break;
    case 'stout':
      loadBeers(filter(beers, function (beer) {
        return beer.type === 'stout';
      }));
      break;
  }

});