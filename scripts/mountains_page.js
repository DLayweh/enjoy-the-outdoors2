document.addEventListener("DOMContentLoaded", () => {
    const mountainsSelect = document.getElementById("mountainsSelect");
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name)));
    mountainsSelect.addEventListener("change", e => {
        const selectedIndex = mountainsSelect.selectedIndex;
        if(selectedIndex){ //not help which 0 therefore falsey
            const m = mountainsArray[selectedIndex - 1];
            
            const coords = m.coords.lat.toFixed(3) + 
                    ", " + 
                    m.coords.lng.toFixed(3);

            results.innerHTML = "<h1>" + m.name + "</h1>" + `                
                Elevation:   <b>${m.elevation}</b><br>
                Effort:      <b>${m.effort   }</b><br>
                Coordinates: <b>(${coords})</b><br>
                <br>
                ${m.desc}
                <br><br>
            `; 
            //add img image here? how?
            if(m.img){
                const i = document.createElement("img");
                i.alt = "Mountain Image";
                i.src = "data/images/" + m.img;
                results.appendChild(i);
            }
        }
    });//end change
});//end load

// ARRAY  NA I0 I1 ...
// SELECT H0 M1 M2 ...
// SINDEX  0  1  3 ...