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

function filterBeers(property, value) {
  var filteredBeers = [];
  for (i=0; i<beers.length; i++) {
    if (compareValues(beers[i], property, value)) {
      filteredBeers.push(beers[i]);
    }
  }
  return filteredBeers;
}

function compareValues(item, property, value) {
  if (!Array.isArray(value)) {
    return item[property] === value;
  }
  for (var i=0; i<value.length; i++) {
    if (item[property] === value[i]) {
      return true;
    }
  }
  return false;
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
      filteredBeers = filterBeers('locale', 'domestic');
      break;
    case 'imports':
      filteredBeers = filterBeers('locale', 'import');
      break;
    case 'ale':
      filteredBeers = filterBeers('type', ['ipa', 'ale']);
      break;
    case 'lager':
      filteredBeers = filterBeers('type', 'lager');
      break;
    case 'stout':
      filteredBeers = filterBeers('type', 'stout');
      break;
  }
  
  loadBeers(filteredBeers);
});