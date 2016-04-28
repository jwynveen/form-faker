console.log('form-faker: faking data...');
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
    case 'date-past':
      var date = faker.date.past(50);
      input.value = date.toLocaleDateString();
      break;
    case 'email':
      input.value = faker.internet.email();
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
    // date-past
    ['birthdate', 'date-past'],
    // account
    ['mrn', 'account'],
  ]);
}
