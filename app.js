var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beers = beerData.beers;
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

function filterBeers(cb) {
  var filtered = [];
  for (i=0; i<beers.length; i++) {
    if (cb(beers[i])) {
      filtered.push(beers[i]);
    }
  }
  return filtered;
}

loadBeers(beers);

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var clicked = e.target;
  var filter = clicked.dataset.filter;
  var filteredBeers = [];
  var i;

  setActiveFilter(clicked);
      
  switch (filter) {
    case 'all':
      filteredBeers = beers;
      break;
    case 'domestic':
      filteredBeers = filterBeers(function (beer) {
        return beer.locale === 'domestic';
      });
      break;
    case 'imports':
      filteredBeers = filterBeers(function (beer) {
        return beer.locale === 'import';
      });
      break;
    case 'ale':
      filteredBeers = filterBeers(function (beer) {
        return beer.type === 'ale' || beer.type === 'ipa';
      });
      break;
    case 'lager':
      filteredBeers = filterBeers(function (beer) {
        return beer.type === 'lager';
      });
      break;
    case 'stout':
      filteredBeers = filterBeers(function (beer) {
        return beer.type === 'stout';
      });
      break;
  }
    
  loadBeers(filteredBeers);
});