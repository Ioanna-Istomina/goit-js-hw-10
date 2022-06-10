import './css/styles.css';
import { fetchCountries } from './service/fetchCountries';
import { countryList, countryInformation } from './template/renderMarkup';
import { input, list, country } from './service/refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue() {
  const value = input.value.trim();

  if (value === '') {
    clearingInput();
    return;
  }

  fetchCountries(value)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length > 2 && countries.length < 10) {
        createMarkup(list, countryList, countries);
      }
      if (countries.length === 1) {
        createMarkup(country, countryInformation, countries);
      }
    })
    .catch(() => {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}

function clearingInput() {
  list.innerHTML = '';
  country.innerHTML = '';
}

function createMarkup(el, func, arr) {
  const markup = arr.map(country => func(country)).join('');
  clearingInput();
  return el.insertAdjacentHTML('beforeend', markup);
}

// const markup = countries.map(country => countryList(country)).join('');
// clearingInput();
// return list.insertAdjacentHTML('beforeend', markup);

// const markup = countries.map(country => countryInformation(country)).join('');
// clearingInput();
// return country.insertAdjacentHTML('beforeend', markup);
