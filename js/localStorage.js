import Cookies from 'js-cookie'

export const storage = {
	saveFavoriteCities(favoriteCities) {
		localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
	},
	getFavoriteCities() {
		const cities = localStorage.getItem("favoriteCities");
		return JSON.parse(cities) ?? {};
	},
	saveCurrentCity(city) {
		const inMinute = 1 / 5760;
		Cookies.set("currentCity", city, { expires: inMinute });
	},
	getCurrentCity() {
		return Cookies.get("currentCity");
	},
}