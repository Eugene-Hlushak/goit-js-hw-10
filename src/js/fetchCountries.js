import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//main function

function fetchCountries(name) {
  if (!name) {
    clearFields();
    return;
  }
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw onError;
      }
      return response.json();
    })
    .then(showResult)
    .catch(onError);
}

export { fetchCountries };

// functions

function showResult(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    clearFields();
  }
  if (countries.length < 10) {
    createCountryListMarkup(countries);
  }
  if (countries.length === 1) {
    createCountryMarkup(countries);
  }
}

function createCountryListMarkup(countries) {
  countryInfo.innerHTML = '';

  const markupCountries = countries
    .map(
      ({
        name,
        flags,
      }) => `<li class="country-list__item"><img class="flag" src="${flags.svg}"
   alt='${name.official} flag' /><p>${name.official}</p></li>`
    )
    .join('');

  countryList.innerHTML = markupCountries;
}

function createCountryMarkup(countries) {
  countryList.innerHTML = '';

  const { name, flags, population, languages, capital } = countries[0];
  countryInfo.innerHTML = `<div class='country'><img class="flag" src="${
    flags.svg
  }"
   alt='${name.official} flag' /><h2 class='country__title'>${
    name.official
  }</h2></div>
   <ul class='country__items'>
   <li class='country__item'><p><b>Capital:</b> ${capital}</p></li>
   <li class='country__item'><p><b>Population:</b> ${population}</p></li>
   <li class='country__item'><p><b>Languages:</b> ${Object.values(
     languages
   )}</p></li>
   </ul>`;
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function clearFields() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
