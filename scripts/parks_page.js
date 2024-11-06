function addPark(parkTypeName, parkTypeSelect) {
    parkTypeSelect.appendChild(new Option(parkTypeName));
}
function addLocation(text, target) {
    target.appendChild(new Option(text));
}
function Park(parkObject){
    const e = document.createElement("pre");
    e.innerHTML = `
        <b>LocationID:</b> "${parkObject.LocationID}",
        <b>LocationName:</b> "${parkObject.LocationName}",
        <b>Address:</b> "${parkObject.Address}",
        <b>City:</b> "${parkObject.City}",
        <b>State:</b> "${parkObject.State}",
        <b>ZipCode:</b> ${parkObject.ZipCode},
        <b>Phone:</b> "${parkObject.Phone}",
        <b>Fax:</b> "${parkObject.Fax}",
        <b>Latitude:</b> ${parkObject.Latitude},
        <b>Longitude:</b> ${parkObject.Longitude},
    `;
    return e;
}

function renderParks() {
    const results = document.getElementById("results");
    const selectedType = parkTypeSelect.value;
    const selectedLocation = parkLocationSelect.value;
    results.innerHTML = ""; //clear away the old
    let filtered = nationalParksArray;
    if (selectedType) {
        filtered = filtered.filter(p => p.LocationName.toLowerCase().includes(selectedType.toLowerCase()));
    }
    if (selectedLocation) {
        filtered = filtered.filter(p => p.State.toLowerCase() === selectedLocation.toLowerCase())
    }
    filtered.forEach(p => results.appendChild(Park(p)));
    if (filtered.length < 1) {
        results.innerHTML = "No results found matching the filter.";
    }
}
function onContent() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");
    const results = document.getElementById("results");
    parkTypesArray.forEach(parkTypeName => addPark(parkTypeName, parkTypeSelect));
    locationsArray.forEach(parkLocationName => addLocation(parkLocationName, parkLocationSelect))
    renderParks();
    filterButton.addEventListener("click", renderParks);
    parkTypeSelect.addEventListener("change", renderParks);
    parkLocationSelect.addEventListener("change", renderParks);
}

document.addEventListener("DOMContentLoaded", onContent);
