# form-faker
Chrome extension to fill in common form fields with data from the [faker library](https://github.com/marak/faker.js)

# Supported Form Fields
Below are the field types that are currently supported as well as a list of names (case-insensitive) that will match that type.
* First Name
  * firstname
  * first_name
  * first-name
  * fname
* Last Name
  * lastname
  * last_name
  * last-name
  * lname
* Email
  * email
  * emailaddress
  * email_address
  * email-address
* Phone
  * phone
  * ph
  * cellphone
  * cell_phone
  * cell-phone
  * cellph
  * cell_ph
  * cell-ph
  * mobilephone
  * mobile_phone
  * mobile-phone
  * mobileph
  * mobile_ph
  * mobile-ph
  * homephone
  * home_phone
  * home-phone
  * homeph
  * home_ph
  * home-ph
  * hmphone
  * hm_phone
  * hm-phone
  * hmph
  * hm_ph
  * hm-ph
* Address
  * address
  * address1
  * addr
  * addr1
  * address2
  * addr2
  * city
  * country
  * cntry
  * county
  * state
  * st
  * zipcode
  * zip
  * zip-code
  * zip_code
  * postalcode
  * postal-code
  * postal_code
  * postcode
  * post-code
  * post_code
* Dates (in the past, format: MM/DD/YYYY)
  * birthdate
* General Account Number (8-digit number)
  * mrn

Fields not matching one of these names but marked with a `required` attribute will be set to a random word.
