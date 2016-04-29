const mappingRegex = /mappings\[(\d*)\].(.*)/;
var mappings = [];

// Saves options to chrome.storage.sync.
function save_options() {
  updateMappingsFromFormData();

  chrome.storage.sync.set({
    mappings: mappings // only save if both key and type are set
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
    loadMappings();
  });
}

function updateMappingsFromFormData() {
  const elements = document.querySelectorAll('input, select');
  const data = [];
  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].value) {
      continue;
    }
    const name = elements[i].name;
    let match;
    if ((match = mappingRegex.exec(name)) !== null) {
      const idx = match[1];
      const propName = match[2];
      if (!data[idx]) {
        data[idx] = {};
      }
      let value = elements[i].value;
      if (propName === 'key') {
        value = value.toLowerCase();
      }
      data[idx][propName] = value;
    }
  }

  mappings = data.filter(item => item.key && item.type);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    mappings: [{}]
  }, function(items) {
    mappings = items.mappings;
    loadMappings();
  });
}

var source = document.getElementById('mapping-template').innerHTML;
var template = Handlebars.compile(source);
Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
    new RegExp(' value=\"' + selected + '\"'),
    '$& selected="selected"');
});
function loadMappings() {
  if (!mappings.length) {
    mappings.push({});
  }
  document.getElementById('mapping-container').innerHTML = template(mappings);

  var buttons = document.getElementsByClassName('delete');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', deleteMapping);
  }
}
function addMapping() {
  updateMappingsFromFormData();
  mappings.push({});
  loadMappings();
}
function deleteMapping() {
  mappings.splice(this.value, 1);
  loadMappings();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add-mapping').addEventListener('click', addMapping);

