chrome.runtime.onMessage.addListener(function (params) {
  chrome.storage.sync.get({
    mappings: [],
    dateFormat: 'MM/DD/YYYY',
    emailPattern: '',
    nameGenerator: 'random',
  }, function (items) {
    const mapContent = items.mappings.map(mapping => [mapping.key, mapping.type]);
    const options = {
      dateFormat: items.dateFormat,
      emailPattern: items.emailPattern,
      nameGenerator: items.nameGenerator,
    };

    if (params.trigger === 'contextMenu') {
      processInput(document.activeElement, new Map(mapContent), getDictionary(), options, params.dataType);
    } else {
      processForm(new Map(mapContent), options);
    }
  });
});


function processForm(userMappings, options) {
  console.log('form-faker: faking data...');
  options = options || {};
  const dictionary = getDictionary();
  var inputs = document.getElementsByTagName('input');


  const gender = faker.random.number(1); // 0=female, 1=male; for faker's parameters (https://github.com/Marak/faker.js/blob/master/lib/name.js#L21)
  options.session = {
    gender,
    firstName: faker.name.firstName(gender),
    lastName: faker.name.lastName(),
  }
  if (options.nameGenerator === 'marvel') {
    const names = marvelCharacterNames[faker.random.number(marvelCharacterNames.length)].split(' ');
    options.session.firstName = names.shift();
    if (names.length) {
      options.session.lastName = names.join(' ');
    }
  } else if (options.nameGenerator === 'superhero') {
    const names = superheroNames[faker.random.number(superheroNames.length)].split(' ');
    options.session.firstName = names.shift();
    if (names.length) {
      options.session.lastName = names.join(' ');
    }
  }

  for (var i = 0; i < inputs.length; i++) {
    processInput(inputs[i], userMappings, dictionary, options);
  }

  var selects = document.getElementsByTagName('select');
  for (var i = 0; i < selects.length; i++) {
    processDropdown(selects[i], userMappings, dictionary, options);
  }

  console.log('form-faker: Done!');
}

function processInput(input, userMappings, dictionary, options, dataType) {
  const inputType = (input.type || '').toLowerCase();
  if (!['text', 'textarea'].includes(inputType) || input.value) {
    return;
  }

  const gender = options.session ? options.session.gender : faker.random.number(1);
  const firstName = options.session ? options.session.firstName : faker.name.firstName(gender);
  const lastName = options.session ? options.session.lastName : faker.name.lastName();

  let mapping = dataType;
  if (!mapping && userMappings) {
    mapping = getInputType(input, userMappings);
  }
  if (!mapping) {
    mapping = getInputType(input, dictionary);
  }
  switch (mapping) {
    case 'ignore':
      return;
    case 'firstName':
      input.value = firstName;
      break;
    case 'lastName':
      input.value = lastName;
      break;
    case 'email':
      if (options.emailPattern) {
        var username = faker.internet.userName(firstName, lastName);
        input.value = options.emailPattern.replace('{name}', username);
      } else {
        input.value = faker.internet.exampleEmail(firstName, lastName);
      }
      break;
    case 'phone':
      input.value = faker.phone.phoneNumber('(###) 555-01##');
      break;
    // Address
    case 'address1':
      input.value = faker.address.streetAddress();
      break;
    case 'address2':
      input.value = faker.address.secondaryAddress();
      break;
    case 'city':
      input.value = faker.address.city();
      break;
    case 'country':
      input.value = 'United States'; // faker.address.country();
      break;
    case 'county':
      input.value = faker.address.county();
      break;
    case 'state':
      input.value = faker.address.stateAbbr();
      break;
    case 'zipCode':
      input.value = faker.address.zipCode();
      break;
    // Date
    case 'date-past':
      const format = options && options.dateFormat ? options.dateFormat : 'MM/DD/YYYY';
      var date = faker.date.past(50);
      input.value = date.toLocaleDateString();
      break;
    case 'account':
      input.value = faker.finance.account();
      break;
    case 'loremWord':
      input.value = faker.lorem.word();
      break;
    case 'loremSentence':
      input.value = faker.lorem.sentence();
      break;
    case 'loremParagraph':
      input.value = faker.lorem.paragraph();
      break;
    default:
      if (input.attributes.required) {
        input.value = faker.random.word();
      }
      break;
  }

  input.dispatchEvent(new Event('change'));
}
function processDropdown(select, userMappings, dictionary, options, dataType) {
  var isChanged = false;
  if (select.value) {
    return;
  }

  let mapping = dataType;
  if (!mapping && userMappings) {
    mapping = getInputType(select, userMappings);
  }
  if (!mapping) {
    mapping = getInputType(select, dictionary);
  }
  switch (mapping) {
    case 'ignore':
      break;
    case 'gender':
      for (const option of select.options) {
        if (options.session.gender === 1 && ['male', 'm'].includes(option.value.toLowerCase()) ||
          options.session.gender === 0 && ['female', 'f', 'fem'].includes(option.value.toLowerCase())) {
          option.selected = true;
          isChanged = true;
          break;
        }
      }
      break;
  }

  if (isChanged) {
    var changeEvent = new Event('change');
    select.dispatchEvent(changeEvent);
  }
}

