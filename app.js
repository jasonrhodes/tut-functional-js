var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

var filterByLocale = makeFilter('locale');
var filterByType = makeFilter('type');

function loadBeers(beers) {
  beerList.innerHTML = _.template(beerTemplate)({ beers: beers });
}

function setActiveFilter(active) {
  for (i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }
  active.classList.add('btn-active');
}

function filterBeers(property, values) {
  var filtered = [];
  for (i=0; i<beers.length; i++) {
    if (compareValues(beers[i], property, values)) {
      filtered.push(beers[i]);
    }
  }
  return filtered;
}

function compareValues(item, property, values) {
  if (!Array.isArray(values)) {
    return item[property] === values;
  }
  for (var i=0; i<values.length; i++) {
    if (item[property] === values[i]) {
      return true;
    }
  }
  return false;
}

function makeFilter(property) {
  return function (values) {
    return filterBeers(property, values);
  };
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
      filteredBeers = filterByLocale('domestic');
      break;
    case 'imports':
      filteredBeers = filterByLocale('import');
      break;
    case 'ale':
      filteredBeers = filterByType(['ipa', 'ale']);
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