import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { getNews, showStock, getGifs } from './business.js';
// UI Logic 

export function printGifs(response) {
  /* eslint-disable no-console */
  document.querySelector('div.container-left').innerHTML = null;
  document.querySelector('div.container-right').innerHTML = null;
  console.log(response);
  let left = response.data[0].images.fixed_height.url;
  console.log(left);
  let right = response.data[1].images.fixed_height.url;
  console.log(right);
  let img1 = document.createElement('img');
  let img2 = document.createElement('img');
  img1.setAttribute('src', left);
  img2.setAttribute('src', right);
  document.querySelector('div.container-left').append(img1);
  document.querySelector('div.container-right').append(img2);
  /* eslint-enable no-console */
}

export function printNews(apiResponse, ticker) {
  document.querySelector('#news-headline').innerText = (`${ticker}: `);
  apiResponse.data.forEach(function(article){
    let newsUrl = article.url;
    let title = article.title;
    let aElement = document.createElement('a');
    aElement.setAttribute('href', newsUrl);
    aElement.append(title);
    document.getElementById('news-headline').append(aElement);
    document.querySelector('#news-headline').append('   ||   ');
  })
}

export function printStocks(response, ticker) {
  let values = response.results[0];  
  let results =`The Close for ${ticker} is $${(values.c).toFixed(2)}.
  The High for ${ticker} is $${(values.h).toFixed(2)}.
  The Low for ${ticker} is $${(values.l).toFixed(2)}.
  The Open price for ${ticker} is $${(values.o).toFixed(2)}.
  The Trading Volume of ${ticker} is ${(values.v).toLocaleString()} shares`;
  document.querySelector('#results').innerText = results;
}

export function printError(error, ticker) {
  if (error.queryCount === 0) {
    document.querySelector("#results").innerText = `There was an error accessing the stock data for ${ticker}:
    ticker "${ticker}" does not exist`;
  } else
    document.querySelector("#results").innerText = `There was an error acceessing the stock data for ${ticker}: 
    ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ticker = document.querySelector('#ticker-input').value.toUpperCase();
  document.querySelector('#ticker-input').value = null;
  showStock(ticker);
  getNews(ticker);
  getGifs(ticker);
}

window.addEventListener("load", function() {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmission);
});
