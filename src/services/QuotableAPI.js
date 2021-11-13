export default class QuotableAPI {
  static #BASE_URL = 'https://api.quotable.io';

  static getRandomQuote = async () => {
    const url = `${this.#BASE_URL}/random`;
    const response = await fetch(url);
    return response.json();
  };
}
