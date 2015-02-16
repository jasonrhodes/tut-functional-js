var beerData = JSON.parse(document.getElementById("beerData").textContent);
var allBeers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

function loadBeers(beers) {
  beerList.innerHTML = _.template(beerTemplate)({ beers: beers });
}

function setActiveFilter(active) {
  for (i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }
  active.classList.add('btn-active');
}

function filterBeers(beers, callback) {
  var filteredBeers = [];
  for (i=0; i<beers.length; i++) {
    if (callback(beers[i])) {
      filteredBeers.push(beers[i]);
    }
  }
  return filteredBeers;
}

function makeFilter(beers, property) {
  return function (value) {
    return filterBeers(beers, function (beer) {
      return beer[property] === value;
    });
  }
}

var filterByLocale = makeFilter(allBeers, 'locale');
var filterByType = makeFilter(allBeers, 'type');

loadBeers(allBeers);

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var clicked = e.target;
  var filter = clicked.dataset.filter;
  var filteredBeers = [];
  var i;
  
  setActiveFilter(clicked);
        
  switch (filter) {
    case 'all':
      filteredBeers = allBeers;
      break;
    case 'domestic':
      filteredBeers = filterByLocale('domestic');
      break;
    case 'imports':
      filteredBeers = filterByLocale('import');
      break;
    case 'ale':
      filteredBeers = filterBeers(allBeers, function (beer) {
        return beer.type === 'ale' || beer.type === 'ipa';
      });
      break;
    case 'lager':
      filteredBeers = filterByType('lager');
      break;
    case 'stout':
      filteredBeers = filterByType('stout');
      break;
  }
  
  loadBeers(filteredBeers);
});