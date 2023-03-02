var $searchForm = document.querySelector('form');
var $seachInput = document.querySelector('.search');
var $main = document.querySelector('[data-view="homepage"]');
var $section = document.querySelector('[data-view="results"]');
var $ul = document.querySelector('ul');
var $home = document.querySelector('#home');

function getResults(name) {
  $searchForm.reset();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/API/AdvancedSearch/k_99uf6ywj/?title=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
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

function ViewSwap(name) {
  if (name === 'homepage') {
    $main.classList.remove('hidden');
    $section.classList.add('hidden');
  } else if (name === 'results') {
    $main.classList.add('hidden');
    $section.classList.remove('hidden');
  }
  data.view = name;
}

$home.addEventListener('click', goHome);

function goHome() {
  if ($home) {
    ViewSwap('homepage');
  }
}

$searchForm.addEventListener('submit', submitSearch);

function submitSearch(event) {
  event.preventDefault();
  getResults($seachInput.value);
  while ($ul.firstChild) {
    $ul.removeChild($ul.firstChild);
  }
  ViewSwap('results');
}
