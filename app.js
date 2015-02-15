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
      for (i=0; i<beers.length; i++) {
        if (beers[i].locale === 'domestic') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'imports':
      for (i=0; i<beers.length; i++) {
        if (beers[i].locale === 'import') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'ale':
      for (i=0; i<beers.length; i++) {
        if (beers[i].type === 'ipa' || beers[i].type === 'ale') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'lager':
      for (i=0; i<beers.length; i++) {
        if (beers[i].type === 'lager') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'stout':
      for (i=0; i<beers.length; i++) {
        if (beers[i].type === 'stout') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
  }
  
  loadBeers(filteredBeers);
});