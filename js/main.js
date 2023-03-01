// var $searchForm = document.querySelector('.search');
// var $searchButton1 = document.querySelector('i');
// var $searchButton2 = document.querySelector('#search-button');
// var $main = document.querySelector('[data-view="homepage"]');
// var $section = document.querySelector('[data-view="results"');
var $ul = document.querySelector('ul');
// console.log($searchForm);
// console.log($searchButton1);
// console.log($searchButton2);
// console.log($section);

// function ViewSwap(name) {
//   if (name === 'homepage') {
//     $main.classList.remove('hidden');
//     $section.classList.add('hidden');
//   } else if (name === 'results') {
//     $main.classList.add('hidden');
//     $section.classList.remove('hidden');
//   }
//   data.view = name;
// }

function getMovieName(name) {
  var xhr = new XMLHttpRequest();
  // console.log('https://imdb-api.com/API/AdvancedSearch/k_99uf6ywj/?title=' + name);
  xhr.open('GET', 'https://imdb-api.com/API/AdvancedSearch/k_99uf6ywj/?title=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr.status', xhr.status);
    // console.log('xhr.response', xhr.response);
    for (var i = 0; i < 5; i++) {
      var $li = document.createElement('li');
      var $resultsBackground = document.createElement('div');
      $resultsBackground.className = 'results-background';
      var $movieBackground = document.createElement('div');
      $movieBackground.className = 'results-second-background';
      var $movieTitle = document.createElement('h2');
      $movieTitle.setAttribute('id', 'title');
      $movieTitle.textContent = xhr.response.results[i].title;
      var $moviePoster = document.createElement('img');
      $moviePoster.setAttribute('src', xhr.response.results[i].image);
      var $learnMore = document.createElement('a');
      $learnMore.setAttribute('id', 'learn-more');
      $learnMore.textContent = 'Learn More';
      $li.appendChild($resultsBackground);
      $resultsBackground.appendChild($movieBackground);
      $movieBackground.appendChild($movieTitle);
      $movieBackground.appendChild($moviePoster);
      $movieBackground.appendChild($learnMore);
      $ul.appendChild($li);
    }
  });
  xhr.send();
}

getMovieName(); // no purpose just so I can commit