/**
 * Use input name or classes to determine data type mapping
 * @param input
 * @param dictionary
 */
function getInputType(input, dictionary) {
  const name = input.name.toLowerCase();
  let mapping = dictionary.get(name);
  if (!mapping) {
    // check each class to see if it matches one of the mappings
    for (const className of input.classList) {
      mapping = dictionary.get(className);
      if (mapping) {
        break;
      }
    }
  }
  return mapping;
}

/**
 * Get map of names/classes and their associated data type
 * @returns {Map}
 */
function getDictionary() {
  return new Map([
    // First Name
    ['firstname', 'firstName'],
    ['first_name', 'firstName'],
    ['first-name', 'firstName'],
    ['fname', 'firstName'],
    // Last Name
    ['lastname', 'lastName'],
    ['last_name', 'lastName'],
    ['last-name', 'lastName'],
    ['lname', 'lastName'],
    // Email
    ['email', 'email'],
    ['emailaddress', 'email'],
    ['email_address', 'email'],
    ['email-address', 'email'],
    // Gender
    ['gender', 'gender'],
    ['sex', 'gender'],
    // Phone
    ['phone', 'phone'],
    ['ph', 'phone'],
    ['cellphone', 'phone'],
    ['cell_phone', 'phone'],
    ['cell-phone', 'phone'],
    ['cellph', 'phone'],
    ['cell_ph', 'phone'],
    ['cell-ph', 'phone'],
    ['mobilephone', 'phone'],
    ['mobile_phone', 'phone'],
    ['mobile-phone', 'phone'],
    ['mobileph', 'phone'],
    ['mobile_ph', 'phone'],
    ['mobile-ph', 'phone'],
    ['homephone', 'phone'],
    ['home_phone', 'phone'],
    ['home-phone', 'phone'],
    ['homeph', 'phone'],
    ['home_ph', 'phone'],
    ['home-ph', 'phone'],
    ['hmphone', 'phone'],
    ['hm_phone', 'phone'],
    ['hm-phone', 'phone'],
    ['hmph', 'phone'],
    ['hm_ph', 'phone'],
    ['hm-ph', 'phone'],
    // Address
    ['address', 'address1'],
    ['address1', 'address1'],
    ['addr', 'address1'],
    ['addr1', 'address1'],
    ['address2', 'address2'],
    ['addr2', 'address2'],
    ['city', 'city'],
    ['country', 'country'],
    ['cntry', 'country'],
    ['county', 'county'],
    ['state', 'state'],
    ['st', 'state'],
    ['zipcode', 'zipCode'],
    ['zip', 'zipCode'],
    ['zip-code', 'zipCode'],
    ['zip_code', 'zipCode'],
    ['postalcode', 'zipCode'],
    ['postal-code', 'zipCode'],
    ['postal_code', 'zipCode'],
    ['postcode', 'zipCode'],
    ['post-code', 'zipCode'],
    ['post_code', 'zipCode'],
    // Dates (in the past, format: MM/DD/YYYY)
    ['birthdate', 'date-past'],
    // General Account Number (8-digit number)
    ['mrn', 'account'],
  ]);
}
