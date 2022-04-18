export const storage = {
	saveFavoriteCities(favoriteCities) {
		localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
	},
	getFavoriteCities() {
		const cities = localStorage.getItem("favoriteCities");
		if (!!cities) {
			return JSON.parse(cities);
		} else {
			return {};
		}
	},
	getCurrentCity() {
		return localStorage.getItem("currentCity");
	},
	saveCurrentCity(city) {
		localStorage.setItem("currentCity", city);
	},
}