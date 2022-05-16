import Cookies from 'js-cookie'

export const storage = {
	saveFavoriteCities(favoriteCities) {
		localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
	},
	getFavoriteCities() {
		const cities = localStorage.getItem("favoriteCities");
		if (cities) {
			return JSON.parse(cities);
		} else {
			return {};
		}
	},
	getCurrentCity() {
		//1 return localStorage.getItem("currentCity");
		//2 const name = "currentCity";
		//2 let matches = document.cookie.match(new RegExp(
		//2 	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		//2 ));
		//2 return matches ? decodeURIComponent(matches[1]) : undefined;
		return Cookies.get("currentCity");
	},
	saveCurrentCity(city) {
		//1 localStorage.setItem("currentCity", city);
		//2 const currentCity = "currentCity";
		//2 document.cookie = encodeURIComponent(currentCity) + "=" + encodeURIComponent(city) + ";max-age=60;";
		const inMinute = 1 / 5760;
		Cookies.set("currentCity", city, { expires: inMinute });
	},
}