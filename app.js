var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

beerList.innerHTML = _.template(beerTemplate)(beerData);

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var beers = beerData.beers;
  var clicked = e.target;
  var filter = clicked.dataset.filter;
  var filteredBeers = [];
  var i;

  for (i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }

  clicked.classList.add('btn-active');
      
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
    
  beerList.innerHTML = _.template(beerTemplate)({ beers: filteredBeers });
});