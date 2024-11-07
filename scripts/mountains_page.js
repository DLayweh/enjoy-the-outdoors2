document.addEventListener("DOMContentLoaded", () => {
    const mountainsSelect = document.getElementById("mountainsSelect");
    const results = document.getElementById("results");

    // Populate the select dropdown
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name)));

    mountainsSelect.addEventListener("change", async (e) => {
        const selectedIndex = mountainsSelect.selectedIndex;
        if (selectedIndex > 0) {  // Skip "Select a Mountain..." option (index 0)
            const m = mountainsArray[selectedIndex - 1];

            const coords = `${m.coords.lat.toFixed(3)}, ${m.coords.lng.toFixed(3)}`;

            // Clear previous results before showing new data
            results.innerHTML = `<h1>${m.name}</h1>
                Elevation:   <b>${m.elevation}</b><br>
                Effort:      <b>${m.effort}</b><br>
                Coordinates: <b>(${coords})</b><br><br>
                ${m.desc}<br><br>`;

            // Add image if available
            if (m.img) {
                const i = document.createElement("img");
                i.alt = `${m.name} Image`;
                i.src = `data/images/${m.img}`;
                results.appendChild(i);
            }

            // Ensure the Sunrise and Sunset button only gets added once
            let sunriseButton = document.getElementById("sunriseButton");
            if (!sunriseButton) {
                sunriseButton = document.createElement("button");
                sunriseButton.id = "sunriseButton";
                sunriseButton.innerHTML = "Sunrise and Sunset";
                sunriseButton.addEventListener("click", async () => {
                    const sunriseData = await getSunsetForMountain(m.coords.lat, m.coords.lng);
                    if (sunriseData && sunriseData.results) {
                        const sunriseInfo = document.createElement("p");
                        sunriseInfo.innerHTML = `Sunrise: ${sunriseData.results.sunrise}<br>Sunset: ${sunriseData.results.sunset}`;
                        results.appendChild(sunriseInfo);
                        sunriseButton.disabled = true;  // Disable the button after use
                    } else {
                        results.innerHTML += "<p>Failed to fetch sunrise/sunset times. Try again later.</p>";
                    }
                });
                results.appendChild(sunriseButton);
            }
        }
    });

    // Function to fetch sunrise and sunset times from the API
    async function getSunsetForMountain(lat, lng) {
        try {
            const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching sunrise/sunset data:", error);
            alert("There was an error fetching the sunrise and sunset times.");
        }
    }
});
