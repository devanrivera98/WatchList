/* exported data */
var data = {
  view: 'homepage',
  temporaryResults: [],
  temporaryDescription: [],
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('unload', addLocalStorage);

function addLocalStorage(event) {
  var dataJson = JSON.stringify(data);
  var dataLocalStorage = localStorage.setItem('javascript-local-storage', dataJson);
  return dataLocalStorage;
}

if (localStorage.getItem('javascript-local-storage')) {
  data = JSON.parse(localStorage.getItem('javascript-local-storage'));
}
