console.log('form-faker: faking data...');
var inputs = document.getElementsByTagName('input');

for (var i = 0; i < inputs.length; i++) {
  var input = inputs[i];
  if (input.type.toLowerCase() !== 'text' || input.value) {
    continue;
  }

  var name = input.name.toLowerCase();
  switch (name) {
    case 'firstname':
      input.value = faker.name.firstName();
      break;
    case 'lastname':
      input.value = faker.name.firstName();
      break;
    case 'birthdate':
      var date = faker.date.past(50);
      input.value = date.toLocaleDateString();
      break;
    case 'mrn':
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