var $searchForm = document.querySelector('form');
var $seachInput = document.querySelector('.search');
var $main = document.querySelector('[data-view="homepage"]');
var $sectionResults = document.querySelector('[data-view="results"]');
var $sectionDescription = document.querySelector('[data-view="description"]');
var $myListPage = document.querySelector('[data-view="my-list-page"]');
var $ul = document.querySelector('ul');
var $home = document.querySelector('#home');
var $myList = document.querySelector('#my-list-header');
var $descriptionUl = document.querySelector('#description-list');
var $myListUl = document.querySelector('#my-list-ul');
var $popUpPage = document.querySelector('#pop-up-page');
var $noEntries = document.querySelector('.no-entries-on');
var $loader = document.querySelector('.lds-default');
var $loaderHolder = document.querySelector('.loader-holder');
var $homepageMedia = document.querySelector('.recommended-media-container');
var $cardWrapper = document.querySelector('.recommended-container');
var $cardWrapper2 = document.querySelector('.recommended-container2');
var $widthToScroll = $cardWrapper.children[3].offsetWidth;
var $nextArrow = document.querySelector('.arrow-next');
var $prevArrow = document.querySelector('.arrow-prev');
var $nextArrow2 = document.querySelector('.arrow-next2');
var $prevArrow2 = document.querySelector('.arrow-prev2');

$prevArrow.onclick = function () {
  $cardWrapper.scrollLeft -= $widthToScroll + 3;
};

$nextArrow.onclick = function () {
  $cardWrapper.scrollLeft += $widthToScroll + 3;
};

$nextArrow2.onclick = function () {
  $cardWrapper2.scrollLeft += $widthToScroll + 3;
};

$prevArrow2.onclick = function () {
  $cardWrapper2.scrollLeft -= $widthToScroll + 3;
};

function removeLoader() {
  $loader.classList.add('hidden');
  $loaderHolder.classList.add('hidden');
}

function addLoader() {
  $loader.classList.remove('hidden');
  $loaderHolder.classList.remove('hidden');
}

