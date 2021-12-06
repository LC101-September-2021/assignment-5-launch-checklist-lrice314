window.addEventListener("load", function() {

    let form = document.querySelector("form");
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
    
    form.addEventListener("submit", function(event){       
        
        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value.length === 0 || cargoMass.value.length === 0){
            alert("All fields are required!");
            console.log(fuelLevel.value)
            event.preventDefault();
        } else {
            formSubmission(form, "", pilotName, copilotName, fuelLevel, cargoMass);
            console.log(fuelLevel.value)
            event.preventDefault();
        }
    });
    
    
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets)
        console.log(planet)
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
        

    });
    
});
