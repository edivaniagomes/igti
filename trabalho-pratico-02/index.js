import express from 'express';
import { promises } from 'fs';

const app = express();
const port = 3000;
const { writeFile, readFile } = promises;

// Listen
app.listen(port, async () => {
    console.log(`API running on port ${port}...`);
    console.log('\n');

    // Read Estados.json
    const states = JSON.parse(await readFile('./Estados.json', 'utf8'));

    // Read Cidades.json
    const cities = JSON.parse(await readFile('./Cidades.json', 'utf8'));

    createFiles(states, cities);
    top5cities(states);
    citiesCount('RJ', true);
    bottom5cities(states);
    bigCitiesNames(states);
    smallCitiesNames(states);
    biggestCityName(cities);
    smallestCityName(cities);
});

async function createFiles(states, cities) {
    try {
        states.forEach((state) => {
            let citiesArray = createCitiesArrays(state, cities);
            let data = citiesArray;
            let readyData = JSON.stringify(data);
            writeFile(`./estados/${state.Sigla}.json`, readyData, 'utf8');
        });
    } catch (err) {
        console.log(err);
    }

    function createCitiesArrays(state, cities) {
        // This method creates an array of cities that belongs to a state.
        let citiesArray = [];
        cities.forEach((city) => {
            if (city.Estado === state.ID) {
                citiesArray.push(`${city.Nome}`);
            }
        });
        return citiesArray;
    }
} // End of createFiles

async function citiesCount(stateInitials, msg) {
    try {
        let state = await readFile(`./estados/${stateInitials}.json`);
        let cities = await JSON.parse(state);
        let citiesLength = cities.length;
        if (msg) {
            console.log(
                `O estado ${stateInitials} possui ${citiesLength} cidades.`
            );
            console.log('\n');
        }
        return citiesLength;
    } catch (err) {
        console.log(err);
    }
} // End of citiesCount

async function top5cities(states) {
    let citiesAndStates = [];

    for (let i = 0; i < states.length; i++) {
        citiesAndStates.push({
            initials: states[i].Sigla,
            nCities: await citiesCount(states[i].Sigla),
        });
    }

    citiesAndStates.sort((a, b) => {
        if (a.nCities > b.nCities) {
            return -1;
        }
        if (a.nCities < b.nCities) {
            return 1;
        }

        return 0;
    });

    let mostCities = citiesAndStates.slice(0, 5);
    let top5 = mostCities.map((city) => {
        return `${city.initials} - ${city.nCities}`;
    });
    console.log('Top 5 estados que mais possuem cidades:');
    console.log(top5);
    console.log('\n');
} // End of top5cities

async function bottom5cities(states) {
    let citiesAndStates = [];

    for (let i = 0; i < states.length; i++) {
        citiesAndStates.push({
            initials: states[i].Sigla,
            nCities: await citiesCount(states[i].Sigla),
        });
    }

    citiesAndStates.sort((a, b) => {
        if (a.nCities > b.nCities) {
            return -1;
        }
        if (a.nCities < b.nCities) {
            return 1;
        }

        return 0;
    });

    let lessCities = citiesAndStates.slice(
        citiesAndStates.length - 5,
        citiesAndStates.length
    );
    let bottom5 = lessCities.map((city) => {
        return `${city.initials} - ${city.nCities}`;
    });
    console.log('Top 5 estados que menos possuem cidades:');
    console.log(bottom5);
    console.log('\n');
} // End of bottom5cities

async function bigCitiesNames(states) {
    let citiesAndStates = [];

    for (let i = 0; i < states.length; i++) {
        let bigCity = await getBigCity(states[i].Sigla);
        citiesAndStates.push({
            bigCity: bigCity,
            bigCityLen: bigCity.length,
            initials: states[i].Sigla,
        });
    }

    let bigCities = citiesAndStates.map((city) => {
        return `${city.bigCity} - ${city.initials}`;
    });
    console.log('Cidades com maior nome de cada estado:');
    console.log(bigCities);
    console.log('\n');

    return bigCities;

    async function getBigCity(stateInitials) {
        try {
            let state = await readFile(`./estados/${stateInitials}.json`);
            let cities = await JSON.parse(state);
            cities.sort((a, b) => {
                return b.length - a.length;
            });
            return cities[0];
        } catch (err) {
            console.log(err);
        }
    } //End of getBigCity
} // End of bottom5cities

async function smallCitiesNames(states) {
    let citiesAndStates = [];

    for (let i = 0; i < states.length; i++) {
        let smallCity = await getsmallCity(states[i].Sigla);
        citiesAndStates.push({
            smallCity: smallCity,
            smallCityLen: smallCity.length,
            initials: states[i].Sigla,
        });
    }

    let smallCities = citiesAndStates.map((city) => {
        return `${city.smallCity} - ${city.initials}`;
    });

    console.log('Cidades com menor nome de cada estado:');
    console.log(smallCities);
    console.log('\n');
    return smallCities;

    async function getsmallCity(stateInitials) {
        try {
            let state = await readFile(`./estados/${stateInitials}.json`);
            let cities = await JSON.parse(state);
            cities.sort((a, b) => {
                return a.length - b.length;
            });
            return cities[0];
        } catch (err) {
            console.log(err);
        }
    } //End of getBigCity
} // End of bottom5cities

async function biggestCityName(cities) {
    try {
        cities.sort((a, b) => {
            if (a.Nome.length > b.Nome.length) {
                return -1;
            }
            if (a.Nome.length < b.Nome.length) {
                return 1;
            }
            if (a.Nome.length === b.Nome.length) {
                if (a.Nome < b.Nome) {
                    return -1;
                }
            }
        });
        console.log('Município brasileiro com o maior nome:');
        console.log(cities[0].Nome);
        console.log('\n');
    } catch (err) {
        console.log(err);
    }
} // End of biggestCityName

async function smallestCityName(cities) {
    try {
        cities.sort((a, b) => {
            if (a.Nome.length > b.Nome.length) {
                return 1;
            }
            if (a.Nome.length < b.Nome.length) {
                return -1;
            }
            if (a.Nome.length === b.Nome.length) {
                if (a.Nome < b.Nome) {
                    return -1;
                }
            }
        });
        console.log('Município brasileiro com o menor nome:');
        console.log(cities[0].Nome);
        console.log('\n');
    } catch (err) {
        console.log(err);
    }
} // End of smallestCityName
