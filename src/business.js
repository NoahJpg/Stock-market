import StockInfo from './stock-info.js';
import NewsInfo from './news-info.js';
import Gifs from './giphy.js';
import { printNews, printError, printGifs, printStocks } from './index.js'

export async function getNews(ticker) {
  const response = await NewsInfo.getNews(ticker);
  printNews(response, ticker);
}

export async function showStock(ticker) {
  const response = await StockInfo.getStock(ticker);
  if (response.queryCount === 1) {
    printStocks(response, ticker);
  } else {
    printError(response, ticker);
  }
}

export async function getGifs(ticker) {
  const response = await Gifs.getGifs(ticker);
  printGifs(response);
}