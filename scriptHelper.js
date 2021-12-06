
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const mission = document.getElementById("missionTarget");

    mission.innerHTML = `
    <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
    <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput === ""){
        return("empty");
    } else if ( isNaN (testInput)){
        return("Not a Number");
    } else {
        return("Is a Number");
    }
}

function visibility(){
    document.getElementById("faultyItems").style.visibility = "visible"
}

function pilotsReady(name, pilotType){
    document.getElementById(`${pilotType}`).innerHTML = `${name} is ready for takeoff!`
}

function lowFuel(){
    document.getElementById("fuelStatus").innerHTML = `Fuel is too low for launch!`
}

function highCargo(){
    document.getElementById("cargoStatus").innerHTML = `Cargo is too high for launch!`
}

function notReadyHeady(){
    visibility();
    document.getElementById("launchStatus").style.color = "red"
    document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch!"
}

function readyHeady(){
    visibility();
    document.getElementById("launchStatus").style.color = "green"
    document.getElementById("launchStatus").innerHTML = "Shuttle ready for launch!"
}




function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    

    // // Validate pilot/copilot input
    if (validateInput(pilot.value) != "Not a Number"){
        alert("Pilot name must be a string!")

    } else if (validateInput(copilot.value) != "Not a Number"){
        alert ("Copilot name must be a string!")
    } else {
        pilotsReady(pilot.value, "pilotStatus");
        pilotsReady(copilot.value, "copilotStatus");
    }

    //validate fuel and cargo input
    if (validateInput(fuelLevel.value) != "Is a Number"){
        alert (" Fuel Level must be a number!")
    } else if (validateInput(cargoLevel.value) != "Is a Number"){
        alert (" Cargo Level must be a number!")
    } else if (cargoLevel.value > 10000 && fuelLevel.value < 10000){
        highCargo();
        lowFuel();
        notReadyHeady();
    } else if (cargoLevel.value > 10000){
        highCargo();
        notReadyHeady();
    } else if (fuelLevel.value < 10000){
        lowFuel();
        notReadyHeady();
    } else {
        readyHeady();
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) { 
        return(response.json())
        });

    return planetsReturned
}

function pickPlanet(planets) {
    let randomMis = Math.floor(Math.random() * planets.length);
    return planets[randomMis]

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
