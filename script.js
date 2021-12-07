//Objeto que contém todos os carros possíveis
const cars = {
    pop: {
        name: "Popular",
        speedMax: { max: 200, min: 180 },
        speedMin: { max: 130, min: 110 },
        skid: { max: 0.96, min: 0.97 }
    },
    sport: {
        name: "Sport",
        speedMax: { max: 215, min: 195 },
        speedMin: { max: 145, min: 125 },
        skid: { max: 0.97, min: 0.98 }
    },
    superSport: {
        name: "Super Sport",
        speedMax: { max: 230, min: 210 },
        speedMin: { max: 160, min: 140 },
        skid: { max: 0.9825, min: 0.99 }
    }    
}


//Duas funções com objetivo de determinar o campeão de cada volta
function winnerForLap(car){
    speedMax = attRandom(car.speedMax.min, car.speedMax.max);
    speedMin = attRandom(car.speedMin.min, car.speedMin.max);
    skid  = attRandom(car.skid.min, car.skid.max);
    return (Math.random() * (speedMax - speedMin) + speedMin) * skid;
}
function attRandom(min, max){
    return Math.random() * (max - min) + min;
}


//Objeto com os pilotos da corrida
const pilots = {
    names: ["Pedro", "Juca", "Edna"]
};


//Função para adicionar novo piloto na corrida
function addNewPilot(){
    let nameNewPilot = document.getElementById("newPilot");    
    if(pilots.names.every( (item) => item != nameNewPilot.value) && !(nameNewPilot.length === 0 || !nameNewPilot.value.trim())){
        pilots.names.push(nameNewPilot.value);
    }
    nameNewPilot.value = "";
}


//Função para sortear a raridade do carro, para cada participante da corrida
function randomCar(){
    let x = Math.random();
    return (x < 0.6 ? cars.pop : x < 0.95 ? cars.sport : cars.superSport)
}


//Função para rodar as voltas
function run(){
    //Volta Determinada pelo user
    const conditionLaps = document.querySelector("input:checked").id;
    const laps = (conditionLaps == "enduro" ? 160 : conditionLaps == "grand" ? 70 : conditionLaps == "fast" ? 10 : 0);

    const pilotsVictory = [];
    const driversName = [];
    const drivers = [];
    pilots.names.forEach(
        function(item){
            pilotsVictory.push(0);
            driversName.push(item);
            drivers.push(randomCar());
        }
    );
    
    for(let i = 0; i < laps; i++){
        let carSpeed = 0;
        let id;
        drivers.forEach(
            (element, ids) =>{
                let speedRandom = winnerForLap(element);
                if(speedRandom > carSpeed){
                    carSpeed = speedRandom;
                    id = ids;
                }
            }
        )
        pilotsVictory[id]++;
    }
    winner(pilotsVictory, drivers);   
}


//-------------------------------------------------------------------------------------\\
const result = document.querySelector(".resultado");
function winner(winners, drivers){
    let resultado = pilots.names.slice();
    console.log(resultado)
    result.innerHTML = "";
    let leng = winners.length;
    for(let i = 0; i < leng; i++){
        let id = winners.indexOf(Math.max.apply(null, winners));
        winners.splice(id, 1);
        
        console.log(drivers[id]);
        // result.innerHTML += drivers[id].name + " ";
        // result.innerHTML += pilots.names[i] + " ";
        winnerPrint(drivers[id].name, resultado[id]);
        resultado.splice(id, 1);
        drivers.splice(id, 1);
    }
}
function winnerPrint(carWinner, pilotWinner){
    let x = document.createElement("p");
    x.innerText = pilotWinner + " ";
    x.innerText += carWinner;
    result.appendChild(x);
}