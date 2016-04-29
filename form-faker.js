function processForm(userMappings) {
  console.log('form-faker: faking data...');
  const dictionary = getDictionary();
  var inputs = document.getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.type.toLowerCase() !== 'text' || input.value) {
      continue;
    }

    let mapping;
    if (userMappings) {
      mapping = getInputType(input, userMappings);
    }
    if (!mapping) {
      mapping = getInputType(input, dictionary);
    }
    switch (mapping) {
      case 'ignore':
        break;
      case 'firstName':
        input.value = faker.name.firstName();
        break;
      case 'lastName':
        input.value = faker.name.firstName();
        break;
      case 'email':
        input.value = faker.internet.email();
        break;
      case 'phone':
        input.value = faker.phone.phoneNumber('(###) ###-####');
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
        input.value = faker.address.state();
        break;
      case 'zipCode':
        input.value = faker.address.zipCode();
        break;
      // Date
      case 'date-past':
        var date = faker.date.past(50);
        input.value = date.toLocaleDateString();
        break;
      case 'account':
        input.value = faker.finance.account();
        break;
      default:
        if (input.attributes.required) {
          input.value = faker.random.word();
        }
        break;
    }
  }

  console.log('form-faker: Done!');
}

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

chrome.storage.sync.get({
  mappings: []
}, function(items) {
  debugger;
  const mapContent = items.mappings.map(mapping => [mapping.key, mapping.type]);
  processForm(new Map(mapContent));
});