$homepageMedia.addEventListener('click', getHomepageResults);
function getHomepageResults() {
  var clickedElement = event.target;
  var closestContainer = clickedElement.closest('.recommended-movie-container');
  if (closestContainer === null) {
    return;
  }
  var movieId = closestContainer.id;
  if (data.temporaryDescription.length) {
    data.temporaryDescription = [];
  }
  if ($descriptionUl.firstElementChild) {
    $descriptionUl.removeChild($descriptionUl.firstElementChild);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Title/k_99uf6ywj/' + movieId);
  xhr.response = 'json';
  xhr.addEventListener('load', function () {
    var responseData = JSON.parse(xhr.response);
    var $movieInfoObject = {
      title: responseData.title,
      image: responseData.image,
      plot: responseData.plot,
      stars: responseData.stars,
      genres: responseData.genres,
      contentRating: responseData.contentRating,
      runtime: responseData.runtimeStr,
      rating: responseData.imDbRating
    };
    data.temporaryDescription.splice(0, 1);
    data.temporaryDescription.unshift($movieInfoObject);
    refreshDescriptionPage();
    document.documentElement.scrollTop = 0;
    viewSwap('description');
  });
  xhr.send();
}

function getResults(name) {
  addLoader();
  data.temporaryResults.splice(0, 1);
  data.temporaryResults.unshift(name);
  $searchForm.reset();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/API/AdvancedSearch/k_99uf6ywj/?title=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    removeLoader();
    for (var i = 0; i < 10; i++) {
      var $li = document.createElement('li');
      $li.setAttribute('data-entry-id', xhr.response.results[i].id);
      $li.className = 'white results-page';
      var $resultsBackground = document.createElement('div');
      $resultsBackground.className = 'results-bg';
      var $resultsTitleContainer = document.createElement('div');
      $resultsTitleContainer.className = 'flex justify-center results-title-container';
      var $resultsTitle = document.createElement('h1');
      $resultsTitle.textContent = xhr.response.results[i].title;
      var $resultsImageContainer = document.createElement('div');
      $resultsImageContainer.className = 'results-image-container';
      var $resultsImageContainer2 = document.createElement('div');
      var $resultsImage = document.createElement('img');
      if (xhr.response.results[i].image !== null) {
        $resultsImage.setAttribute('src', xhr.response.results[i].image);
      } else {
        $resultsImage.setAttribute('src', 'images/default-movie-poster.jpeg');
      }
      $resultsImage.className = 'results-image';
      var $resultsLearnMoreContainer = document.createElement('div');
      $resultsLearnMoreContainer.className = 'flex justify-center results-learn-more-container';
      var $resultsLearnMore = document.createElement('a');
      $resultsLearnMore.className = 'white-bg black results-learn-more learn-more pointer';
      $resultsLearnMore.textContent = 'Learn More';
      var $movieId = document.createElement('div');
      $movieId.className = 'hidden movie-id';
      $movieId.textContent = xhr.response.results[i].id;
      $li.appendChild($resultsBackground);
      $resultsBackground.appendChild($resultsTitleContainer);
      $resultsTitleContainer.appendChild($resultsTitle);
      $resultsBackground.appendChild($resultsImageContainer);
      $resultsImageContainer.appendChild($resultsImageContainer2);
      $resultsImageContainer2.appendChild($resultsImage);
      $resultsBackground.appendChild($resultsLearnMoreContainer);
      $resultsLearnMoreContainer.appendChild($resultsLearnMore);
      $resultsBackground.appendChild($movieId);
      // var $movieBackground = document.createElement('div');
      // $movieBackground.className = 'results-second-background';
      // var $movieTitle = document.createElement('h2');
      // $movieTitle.setAttribute('class', 'title');
      // $movieTitle.textContent = xhr.response.results[i].title;
      // var $moviePosterContainer = document.createElement('div');
      // $moviePosterContainer.className = 'movie-poster-container';
      // var $moviePoster = document.createElement('img');
      // $moviePoster.setAttribute('src', xhr.response.results[i].image);
      // $moviePoster.setAttribute('alt', 'movie-poster');
      // var $learnMore = document.createElement('a');
      // $learnMore.setAttribute('class', 'learn-more');
      // $learnMore.textContent = 'Learn More';
      // var $movieId = document.createElement('div');
      // $movieId.className = 'hidden movie-id';
      // $movieId.textContent = xhr.response.results[i].id;
      // $li.appendChild($resultsBackground);
      // $resultsBackground.appendChild($movieBackground);
      // $movieBackground.appendChild($movieTitle);
      // $movieBackground.appendChild($moviePosterContainer);
      // $moviePosterContainer.appendChild($moviePoster);
      // $movieBackground.appendChild($learnMore);
      // $resultsBackground.appendChild($movieId);
      $ul.appendChild($li);
    }

    $ul.addEventListener('click', learnMoreClick);

    function learnMoreClick(event) {
      if (event.target.classList.contains('learn-more')) {
        if ($descriptionUl.childElementCount !== 0) {
          while ($descriptionUl.firstChild) {
            $descriptionUl.removeChild($descriptionUl.firstChild);
          }
        }
        for (var i = 0; i < xhr.response.results.length; i++) {
          if (xhr.response.results[i].id === (event.target.closest('li').getAttribute('data-entry-id'))) {
            var $descriptionLi = document.createElement('li');
            $descriptionLi.className = 'white more-info-bg rounded';
            var $descriptionMainDiv = document.createElement('div');
            var $descriptionTitleContainer = document.createElement('div');
            $descriptionTitleContainer.className = 'description-title-container flex justify-center';
            var $descriptionTitle = document.createElement('h1');
            $descriptionTitle.textContent = xhr.response.results[i].title;
            var $descriptionImageContainer = document.createElement('div');
            $descriptionImageContainer.className = 'description-image-container';
            var $descriptionImage = document.createElement('img');
            if (xhr.response.results[i].image !== null) {
              $descriptionImage.setAttribute('src', xhr.response.results[i].image);
            } else {
              $descriptionImage.setAttribute('src', 'images/default-movie-poster.jpeg');
            }

            $descriptionImage.setAttribute('alt', 'movie-poster');
            $descriptionImage.className = 'description-image';
            var $descriptionButtonContainer = document.createElement('div');
            $descriptionButtonContainer.className = 'description-button-container flex justify-center';
            var $descriptionAddButton = document.createElement('i');
            if (data.entries.some(obj => obj.title === xhr.response.results[i].title)) {
              $descriptionAddButton.className = 'fa-solid fa-plus fa-2x black white-bg add-button no-button';
            } else {
              $descriptionAddButton.className = 'fa-solid fa-plus fa-2x black white-bg add-button';
            }
            // $descriptionAddButton.className = 'fa-solid fa-plus fa-2x black white-bg add-button';
            var $descriptionPlotContainer = document.createElement('div');
            $descriptionPlotContainer.className = 'description-plot-container';
            var $descriptionPlotHeader = document.createElement('h3');
            $descriptionPlotHeader.className = 'description-plot-header';
            $descriptionPlotHeader.textContent = 'Description';
            var $descriptionPlot = document.createElement('div');
            $descriptionPlot.className = 'description-plot';
            var $descriptionContent = document.createElement('div');
            $descriptionContent.className = 'description-content';
            if (xhr.response.results[i].plot !== null && xhr.response.results[i].plot !== '') {
              $descriptionContent.textContent = xhr.response.results[i].plot;
            } else {
              $descriptionContent.textContent = 'N/A';
            }
            var $descriptionCastContainer = document.createElement('div');
            $descriptionCastContainer.className = 'description-cast-container';
            var $descriptionCastHeader = document.createElement('h3');
            $descriptionCastHeader.textContent = 'Cast:';
            $descriptionCastHeader.className = 'description-cast-header';
            var $descriptionContent2 = document.createElement('div');
            $descriptionContent2.className = 'description-content';
            if (xhr.response.results[i].stars !== null && xhr.response.results[i].stars !== '') {
              $descriptionContent2.textContent = xhr.response.results[i].stars;
            } else {
              $descriptionContent2.textContent = 'N/A';
            }
            var $descriptionGenreContainer = document.createElement('div');
            $descriptionGenreContainer.className = 'description-genre-container';
            var $descriptionGenreHeader = document.createElement('h3');
            $descriptionGenreHeader.className = 'description-score-header';
            $descriptionGenreHeader.textContent = 'Genre:';
            var $descriptionContent3 = document.createElement('div');
            $descriptionContent3.className = 'description-content';
            if (xhr.response.results[i].genres !== null && xhr.response.results[i].genres !== '') {
              $descriptionContent3.textContent = xhr.response.results[i].genres;
            } else {
              $descriptionContent3.textContent = 'N/A';
            }
            var $descriptionScoreContainer = document.createElement('div');
            $descriptionScoreContainer.className = 'description-score-container';
            var $descriptionScoreHeader = document.createElement('h3');
            $descriptionScoreHeader.className = 'description-score-header';
            $descriptionScoreHeader.textContent = 'Average Viewer Score:';
            var $descriptionContent4 = document.createElement('div');
            $descriptionContent4.className = 'description-content';
            if (xhr.response.results[i].imDBRating !== null && xhr.response.results[i].imDbRating !== '') {
              $descriptionContent4.textContent = xhr.response.results[i].imDbRating;
            } else {
              $descriptionContent4.textContent = 'N/A';
            }
            var $descriptionFilterContainer1 = document.createElement('div');
            $descriptionFilterContainer1.className = 'description-filter-container';
            var $descriptionFilterHeader1 = document.createElement('div');
            var $descriptionContentRating = document.createElement('h3');
            $descriptionContentRating.className = 'description-genre-header';
            $descriptionContentRating.textContent = 'Content Rating:';
            var $descriptionContent5 = document.createElement('div');
            $descriptionContent5.className = 'description-content';
            if (xhr.response.results[i].contentRating !== null && xhr.response.results[i].contentRating !== '') {
              $descriptionContent5.textContent = xhr.response.results[i].contentRating;
            } else {
              $descriptionContent5.textContent = 'N/A';
            }
            var $descriptionFilterContainer2 = document.createElement('div');
            $descriptionFilterContainer2.className = 'description-filter-container';
            var $descriptionFilterHeader2 = document.createElement('div');
            var $descriptionRuntime = document.createElement('h3');
            $descriptionRuntime.className = 'description-genre-header';
            $descriptionRuntime.textContent = 'Runtime:';
            var $descriptionContent6 = document.createElement('div');
            $descriptionContent6.className = 'description-content';
            if (xhr.response.results[i].runtimeStr !== null && xhr.response.results[i].runtimeStr !== '') {
              $descriptionContent6.textContent = xhr.response.results[i].runtimeStr;
            } else {
              $descriptionContent6.textContent = 'N/A';
            }
            $descriptionLi.appendChild($descriptionMainDiv);
            $descriptionMainDiv.appendChild($descriptionTitleContainer);
            $descriptionTitleContainer.appendChild($descriptionTitle);
            $descriptionMainDiv.appendChild($descriptionImageContainer);
            $descriptionImageContainer.appendChild($descriptionImage);
            $descriptionMainDiv.appendChild($descriptionButtonContainer);
            $descriptionButtonContainer.appendChild($descriptionAddButton);
            $descriptionMainDiv.appendChild($descriptionPlotContainer);
            $descriptionPlotContainer.appendChild($descriptionPlotHeader);
            $descriptionPlotContainer.appendChild($descriptionPlot);
            $descriptionPlot.appendChild($descriptionContent);
            $descriptionMainDiv.appendChild($descriptionCastContainer);
            $descriptionCastContainer.appendChild($descriptionCastHeader);
            $descriptionCastContainer.appendChild($descriptionContent2);
            $descriptionMainDiv.appendChild($descriptionGenreContainer);
            $descriptionGenreContainer.appendChild($descriptionGenreHeader);
            $descriptionGenreContainer.appendChild($descriptionContent3);
            $descriptionMainDiv.appendChild($descriptionScoreContainer);
            $descriptionScoreContainer.appendChild($descriptionScoreHeader);
            $descriptionScoreContainer.appendChild($descriptionContent4);
            $descriptionMainDiv.appendChild($descriptionFilterContainer1);
            $descriptionFilterContainer1.appendChild($descriptionFilterHeader1);
            $descriptionFilterHeader1.appendChild($descriptionContentRating);
            $descriptionFilterContainer1.appendChild($descriptionContent5);
            $descriptionMainDiv.appendChild($descriptionFilterContainer2);
            $descriptionFilterContainer2.appendChild($descriptionFilterHeader2);
            $descriptionFilterHeader2.appendChild($descriptionRuntime);
            $descriptionFilterContainer2.appendChild($descriptionContent6);
            $descriptionUl.appendChild($descriptionLi);
            // var $descriptionLi = document.createElement('li');
            // var $descriptionBackground = document.createElement('div');
            // $descriptionBackground.className = 'description-background';
            // var $descriptionTitle = document.createElement('div');
            // $descriptionTitle.className = 'description-title';
            // $descriptionTitle.textContent = xhr.response.results[i].title;
            // var $descriptionmoviePosterContainer = document.createElement('div');
            // $descriptionmoviePosterContainer.className = 'description-movie-poster-container';
            // var $descriptionImage = document.createElement('img');
            // $descriptionImage.setAttribute('src', xhr.response.results[i].image);
            // $descriptionImage.setAttribute('alt', 'movie-poster');
            // $descriptionImage.className = 'description-image';
            // var $descriptionButtonContainer = document.createElement('div');
            // $descriptionButtonContainer.className = 'description-button';
            // var $descriptionAddButton = document.createElement('button');
            // $descriptionAddButton.className = 'add-button';
            // var $descriptionFaPlus = document.createElement('i');
            // $descriptionFaPlus.classList.add('fa-solid', 'fa-plus', 'fa-3x');
            // var $descriptionPlotHeader = document.createElement('h3');
            // $descriptionPlotHeader.className = 'description-plot-header';
            // $descriptionPlotHeader.textContent = 'Description';
            // var $descriptionPlot = document.createElement('p');
            // $descriptionPlot.className = 'description-plot';
            // if (xhr.response.results[i].plot !== null) {
            //   $descriptionPlot.textContent = xhr.response.results[i].plot;
            // } else {
            //   $descriptionPlot.textContent = 'N/A';
            // }
            // var $descriptionCastHeader = document.createElement('h3');
            // $descriptionCastHeader.className = 'description-cast-header';
            // $descriptionCastHeader.textContent = 'Cast:';
            // var $descriptionCastList = document.createElement('div');
            // $descriptionCastList.className = 'description-cast-list';
            // if (xhr.response.results[i].stars !== null && xhr.response.results[i].stars !== '') {
            //   $descriptionCastList.textContent = xhr.response.results[i].stars;
            // } else {
            //   $descriptionCastList.textContent = 'N/A';
            // }
            // var $descriptionGenreHeader = document.createElement('h3');
            // $descriptionGenreHeader.className = 'description-genre-header';
            // $descriptionGenreHeader.textContent = 'Genre:';
            // var $descriptionGenreList = document.createElement('div');
            // $descriptionGenreList.className = 'description-genre-list';
            // if (xhr.response.results[i].genres !== null) {
            //   $descriptionGenreList.textContent = xhr.response.results[i].genres;
            // } else {
            //   $descriptionGenreList.textContent = 'N/A';
            // }
            // var $descriptionThreeItemRow = document.createElement('div');
            // $descriptionThreeItemRow.className = 'description-three-item-row';
            // var $ContentRatingContainer = document.createElement('div');
            // var $ContentRating = document.createElement('div');
            // $ContentRating.textContent = 'Content Rating:';
            // var $descriptionContentRatingResults = document.createElement('div');
            // if (xhr.response.results[i].contentRating !== null) {
            //   $descriptionContentRatingResults.textContent = xhr.response.results[i].contentRating;
            // } else {
            //   $descriptionContentRatingResults.textContent = 'N/A';
            // }
            // var $RuntimeContainer = document.createElement('div');
            // var $Runtime = document.createElement('div');
            // $Runtime.textContent = 'Runtime:';
            // var $descriptionRuntime = document.createElement('div');
            // if (xhr.response.results[i].runtimeStr !== null) {
            //   $descriptionRuntime.textContent = xhr.response.results[i].runtimeStr;
            // } else {
            //   $descriptionRuntime.textContent = 'N/A';
            // }
            // var $averageCriticScoreContainer = document.createElement('div');
            // var $averageCriticScore = document.createElement('div');
            // $averageCriticScore.textContent = 'Average Critic Score:';
            // var $descriptionAverageCriticScore = document.createElement('div');
            // if (xhr.response.results[i].imDbRating !== null) {
            //   $descriptionAverageCriticScore.textContent = xhr.response.results[i].imDbRating;
            // } else {
            //   $descriptionAverageCriticScore.textContent = 'N/A';
            // }
            // $descriptionLi.appendChild($descriptionBackground);
            // $descriptionBackground.appendChild($descriptionTitle);
            // $descriptionBackground.appendChild($descriptionmoviePosterContainer);
            // $descriptionmoviePosterContainer.appendChild($descriptionImage);
            // $descriptionBackground.appendChild($descriptionButtonContainer);
            // $descriptionButtonContainer.appendChild($descriptionAddButton);
            // $descriptionAddButton.appendChild($descriptionFaPlus);
            // $descriptionBackground.appendChild($descriptionPlotHeader);
            // $descriptionBackground.appendChild($descriptionPlot);
            // $descriptionBackground.appendChild($descriptionCastHeader);
            // $descriptionBackground.appendChild($descriptionCastList);
            // $descriptionBackground.appendChild($descriptionGenreHeader);
            // $descriptionBackground.appendChild($descriptionGenreList);
            // $descriptionBackground.appendChild($descriptionThreeItemRow);
            // $descriptionThreeItemRow.appendChild($ContentRatingContainer);
            // $ContentRatingContainer.appendChild($ContentRating);
            // $ContentRatingContainer.appendChild($descriptionContentRatingResults);
            // $descriptionThreeItemRow.appendChild($RuntimeContainer);
            // $RuntimeContainer.appendChild($Runtime);
            // $RuntimeContainer.appendChild($descriptionRuntime);
            // $descriptionThreeItemRow.appendChild($averageCriticScoreContainer);
            // $averageCriticScoreContainer.appendChild($averageCriticScore);
            // $averageCriticScoreContainer.appendChild($descriptionAverageCriticScore);
            // $descriptionUl.appendChild($descriptionLi);
            var $movieInfoObject = {
              title: xhr.response.results[i].title,
              image: xhr.response.results[i].image,
              plot: xhr.response.results[i].plot,
              stars: xhr.response.results[i].stars,
              genres: xhr.response.results[i].genres,
              contentRating: xhr.response.results[i].contentRating,
              runtime: xhr.response.results[i].runtimeStr,
              rating: xhr.response.results[i].imDbRating
            };
            data.temporaryDescription.splice(0, 1);
            data.temporaryDescription.unshift($movieInfoObject);
            document.documentElement.scrollTop = 0;
            viewSwap('description');

          }
        }
      }
      $descriptionAddButton.addEventListener('click', addToList);

      function addToList(event) {
        if (data.entries.find(isMovieName) === undefined) {
          $movieInfoObject.entryId = data.nextEntryId;
          data.nextEntryId++;
          data.entries.unshift($movieInfoObject);
          createMyList();
          viewSwap('my-list-page');
        }
      }
      function isMovieName(name) {
        return name.title === $movieInfoObject.title;
      }
    }
  });
  xhr.send();
}

