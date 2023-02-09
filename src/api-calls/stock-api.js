export default class StockInfo {
  static async getStock(ticker) {
    try {
      const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${process.env.POLYGON_KEY}`);
      const jsonifiedResponse = await response.json();
      /* eslint-disable no-console */
      console.log(response);
      console.log(jsonifiedResponse);
      /* eslint-enable no-console */
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      } else if (jsonifiedResponse.queryCount === 0) {
        const errorMessage = `There was an error accesing the stock ticker:
        "${ticker}" does not exist`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}
