import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const onInputEl = event => {

const countries = fetchCountries(event.target.value.trim()).then(data => {
    let modifaed = [];
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if(data.length > 10) {
        Notify.info(`Too many matches found. Please enter a more specific name.`);
        return;   
    }
    else if(data.length >= 2 && data.length <= 10) {
        modifaed = data.map(countrie => {
            return (`<li class="list">
            <img src="${countrie.flags.svg}" width="30">
            <span>${countrie.name.official}</span>
          </li>`)
        })
        .join('');
        console.log(countryList);
        countryList.innerHTML = modifaed;
    }
    else if(data.length === 1) {
        modifaed = data.map(countrie => {
            return (`
            <li class="list">
            <img src="${countrie.flags.svg}" width="30">
            <span>${countrie.name.official}</span>
          </li>
          <li class="list"><span>Capital:${countrie.capital}</span></li>
          <li class="list"><span>Population:${countrie.population}</span></li>
          <li class="list"><span>Languages:${Object.values(countrie.languages)}</span></li>`)
        })
        console.log(countryInfo);
        countryInfo.innerHTML = modifaed;
    }
})
.catch(err => {
    Notify.failure('Oops, there is no country with that name'); 
    console.log(Notify.failure);
  })
}

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));