function viewSwap(name) {
  if (name === 'homepage') {
    $main.classList.remove('hidden');
    $sectionResults.classList.add('hidden');
    $sectionDescription.classList.add('hidden');
    $myListPage.classList.add('hidden');
  } else if (name === 'results') {
    $sectionResults.classList.remove('hidden');
    $main.classList.add('hidden');
    $sectionDescription.classList.add('hidden');
    $myListPage.classList.add('hidden');
  } else if (name === 'description') {
    $sectionDescription.classList.remove('hidden');
    $main.classList.add('hidden');
    $sectionResults.classList.add('hidden');
    $myListPage.classList.add('hidden');
  } else if (name === 'my-list-page') {
    $myListPage.classList.remove('hidden');
    $sectionDescription.classList.add('hidden');
    $main.classList.add('hidden');
    $sectionResults.classList.add('hidden');
  }
  data.view = name;
}

$searchForm.addEventListener('submit', submitSearch);

function submitSearch(event) {
  event.preventDefault();
  getResults($seachInput.value);
  while ($ul.firstChild) {
    $ul.removeChild($ul.firstChild);
  }
  viewSwap('results');
}

$home.addEventListener('click', goHome);

function goHome() {
  if ($home) {
    viewSwap('homepage');
  }
}

$myList.addEventListener('click', goToMyList);

