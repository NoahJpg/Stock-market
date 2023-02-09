export default class NewsInfo {
  static async getNews(ticker) {
    try {
      const response = await fetch(`https://api.marketaux.com/v1/news/all?symbols=${ticker}&language=en&filter_entities=true&api_token=${process.env.MARKETAUX_KEY}`);
      const jsonifiedResponse = await response.json();
      if (response.status !== 200) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}
