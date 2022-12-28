import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const userInput = document.querySelector('#search-box');

userInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  fetchCountries(userInput.value.trim());
}
