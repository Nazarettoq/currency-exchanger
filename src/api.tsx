import axios from 'axios';

const option = axios.create({
  baseURL: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com',

  headers: {
    'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
    'x-rapidapi-key': '1de2b9a222msh09d75e59fef849bp1b2f1ejsne5c33be18419',
  },
});

export const CurrencyAPI = {
  getCurrency() {
    return option.get('/symbols').then((res) => res.data);
  },
  getConvertCurrency(fromCurrency: string, toCurrency: string, amount: number) {
    return option
      .get(`/convert&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then((res) => res.data);
  },

  getCurrencyExchange() {
    return axios
      .get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .then((res) => res.data);
  },
};
