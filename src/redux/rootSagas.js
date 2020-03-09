import axios from 'axios';

class Api {
  instance;

  constructor(options = {}) {
    this.instance = axios.create({
      headers: {'X-Auth-Header': ''},
      ...options,
    });

    this.instance.interceptors.response.use((response) => {
      return response.data;
    });
  }

  getInstance() {
    return this.instance;
  }
}

export const api = new Api().getInstance();

export const createRequest = (payload) => {
  //return api(payload);
  return Promise.resolve({
    data: [
    {
        "infoId": 1,
        "name": "1",
        "data": {
          'name': 'Коммандор',
          'description': '[ДАННЫЕ УДАЛЕНЫ]'
        },
        "category": "PERSON",
        "photo": null,
        "status": "AVAILABLE"
    },
    {
        "infoId": 2,
        "name": "2",
        "data": {'test': 'test'},
        "category": "PERSON",
        "photo": null,
        "status": "AVAILABLE"
    }
]})
};