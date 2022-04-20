import { KELVIN, ICON_URL, UI_ELEMENTS, monthNames, like, activeLike } from "./const.js";
import { favoriteCities } from "./main.js";


export async function showWeatherNow(weather) {
	const json = await weather;
	try {
		if (json.cod == 400 || json.cod == 404) {
			throw new Error(json.message);
		}
	} catch (err) {
		UI_ELEMENTS.NOW.DEGREE.textContent = '0°';
		UI_ELEMENTS.NOW.CITY.textContent = '';
		UI_ELEMENTS.NOW.IMAGE.src = '';
		UI_ELEMENTS.NOW.LIKE.classList.add("hidden");
		UI_ELEMENTS.NOW.LIKE.src = like;
		alert(err.message);
		throw err;
	}
	const degree = json.main.temp - KELVIN;
	const iconId = `${json.weather[0].icon}@2x.png`;
	UI_ELEMENTS.NOW.IMAGE.src = `${ICON_URL}${iconId}`;
	UI_ELEMENTS.NOW.CITY.textContent = json.name;
	UI_ELEMENTS.NOW.DEGREE.textContent = `${Math.floor(degree)}°`;
	UI_ELEMENTS.NOW.LIKE.classList.remove("hidden");
	if (!favoriteCities[json.name]) {
		UI_ELEMENTS.NOW.LIKE.src = like;
	} else {
		UI_ELEMENTS.NOW.LIKE.src = activeLike;
	}
}


export async function showWeatherDetails(weather) {
	const json = await weather;
	try {
		if (json.cod == 400 || json.cod == 404) {
			throw new Error(json.message);
		}
	} catch (err) {
		UI_ELEMENTS.DETAILS.CITY.textContent = '';
		UI_ELEMENTS.DETAILS.TEMPERATURE.textContent = '0°';
		UI_ELEMENTS.DETAILS.FEELS.textContent = '0°';
		UI_ELEMENTS.DETAILS.WEATHER.textContent = '';
		UI_ELEMENTS.DETAILS.SUNRISE.textContent = '00:00';
		UI_ELEMENTS.DETAILS.SUNSET.textContent = '00:00';
		alert(err.message);
		throw err;
	}
	let degree = (temp, KELVIN) => temp - KELVIN;
	const sunrise = new Date(json.sys.sunrise * 1000);
	const sunset = new Date(json.sys.sunset * 1000);
	UI_ELEMENTS.DETAILS.CITY.textContent = json.name;
	UI_ELEMENTS.DETAILS.TEMPERATURE.textContent = `${Math.floor(degree(json.main.temp, KELVIN))}°`;
	UI_ELEMENTS.DETAILS.FEELS.textContent = `${Math.floor(degree(json.main.feels_like, KELVIN))}°`;
	UI_ELEMENTS.DETAILS.WEATHER.textContent = json.weather[0].main;
	UI_ELEMENTS.DETAILS.SUNRISE.textContent = `${sunrise.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${sunrise.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
	UI_ELEMENTS.DETAILS.SUNSET.textContent = `${sunset.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${sunset.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
}


export async function showWeatherForecast(forecast) {
	const json = await forecast;
	try {
		if (json.cod == 400 || json.cod == 404) {
			throw new Error(json.message);
		}
	} catch (err) {
		UI_ELEMENTS.FORECAST.CITY.textContent = '';
		UI_ELEMENTS.FORECAST.LIST.textContent = '';
		alert(err.message);
		throw err;
	}
	UI_ELEMENTS.FORECAST.CITY.textContent = json.city.name;
	createForecastList(json.list);
}


export function createFavoriteList(list) {
	for (const item in list) {
		UI_ELEMENTS.LOCATIONS.LIST.insertAdjacentHTML("beforeend", list[item])
	}
}


function createForecastList(list) {
	UI_ELEMENTS.FORECAST.LIST.textContent = '';
	for (const item of list) {
		let date = new Date(item.dt * 1000);
		let month = date.getMonth();
		let day = date.getDate();
		let hours = date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
		let minutes = date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

		UI_ELEMENTS.FORECAST.LIST.insertAdjacentHTML("beforeend",
			`<li class="forecast-frame__item">
				<div class="item__top">
					<p class="item__date">${day} ${monthNames[month]}</p>
					<p class="item__time">${hours}:${minutes}</p>
				</div>
				<div class="item__bottom">
					<div class="item__left">
						<p class="item__temperature">Temperature: <span>${Math.floor(item.main.temp)}°</span></p>
						<p class="item__feels">Feels like: <span>${Math.floor(item.main.feels_like)}°</span></p>
					</div>
					<div class="item__right">
						<img class="item__img" src="${ICON_URL}${item.weather[0].icon}.png" alt="">
						<p class="item__weather">${item.weather[0].main}</p>
					</div>
				</div>
			</li>`);
	}
}
