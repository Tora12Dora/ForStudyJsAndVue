/* здесь будет класс с набором методов для взаимодействия с сервером */
import axios from 'axios';
import config from '../config/apiConfig';

/**
 * /countries - возвращает массив стран, которые поддерживаются
 * /cities - возвращает массив городов, которые поддерживаются
 * /price/cheap - возвращает массив доступных рейсов
 * /airlines - возвращает массив авиакомпаний
 */

class Api {
  constructor(config) {
    this.url = config.url;
  }

  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      return response.data
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      return response.data
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  async airlines() {
    try {
      const response = await axios.get(`${this.url}/airlines`);
      return response.data
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async prices(params) {
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, {
        params
      });
      return response.data
    } catch (e) {
      console.log(e);
      throw e;
    }

  }
}

const api = new Api(config);
export default api;