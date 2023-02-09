import StockInfo from './api-calls/stock-api.js';
import NewsInfo from './api-calls/news-api.js';
import Gifs from './api-calls/giphy-api.js';
import { printNews, printError, printGifs, printStocks } from './index.js'

export default function getAPIData(ticker) { 
  StockInfo.getStock(ticker)
    .then(function(stockResponse) {
      if (stockResponse instanceof Error) {
        const errorMessage = `there was a problem accessing the stock data from Polygon.io API for ${ticker}:
        ${stockResponse}`;
        throw new Error(errorMessage);
      }
      const stocks = stockResponse;
      printStocks(stocks, ticker);
      return NewsInfo.getNews(ticker);
  })
  .then(function(newsResponse) {
    if (newsResponse instanceof Error) {
      const errorMessage = `there was a problem accessing the news data from MarketAux API: 
      ${newsResponse}.`;
      throw new Error(errorMessage);
    }
    printNews(newsResponse, ticker);
    return Gifs.getGifs(ticker);
  })
  .then(function(gifResponse){
    if (gifResponse instanceof Error) {
      const errorMessage = `there was a problem accessing the gif data from Giphy API:
      ${gifResponse}.`;
      throw new Error(errorMessage);
    }
    printGifs(gifResponse)
  })
  .catch(function(error){
    printError(error);
  });
}



// export async function getNews(ticker) {
//   const response = await NewsInfo.getNews(ticker);
//   printNews(response, ticker);
// }

// export async function showStock(ticker) {
//   const response = await StockInfo.getStock(ticker);
//   if (response.queryCount === 1) {
//     printStocks(response, ticker);
//   } else {
//     printError(response, ticker);
//   }
// }

// export async function getGifs(ticker) {
//   const response = await Gifs.getGifs(ticker);
//   printGifs(response);
// }