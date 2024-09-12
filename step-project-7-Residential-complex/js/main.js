const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
	navIcon.classList.toggle('nav-icon--active');
	nav.classList.toggle('header__top-row--mobile');
	document.body.classList.toggle('no-scroll');
};

/* Phone Mask */
mask('[data-tel-input]');
/* якщо залишається тільки + і нічого не введено, то повертаємо placeholder */
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input) => {
	input.addEventListener('input', () => {
		if (input.value == '+') input.value = '';
	});
	input.addEventListener('blur', () => {
		if (input.value == '+') input.value = '';
	});
});

/* Google Map*/

// Initialize and add the map
// let map;

// async function initMap() {
// 	// The location of Site for constructing materials
// 	const position = { lat: 48.9174879928497, lng: 24.675892293857768 };
// 	// Request needed libraries.
// 	//@ts-ignore
// 	const { Map } = await google.maps.importLibrary('maps');
// 	const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

// 	// The map, centered at Site for constructing materials area
// 	map = new Map(document.getElementById('map'), {
// 		zoom: 17,
// 		center: position,
// 		mapId: 'SITE_BUILD_STAFF_ID',
// 	});

// 	// The marker, positioned at Site for constructing materials
// 	const marker = new AdvancedMarkerElement({
// 		map: map,
// 		position: position,
// 		title: 'Site for constructing materials',
// 	});
// }

// initMap();

// This code creates a simple polygon (triangle shape) representing the site for storage of building materials.
let map;
let infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: { lat: 48.91782648859138, lng: 24.67584268374408 },
		mapTypeId: 'terrain',
	});

	// Define the LatLng coordinates for the polygon.
	const triangleCoords = [
		{ lat: 48.918135871863264, lng: 24.676361365671116 },
		{ lat: 48.916935034550264, lng: 24.675635210973393 },
		{ lat: 48.918041483949565, lng: 24.67549955570017 },
		{ lat: 48.918135871863264, lng: 24.676361365671116 },
	];
	// Construct the polygon.
	const siteForBuildingMaterials = new google.maps.Polygon({
		paths: triangleCoords,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 3,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
	});

	siteForBuildingMaterials.setMap(map);
}

window.initMap = initMap;
