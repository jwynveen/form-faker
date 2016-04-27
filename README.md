# form-faker
Chrome extension to fill in common form fields with data from the [faker library](https://github.com/marak/faker.js)

# Supported Form Fields
Below are the field types that are currently supported as well as a list of names (case-insensitive) that will match that type.
* First Name
  * firstname
  * first-name
  * first_name
  * fname
* Last Name
  * lastname
  * last-name
  * last_name
  * lname
* Dates (in the past, format: MM/DD/YYYY)
  * birthdate
* General Account Number (8-digit number)
  * mrn

Fields not matching one of these names but marked with a `required` attribute will be set to a random word.