function goToMyList() {
  if ($myList) {
    viewSwap('my-list-page');
  }
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', refreshView);

function refreshView(event) {
  viewSwap(data.view);
  getResults(data.temporaryResults[0]);
  refreshDescriptionPage();
  createMyList();
}

$myList.addEventListener('click', createMyList);

function createMyList(event) {
  toggleNoEntries();
  if ($myListUl.childElementCount !== 0) {
    while ($myListUl.firstChild) {
      $myListUl.removeChild($myListUl.firstChild);
    }
  }
  for (var i = 0; i < data.entries.length; i++) {
    var $myListLi = document.createElement('li');
    $myListLi.setAttribute('data-entry-id', data.entries[i].entryId);
    var $myListBackground = document.createElement('div');
    $myListBackground.className = 'my-list-background';
    var $myListTwoItemRow = document.createElement('div');
    $myListTwoItemRow.className = 'two-item-row';
    var $myListMoviePoster = document.createElement('img');
    $myListMoviePoster.classList.add('my-list-movie-poster', 'column');
    $myListMoviePoster.setAttribute('src', data.entries[i].image);
    var $myListMovieDetails = document.createElement('div');
    $myListMovieDetails.classList.add('my-list-movie-details', 'column');
    var $myListTitle = document.createElement('div');
    $myListTitle.className = 'my-list-title';
    var $myListTitleInfo = document.createElement('h3');
    $myListTitleInfo.className = 'my-list-title-info';
    if (data.entries[i].title === null || data.entries[i].title === '') {
      $myListTitleInfo.textContent = 'N/A';
    } else {
      $myListTitleInfo.textContent = data.entries[i].title;
    }
    var $myListMovieDescription = document.createElement('div');
    $myListMovieDescription.className = 'my-list-movie-description';
    var $myListParagraphTitle = document.createElement('h3');
    $myListParagraphTitle.className = 'my-list-h3';
    $myListParagraphTitle.textContent = 'Description:';
    var $myListParagraph = document.createElement('p');
    $myListParagraph.className = 'my-list-paragraph';
    if (data.entries[i].plot === null || data.entries[i].plot === '') {
      $myListParagraph.textContent = 'N/A';
    } else {
      $myListParagraph.textContent = data.entries[i].plot;
    }
    var $myListCastContainer = document.createElement('div');
    var $myListCast = document.createElement('h3');
    $myListCast.className = 'my-list-h3';
    $myListCast.textContent = 'Cast:';
    var $myListCastInfo = document.createElement('div');
    $myListCastInfo.className = 'my-list-info';
    if (data.entries[i].stars === null || data.entries[i].stars === '') {
      $myListCastInfo.textContent = 'N/A';
    } else {
      $myListCastInfo.textContent = data.entries[i].stars;
    }
    var $myListGenreContainer = document.createElement('div');
    var $myListGenre = document.createElement('h3');
    $myListGenre.className = 'my-list-h3';
    $myListGenre.textContent = 'Genre:';
    var $myListGenreInfo = document.createElement('div');
    $myListGenreInfo.className = 'my-list-info';
    if (data.entries[i].genres === null || data.entries[i].genres === '') {
      $myListGenreInfo.textContent = 'N/A';
    } else {
      $myListGenreInfo.textContent = data.entries[i].genres;
    }
    var $mylistThreeItemRow = document.createElement('div');
    $mylistThreeItemRow.className = 'my-list-three-item-row';
    var $divContainerOne = document.createElement('div');
    var $myListContent = document.createElement('div');
    $myListContent.textContent = 'Content';
    var $myListRating = document.createElement('div');
    $myListRating.textContent = 'Rating:';
    var $myListContentRatingInfo = document.createElement('div');
    if (data.entries[i].contentRating === null || data.entries[i].contentRating === '') {
      $myListContentRatingInfo.textContent = 'N/A';
    } else {
      $myListContentRatingInfo.textContent = data.entries[i].contentRating;
    }
    var $divContainerTwo = document.createElement('div');
    var $myListRuntime = document.createElement('div');
    $myListRuntime.textContent = 'Runtime:';
    var $myListRuntimeInfo = document.createElement('div');
    if (data.entries[i].runtime === null || data.entries[i].runtime === '') {
      $myListRuntimeInfo.textContent = 'N/A';
    } else {
      $myListRuntimeInfo.textContent = data.entries[i].runtime;
    }
    var $divContainerThree = document.createElement('div');
    var $myListAverage = document.createElement('div');
    $myListAverage.textContent = 'Average';
    var $myListScore = document.createElement('div');
    $myListScore.textContent = 'Score:';
    var $myListAverageScoreInfo = document.createElement('div');
    if (data.entries[i].rating === null || data.entries[i].rating === '') {
      $myListAverageScoreInfo.textContent = 'N/A';
    } else {
      $myListAverageScoreInfo.textContent = data.entries[i].rating;
    }
    var $myListDeleteButtonContainer = document.createElement('div');
    $myListDeleteButtonContainer.className = 'delete-button-container';
    var $myListDeleteButton = document.createElement('button');
    $myListDeleteButton.className = 'delete-button';
    $myListDeleteButton.textContent = 'Delete Entry';
    $myListLi.appendChild($myListBackground);
    $myListBackground.appendChild($myListTwoItemRow);
    $myListTwoItemRow.appendChild($myListMoviePoster);
    $myListTwoItemRow.appendChild($myListMovieDetails);
    $myListMovieDetails.appendChild($myListTitle);
    $myListTitle.appendChild($myListTitleInfo);
    $myListMovieDetails.appendChild($myListMovieDescription);
    $myListMovieDescription.appendChild($myListParagraphTitle);
    $myListMovieDescription.appendChild($myListParagraph);
    $myListMovieDetails.appendChild($myListCastContainer);
    $myListCastContainer.appendChild($myListCast);
    $myListCastContainer.appendChild($myListCastInfo);
    $myListMovieDetails.appendChild($myListGenreContainer);
    $myListGenreContainer.appendChild($myListGenre);
    $myListGenreContainer.appendChild($myListGenreInfo);
    $myListMovieDetails.appendChild($mylistThreeItemRow);
    $mylistThreeItemRow.appendChild($divContainerOne);
    $divContainerOne.appendChild($myListContent);
    $divContainerOne.appendChild($myListRating);
    $divContainerOne.appendChild($myListContentRatingInfo);
    $mylistThreeItemRow.append($divContainerTwo);
    $divContainerTwo.appendChild($myListRuntime);
    $divContainerTwo.appendChild($myListRuntimeInfo);
    $mylistThreeItemRow.appendChild($divContainerThree);
    $divContainerThree.appendChild($myListAverage);
    $divContainerThree.appendChild($myListScore);
    $divContainerThree.appendChild($myListAverageScoreInfo);
    $myListUl.appendChild($myListLi);
    $myListMovieDetails.appendChild($myListDeleteButtonContainer);
    $myListDeleteButtonContainer.appendChild($myListDeleteButton);
  }
  $myListUl.addEventListener('click', popUpModal);
  $popUpPage.addEventListener('click', popUpModal);

  function popUpModal(event) {
    if (event.target.classList.contains('delete-button')) {
      data.editing = event.target.closest('li').getAttribute('data-entry-id');
      $popUpPage.classList.remove('section-off');
      $popUpPage.classList.add('section-on');
    }
    if (event.target.classList.contains('pop-up-button-cancel')) {
      $popUpPage.classList.remove('section-on');
      $popUpPage.classList.add('section-off');
      data.editing = null;
    }
  }

  $popUpPage.addEventListener('click', confirmDelete);

  function confirmDelete(event) {
    var $liMyListAll = document.querySelectorAll('#my-list-ul > li');
    if (event.target.classList.contains('pop-up-button-confirm')) {
      for (var i = 0; i < data.entries.length; i++) {
        if (Number(data.editing) === data.entries[i].entryId) {
          data.entries.splice(i, 1);
          $myListUl.removeChild($liMyListAll[i]);
        }
      }
    }
    $popUpPage.classList.remove('section-on');
    $popUpPage.classList.add('section-off');
    data.editing = null;
    toggleNoEntries();
  }
}

function refreshDescriptionPage() {

  var $descriptionLi = document.createElement('li');
  $descriptionLi.className = 'white more-info-bg rounded';
  var $descriptionMainDiv = document.createElement('div');
  var $descriptionTitleContainer = document.createElement('div');
  $descriptionTitleContainer.className = 'description-title-container flex justify-center';
  var $descriptionTitle = document.createElement('h1');
  $descriptionTitle.textContent = data.temporaryDescription[0].title;
  var $descriptionImageContainer = document.createElement('div');
  $descriptionImageContainer.className = 'description-image-container';
  var $descriptionImage = document.createElement('img');
  if (data.temporaryDescription[0].image !== null) {
    $descriptionImage.setAttribute('src', data.temporaryDescription[0].image);
  } else {
    $descriptionImage.setAttribute('src', 'images/default-movie-poster.jpeg');
  }

  $descriptionImage.setAttribute('alt', 'movie-poster');
  $descriptionImage.className = 'description-image';
  var $descriptionButtonContainer = document.createElement('div');
  $descriptionButtonContainer.className = 'description-button-container flex justify-center';
  var $descriptionAddButton = document.createElement('i');
  if (data.entries.some(obj => obj.title === data.temporaryDescription[0].title)) {
    $descriptionAddButton.className = 'fa-solid fa-plus fa-2x black white-bg add-button no-button';
  } else {
    $descriptionAddButton.className = 'fa-solid fa-plus fa-2x black white-bg add-button';
  }
  // $descriptionAddButton.className = 'fa-solid fa-plus fa-2x black white-bg add-button';
  var $descriptionPlotContainer = document.createElement('div');
  $descriptionPlotContainer.className = 'description-plot-container';
  var $descriptionPlotHeader = document.createElement('h3');
  $descriptionPlotHeader.className = 'description-plot-header';
  $descriptionPlotHeader.textContent = 'Description';
  var $descriptionPlot = document.createElement('div');
  $descriptionPlot.className = 'description-plot';
  var $descriptionContent = document.createElement('div');
  $descriptionContent.className = 'description-content';
  if (data.temporaryDescription[0].plot !== null && data.temporaryDescription[0].plot !== '') {
    $descriptionContent.textContent = data.temporaryDescription[0].plot;
  } else {
    $descriptionContent.textContent = 'N/A';
  }
  var $descriptionCastContainer = document.createElement('div');
  $descriptionCastContainer.className = 'description-cast-container';
  var $descriptionCastHeader = document.createElement('h3');
  $descriptionCastHeader.textContent = 'Cast:';
  $descriptionCastHeader.className = 'description-cast-header';
  var $descriptionContent2 = document.createElement('div');
  $descriptionContent2.className = 'description-content';
  if (data.temporaryDescription[0].stars !== null && data.temporaryDescription[0].stars !== '') {
    $descriptionContent2.textContent = data.temporaryDescription[0].stars;
  } else {
    $descriptionContent2.textContent = 'N/A';
  }
  var $descriptionGenreContainer = document.createElement('div');
  $descriptionGenreContainer.className = 'description-genre-container';
  var $descriptionGenreHeader = document.createElement('h3');
  $descriptionGenreHeader.className = 'description-score-header';
  $descriptionGenreHeader.textContent = 'Genre:';
  var $descriptionContent3 = document.createElement('div');
  $descriptionContent3.className = 'description-content';
  if (data.temporaryDescription[0].genres !== null && data.temporaryDescription[0].genres !== '') {
    $descriptionContent3.textContent = data.temporaryDescription[0].genres;
  } else {
    $descriptionContent3.textContent = 'N/A';
  }
  var $descriptionScoreContainer = document.createElement('div');
  $descriptionScoreContainer.className = 'description-score-container';
  var $descriptionScoreHeader = document.createElement('h3');
  $descriptionScoreHeader.className = 'description-score-header';
  $descriptionScoreHeader.textContent = 'Average Viewer Score:';
  var $descriptionContent4 = document.createElement('div');
  $descriptionContent4.className = 'description-content';
  if (data.temporaryDescription[0].rating !== null && data.temporaryDescription[0].rating !== '') {
    $descriptionContent4.textContent = data.temporaryDescription[0].rating;
  } else {
    $descriptionContent4.textContent = 'N/A';
  }
  var $descriptionFilterContainer1 = document.createElement('div');
  $descriptionFilterContainer1.className = 'description-filter-container';
  var $descriptionFilterHeader1 = document.createElement('div');
  var $descriptionContentRating = document.createElement('h3');
  $descriptionContentRating.className = 'description-genre-header';
  $descriptionContentRating.textContent = 'Content Rating:';
  var $descriptionContent5 = document.createElement('div');
  $descriptionContent5.className = 'description-content';
  if (data.temporaryDescription[0].contentRating !== null && data.temporaryDescription[0].contentRating !== '') {
    $descriptionContent5.textContent = data.temporaryDescription[0].contentRating;
  } else {
    $descriptionContent5.textContent = 'N/A';
  }
  var $descriptionFilterContainer2 = document.createElement('div');
  $descriptionFilterContainer2.className = 'description-filter-container';
  var $descriptionFilterHeader2 = document.createElement('div');
  var $descriptionRuntime = document.createElement('h3');
  $descriptionRuntime.className = 'description-genre-header';
  $descriptionRuntime.textContent = 'Runtime:';
  var $descriptionContent6 = document.createElement('div');
  $descriptionContent6.className = 'description-content';
  if (data.temporaryDescription[0].runtime !== null && data.temporaryDescription[0].runtimeStr !== '') {
    $descriptionContent6.textContent = data.temporaryDescription[0].runtime;
  } else {
    $descriptionContent6.textContent = 'N/A';
  }
  $descriptionLi.appendChild($descriptionMainDiv);
  $descriptionMainDiv.appendChild($descriptionTitleContainer);
  $descriptionTitleContainer.appendChild($descriptionTitle);
  $descriptionMainDiv.appendChild($descriptionImageContainer);
  $descriptionImageContainer.appendChild($descriptionImage);
  $descriptionMainDiv.appendChild($descriptionButtonContainer);
  $descriptionButtonContainer.appendChild($descriptionAddButton);
  $descriptionMainDiv.appendChild($descriptionPlotContainer);
  $descriptionPlotContainer.appendChild($descriptionPlotHeader);
  $descriptionPlotContainer.appendChild($descriptionPlot);
  $descriptionPlot.appendChild($descriptionContent);
  $descriptionMainDiv.appendChild($descriptionCastContainer);
  $descriptionCastContainer.appendChild($descriptionCastHeader);
  $descriptionCastContainer.appendChild($descriptionContent2);
  $descriptionMainDiv.appendChild($descriptionGenreContainer);
  $descriptionGenreContainer.appendChild($descriptionGenreHeader);
  $descriptionGenreContainer.appendChild($descriptionContent3);
  $descriptionMainDiv.appendChild($descriptionScoreContainer);
  $descriptionScoreContainer.appendChild($descriptionScoreHeader);
  $descriptionScoreContainer.appendChild($descriptionContent4);
  $descriptionMainDiv.appendChild($descriptionFilterContainer1);
  $descriptionFilterContainer1.appendChild($descriptionFilterHeader1);
  $descriptionFilterHeader1.appendChild($descriptionContentRating);
  $descriptionFilterContainer1.appendChild($descriptionContent5);
  $descriptionMainDiv.appendChild($descriptionFilterContainer2);
  $descriptionFilterContainer2.appendChild($descriptionFilterHeader2);
  $descriptionFilterHeader2.appendChild($descriptionRuntime);
  $descriptionFilterContainer2.appendChild($descriptionContent6);

  // var $descriptionLi = document.createElement('li');
  // var $descriptionBackground = document.createElement('div');
  // $descriptionBackground.className = 'description-background';
  // var $descriptionTitle = document.createElement('div');
  // $descriptionTitle.className = 'description-title';
  // $descriptionTitle.textContent = data.temporaryDescription[0].title;
  // var $descriptionmoviePosterContainer = document.createElement('div');
  // $descriptionmoviePosterContainer.className = 'description-movie-poster-container';
  // var $descriptionImage = document.createElement('img');
  // $descriptionImage.setAttribute('src', data.temporaryDescription[0].image);
  // $descriptionImage.setAttribute('alt', 'movie-poster');
  // $descriptionImage.className = 'description-image';
  // var $descriptionButtonContainer = document.createElement('div');
  // $descriptionButtonContainer.className = 'description-button';
  // var $descriptionAddButton = document.createElement('button');
  // $descriptionAddButton.className = 'add-button';
  // var $descriptionFaPlus = document.createElement('i');
  // $descriptionFaPlus.classList.add('fa-solid', 'fa-plus', 'fa-3x');
  // var $descriptionPlotHeader = document.createElement('h3');
  // $descriptionPlotHeader.className = 'description-plot-header';
  // $descriptionPlotHeader.textContent = 'Description';
  // var $descriptionPlot = document.createElement('p');
  // $descriptionPlot.className = 'description-plot';
  // if (data.temporaryDescription[0].plot !== null) {
  //   $descriptionPlot.textContent = data.temporaryDescription[0].plot;
  // } else {
  //   $descriptionPlot.textContent = 'N/A';
  // }
  // var $descriptionCastHeader = document.createElement('h3');
  // $descriptionCastHeader.className = 'description-cast-header';
  // $descriptionCastHeader.textContent = 'Cast:';
  // var $descriptionCastList = document.createElement('div');
  // $descriptionCastList.className = 'description-cast-list';
  // if (data.temporaryDescription[0].stars !== null && data.temporaryDescription[0].stars !== '') {
  //   $descriptionCastList.textContent = data.temporaryDescription[0].stars;
  // } else {
  //   $descriptionCastList.textContent = 'N/A';
  // }
  // var $descriptionGenreHeader = document.createElement('h3');
  // $descriptionGenreHeader.className = 'description-genre-header';
  // $descriptionGenreHeader.textContent = 'Genre:';
  // var $descriptionGenreList = document.createElement('div');
  // $descriptionGenreList.className = 'description-genre-list';
  // if (data.temporaryDescription[0].genres !== null) {
  //   $descriptionGenreList.textContent = data.temporaryDescription[0].genres;
  // } else {
  //   $descriptionGenreList.textContent = 'N/A';
  // }
  // var $descriptionThreeItemRow = document.createElement('div');
  // $descriptionThreeItemRow.className = 'description-three-item-row';
  // var $ContentRatingContainer = document.createElement('div');
  // var $ContentRating = document.createElement('div');
  // $ContentRating.textContent = 'Content Rating:';
  // var $descriptionContentRatingResults = document.createElement('div');
  // if (data.temporaryDescription[0].contentRating !== null) {
  //   $descriptionContentRatingResults.textContent = data.temporaryDescription[0].contentRating;
  // } else {
  //   $descriptionContentRatingResults.textContent = 'N/A';
  // }
  // var $RuntimeContainer = document.createElement('div');
  // var $Runtime = document.createElement('div');
  // $Runtime.textContent = 'Runtime:';
  // var $descriptionRuntime = document.createElement('div');
  // if (data.temporaryDescription[0].runtime !== null) {
  //   $descriptionRuntime.textContent = data.temporaryDescription[0].runtime;
  // } else {
  //   $descriptionRuntime.textContent = 'N/A';
  // }
  // // console.log($descriptionRuntime);
  // var $averageCriticScoreContainer = document.createElement('div');
  // var $averageCriticScore = document.createElement('div');
  // $averageCriticScore.textContent = 'Average Critic Score:';
  // var $descriptionAverageCriticScore = document.createElement('div');
  // if (data.temporaryDescription[0].rating !== null) {
  //   $descriptionAverageCriticScore.textContent = data.temporaryDescription[0].rating;
  // } else {
  //   $descriptionAverageCriticScore.textContent = 'N/A';
  // }
  // $descriptionLi.appendChild($descriptionBackground);
  // $descriptionBackground.appendChild($descriptionTitle);
  // $descriptionBackground.appendChild($descriptionmoviePosterContainer);
  // $descriptionmoviePosterContainer.appendChild($descriptionImage);
  // $descriptionBackground.appendChild($descriptionButtonContainer);
  // $descriptionButtonContainer.appendChild($descriptionAddButton);
  // $descriptionAddButton.appendChild($descriptionFaPlus);
  // $descriptionBackground.appendChild($descriptionPlotHeader);
  // $descriptionBackground.appendChild($descriptionPlot);
  // $descriptionBackground.appendChild($descriptionCastHeader);
  // $descriptionBackground.appendChild($descriptionCastList);
  // $descriptionBackground.appendChild($descriptionGenreHeader);
  // $descriptionBackground.appendChild($descriptionGenreList);
  // $descriptionBackground.appendChild($descriptionThreeItemRow);
  // $descriptionThreeItemRow.appendChild($ContentRatingContainer);
  // $ContentRatingContainer.appendChild($ContentRating);
  // $ContentRatingContainer.appendChild($descriptionContentRatingResults);
  // $descriptionThreeItemRow.appendChild($RuntimeContainer);
  // $RuntimeContainer.appendChild($Runtime);
  // $RuntimeContainer.appendChild($descriptionRuntime);
  // $descriptionThreeItemRow.appendChild($averageCriticScoreContainer);
  // $averageCriticScoreContainer.appendChild($averageCriticScore);
  // $averageCriticScoreContainer.appendChild($descriptionAverageCriticScore);
  $descriptionUl.appendChild($descriptionLi);

  $descriptionAddButton.addEventListener('click', addToList);

}

function addToList(item) {
  var $movieInfoObject = {
    title: data.temporaryDescription[0].title,
    image: data.temporaryDescription[0].image,
    plot: data.temporaryDescription[0].plot,
    stars: data.temporaryDescription[0].stars,
    genres: data.temporaryDescription[0].genres,
    contentRating: data.temporaryDescription[0].contentRating,
    runtime: data.temporaryDescription[0].runtime,
    rating: data.temporaryDescription[0].rating
  };
  if (data.entries.find(isMovieName) === undefined) {
    $movieInfoObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift($movieInfoObject);
    createMyList();
    viewSwap('my-list-page');
  }
}
function isMovieName(item) {
  return name.title === item.title;
}
