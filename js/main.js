import { createFavoriteList, showWeatherDetails, showWeatherForecast, showWeatherNow } from './view.js';
import { UI_ELEMENTS, SERVER, like, activeLike } from './const.js';
import { storage } from './localStorage.js';

export let favoriteCities = storage.getFavoriteCities();
let currentCity = storage.getCurrentCity();

createFavoriteList(favoriteCities);
loadWeather(currentCity);


UI_ELEMENTS.SEARCH.FORM.addEventListener('submit', showWeather);
UI_ELEMENTS.NOW.LIKE.addEventListener('click', addFavorite);
for (const remove of UI_ELEMENTS.LOCATIONS.ALLREMOVE) {
	remove.addEventListener('click', removeFavorite);
}
for (const city of UI_ELEMENTS.LOCATIONS.ALLCITY) {
	city.addEventListener('click', showWeather);
}


function removeFavorite(e) {
	e.preventDefault();
	e.target.closest('.right-block__item').remove();
	const isCurrentCity = UI_ELEMENTS.NOW.CITY.textContent === this.previousElementSibling.textContent;
	if (isCurrentCity) {
		UI_ELEMENTS.NOW.LIKE.src = like;
	}
	delete favoriteCities[this.previousElementSibling.textContent];
	storage.saveFavoriteCities(favoriteCities);
}


function addFavorite(e) {
	e.preventDefault();
	const cityName = UI_ELEMENTS.NOW.CITY.textContent;
	for (const item in favoriteCities) {
		if (item === cityName) {
			return;
		}
	}

	UI_ELEMENTS.NOW.LIKE.src = activeLike;
	const htmlBlock = `<li class="right-block__item"><span class="right-block__city">${cityName}</span><button class="right-block__remove">X</button></li>`;
	UI_ELEMENTS.LOCATIONS.LIST.insertAdjacentHTML("beforeend", htmlBlock);
	favoriteCities[cityName] = htmlBlock;
	storage.saveFavoriteCities(favoriteCities);

	for (const remove of UI_ELEMENTS.LOCATIONS.ALLREMOVE) {
		remove.addEventListener('click', removeFavorite);
	}
	for (const city of UI_ELEMENTS.LOCATIONS.ALLCITY) {
		city.addEventListener('click', showWeather);
	}
}


function loadWeather(city) {
	if (city === "null" || !city) {
		return;
	}
	const weather = getData(city, SERVER.WEATHER_URL);
	const forecast = getData(city, SERVER.FORECAST_URL, SERVER.STEPS, SERVER.UNITS);
	showWeatherNow(weather);
	showWeatherDetails(weather);
	showWeatherForecast(forecast);
	storage.saveCurrentCity(city);
}


function showWeather(e) {
	e.preventDefault();
	let city;
	const isSearchField = this.className === "search";
	if (isSearchField) {
		city = getCity();
	} else {
		city = this.textContent;
	}
	loadWeather(city);
}


async function getData(city, serverUrl, steps = '', units = '') {
	const cityName = city;
	const url = `${serverUrl}?q=${cityName}&appid=${SERVER.API_KEY}${steps}${units}`;
	const response = await fetch(url);
	const json = await response.json();
	return json;
}


function getCity() {
	const city = UI_ELEMENTS.SEARCH.INPUT.value;
	return city;
}
