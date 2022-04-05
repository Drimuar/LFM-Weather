const nowTab = document.querySelector(".now-button");
const detailsTab = document.querySelector(".details-button");
const forecastTab = document.querySelector(".forecast-button");
const nowFrame = document.querySelector(".now-frame");
const detailsFrame = document.querySelector(".details-frame");
const forecastFrame = document.querySelector(".forecast-frame");

nowTab.addEventListener("click", openTab);
detailsTab.addEventListener("click", openTab);
forecastTab.addEventListener("click", openTab);

function openTab(event) {
	const btn = event.target;
	if (btn.classList.contains("current")) {
		return;
	}
	if (btn.classList.contains("now-button")) {
		nowTab.classList.add("current");
		detailsTab.classList.remove("current");
		forecastTab.classList.remove("current");
		nowFrame.classList.remove("hidden");
		detailsFrame.classList.add("hidden");
		forecastFrame.classList.add("hidden");
	}
	else if (btn.classList.contains("details-button")) {
		nowTab.classList.remove("current");
		detailsTab.classList.add("current");
		forecastTab.classList.remove("current");
		nowFrame.classList.add("hidden");
		detailsFrame.classList.remove("hidden");
		forecastFrame.classList.add("hidden");
	}
	else if (btn.classList.contains("forecast-button")) {
		nowTab.classList.remove("current");
		detailsTab.classList.remove("current");
		forecastTab.classList.add("current");
		nowFrame.classList.add("hidden");
		detailsFrame.classList.add("hidden");
		forecastFrame.classList.remove("hidden");
	}
}