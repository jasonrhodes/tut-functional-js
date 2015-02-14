console.clear();
var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var filters = document.getElementById("filters");

beerList.innerHTML = _.template(beerTemplate)(beerData);

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var beers = beerData.beers;
  var filter = e.target.dataset.filter;
  var filteredBeers = [];
  var i;
      
  switch (filter) {
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
    case 'craft':
      for (i=0; i<beers.length; i++) {
        if (beers[i].craft) {
          filteredBeers.push(beers[i]);
        }
      }
      break;
  }
    
  beerList.innerHTML = _.template(beerTemplate)({ beers: filteredBeers });
});