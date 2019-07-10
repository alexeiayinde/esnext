lg = console.log;


// ********* let **********
let favoriteCityId = "rome";
lg(favoriteCityId);

favoriteCityId = "paris";
lg(favoriteCityId);


// ******** const ************
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
lg(citiesId);

//citiesId = [];
//citiesId[1] = "lagos";

citiesId.push("tokyo");
lg(citiesId);


// ********** Création d'objet ************
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return {city, temperature};
}

const weather = getWeather(favoriteCityId);
lg(weather);

// *********** Affectation destructurée **********
const {
    city,
    temperature
} = weather;
lg(city);
lg(temperature);


// ********** Rest operator ***********
let [parisId, nycId, ...othersCitiesId] = citiesId;
lg(parisId);
lg(nycId);
lg(othersCitiesId.length);


// ********** Classe ************
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this._price + ']'; 
    }

    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
}

let parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
lg(parisTrip);
lg(parisTrip.name);

lg(parisTrip.toString());  // A tester sans getter et setter et avec toString() sans _price

parisTrip.price = 100;
lg(parisTrip.toString());


const defaultTrip = Trip.getDefaultTrip();
lg(defaultTrip.toString());


// ************ Héritage *************
class FreeTrip extends Trip {
    constructor(id, name, imageUrl, _price){
        super(id, name, imageUrl);
        this._price = 0;
    }

    toString() {
        return 'Free' + super.toString();
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
lg(freeTrip.toString());    // tester avec/sans méthode toString() redéfinie


// ************ Promise, Set, Map, Arrow Function *************
class TripService {
    constructor() {
        this.trips = new Set();
        this.trips.add(parisTrip);
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(Trip.getDefaultTrip());
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                this.trips.forEach(trip => {
                    if (trip.name === tripName) {
                        resolve(trip);
                    }
                });
                reject('No trip with name ' + tripName);

            }, 2000);
        });
    }
}


class PriceService {
    constructor() {
        this.trips = new Map();
        this.trips.set(parisTrip.id, parisTrip._price);
        this.trips.set(Trip.getDefaultTrip().id, 800);
    }

    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                for (const key of this.trips.keys()) {
                    if (key === tripId) {
                        resolve(this.trips.get(tripId));
                    }
                }
                reject('No price found for id ' + tripId);
            }, 2000);
        });
    }
}

let tripService = new TripService();
tripService.findByName('Paris')
    .then((trip) => lg('Trip found :', trip.toString()), (error) => lg(error));
tripService.findByName('Toulouse')
    .then((trip) => lg('Trip found :', trip.toString()), (error) => lg(error));

let priceService = new PriceService();
priceService.findPriceByTripId('paris').then((price) => lg('Price found :', price), (error) => lg(error));

tripService.findByName('Rio de Janeiro')
    .then((trip) => {
        return priceService.findPriceByTripId(trip.id);
    }, (error) => lg(error))
    .then((price) => lg('Price found :', price), (error) => lg(error));

tripService.findByName('Nantes')
    .then((trip) => {
        return priceService.findPriceByTripId(trip.id);
    }, (error) => lg(error))
    .then((price) => lg('Price found :', price), (error) => lg(error));
