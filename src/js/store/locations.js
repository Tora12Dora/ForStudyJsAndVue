import api from "../services/apiService";
import { formatDate } from '../helpers/date';

/* формируем store (хранилище), в котором будем получать города и страны */
class Locations {
  constructor(api, helpers) {
    /* конструктор принимает экземпляр класса api */
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.lastSearch = {};
    this.airlines = {};
    this.formatDate = helpers.formatDate
  }

  async init() {
    /* в этом методе сразу запросим города и страны */
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines()
    ]);

    const [countries, cities, airlines] = response; /* деструктурируем response */
    this.countries = this.serializeCountries(
      countries
    ); /* записываем страны в this.countries */
    this.cities = this.serializeCities(
      cities
    ); /* записываем города в this.cities */
    this.shortCitiesList = this.createShortCitiesList(
      this.cities
    ); /* записываем список для autocomplete */
    this.airlines = this.serializeAirlines(airlines); /* записываем список авиакомпаний */
    return response;
  }

  /* получаем код города */
  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(item => item.full_name === key);
    return city.code
  }

  /* получаем название города по коду */
  getCityNameByCode(code) {
    return this.cities[code].name
  }

  /* получаем название страны по коду */
  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  /* получеам имя авикомпании по коду */
  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  /* получеам лого авикомпании по коду */
  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : 'https://via.placeholder.com/100';
  }

  /* формируем список для autocomplete */
  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  /* преобразуем страны в нужный формат для autocomplete */
  serializeCountries(countries) {
    // формат - {'Код страны': { 'объект страны' }}
    return countries.reduce((acc, country) => {
      acc[
        country.code
      ] = country; /* на каждой итерации добавляем в новый объект в качестве значения объект страны,
	  а в качестве ключа - код страны */
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {})
  }

  serializeCities(cities) {
    // формат - {'Название города, название страны': { 'объект города' }}
    return cities.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const full_name = `${city.name}, ${country_name}`; /* формируем ключ объекта */
      acc[city.code] = {
        ...city,
        country_name,
        full_name
      };
      return acc;
    }, {});
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin), /* добавляем название города вылета */
        destination_name: this.getCityNameByCode(ticket.destination), /* добавляем название города прибытия */
        airline_logo: this.getAirlineLogoByCode(ticket.airline), /* добавляем лого авиакомпании */
        airline_name: this.getAirlineNameByCode(ticket.airline), /* добавляем название авиакомпании */
        departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyy hh:mm'), /* добавляем дату отправления и
        форматируем ее */
        return_at: this.formatDate(ticket.return_at, 'dd MMM yyy hh:mm'),
      }
    })
  }

  /* получаем билеты */
  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }
}

const locations = new Locations(api, { formatDate });
export default locations;