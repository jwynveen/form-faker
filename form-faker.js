console.log('form-faker: faking data...');
// debugger;
const dictionary = getDictionary();
var inputs = document.getElementsByTagName('input');

for (var i = 0; i < inputs.length; i++) {
  var input = inputs[i];
  if (input.type.toLowerCase() !== 'text' || input.value) {
    continue;
  }

  var name = input.name.toLowerCase();
  var mapping = dictionary.get(name);
  switch (mapping) {
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

function getDictionary() {
  return new Map([
    // firstName
    ['firstname', 'firstName'],
    ['first_name', 'firstName'],
    ['first-name', 'firstName'],
    ['fname', 'firstName'],
    // lastName
    ['lastname', 'lastName'],
    ['last_name', 'lastName'],
    ['last-name', 'lastName'],
    ['lname', 'lastName'],
    // email
    ['email', 'email'],
    ['emailaddress', 'email'],
    ['email_address', 'email'],
    ['email-address', 'email'],
    // phone
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
    // date-past
    ['birthdate', 'date-past'],
    // account
    ['mrn', 'account'],
  ]);
}
