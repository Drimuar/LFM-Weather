export const KELVIN = 273.15;
export const ICON_URL = 'http://openweathermap.org/img/wn/';

export const like = "./img/icons/like.svg";
export const activeLike = "./img/icons/likefill.svg";


export const SERVER = {
	WEATHER_URL: 'http://api.openweathermap.org/data/2.5/weather',
	FORECAST_URL: 'http://api.openweathermap.org/data/2.5/forecast',
	API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
	UNITS: '&units=metric',
	STEPS: '&cnt=8',
}

export const UI_ELEMENTS = {
	SEARCH: {
		FORM: document.querySelector(".search"),
		INPUT: document.querySelector(".search__input"),
	},
	NOW: {
		CITY: document.querySelector(".now-frame__city"),
		DEGREE: document.querySelector(".now-frame__degree"),
		IMAGE: document.querySelector(".now-frame__img"),
		LIKE: document.querySelector(".now-frame__like"),
	},
	DETAILS: {
		CITY: document.querySelector(".details-frame__city"),
		TEMPERATURE: document.querySelector(".details-frame__temperature"),
		FEELS: document.querySelector(".details-frame__feels"),
		WEATHER: document.querySelector(".details-frame__weather"),
		SUNRISE: document.querySelector(".details-frame__sunrise"),
		SUNSET: document.querySelector(".details-frame__sunset"),
	},
	FORECAST: {
		CITY: document.querySelector(".forecast-frame__city"),
		LIST: document.querySelector(".forecast-frame__list"),
	},
	LOCATIONS: {
		LIST: document.querySelector(".right-block__list"),
		ALLCITY: document.getElementsByClassName("right-block__city"),
		ALLREMOVE: document.getElementsByClassName("right-block__remove"),
	},
}


export const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];