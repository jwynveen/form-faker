// Saves options to chrome.storage.sync.
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}

var source = document.getElementById('mapping-template').innerHTML;
var template = Handlebars.compile(source);
Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
    new RegExp(' value=\"' + selected + '\"'),
    '$& selected="selected"');
});
var mappings = [
  {
    key: 'testKey',
    type: 'lastName'
  }, {
    key: 'testKey2',
    type: 'ignore'
  }
];
function loadMappings() {
  document.getElementById('mapping-container').innerHTML = template(mappings);

  var buttons = document.getElementsByClassName('delete');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', deleteMapping);
  }
}
function addMapping() {
  mappings.push({});
  loadMappings();
}
function deleteMapping() {
  mappings = mappings.filter(mapping => mapping.key !== this.value);
  loadMappings();
}

loadMappings();
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add-mapping').addEventListener('click', addMapping);

