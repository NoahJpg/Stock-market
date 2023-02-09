export default class Gifs{
  static async getGifs(ticker) {
    try {
      const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${ticker}&limit=2&offset=0&lang=en`);
      const jsonifiedResponse = await response.json();
      if(response.status !== 200) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}


