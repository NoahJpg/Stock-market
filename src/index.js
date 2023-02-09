import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import StockInfo from './stock-info.js';
import NewsInfo from './news-info.js';

//Business Logic
async function getNews(ticker) {
  const response = await NewsInfo.getNews(ticker);
  printNews(response);
}
//   if(response.main) {
//     printNews(response);
//   } else {
//     printError(response, ticker);
//   }
// }

async function showStock(ticker) {
  const response = await StockInfo.getStock(ticker);
  if (response.queryCount === 1) {
    printStocks(response, ticker);
  } else {
    printError(response, ticker);
  }
}

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// UI Logic 

// function printElements(apiResponse, search) {
//   document.querySelector('#results').innerText = `Here are the gifs matching your search: ${search}:`;
//   apiResponse.data.forEach(function(element){
//     let newUrl = element.images.fixed_height.url;
//     let img = document.createElement('img');
//     img.setAttribute('src', newUrl);
//     document.querySelector('#results-img').append(img);
//   });
// }
function printNews(response) {
  response.data.forEach(function(article) {
    let newsUrl = article.url;
    let title = article.title;
    let aElement = document.createElement('a');
    aElement.setAttribute('src', newsUrl);
    aElement.innerText = title;
    document.querySelector('#news-headline').append(`${aElement} || `);
  });  
}

function printStocks(response, ticker) {
  let values = response.results[0];  
  let results =`The Close for ${ticker} is $${(values.c).toFixed(2)}.
  The High for ${ticker} is $${(values.h).toFixed(2)}.
  The Low for ${ticker} is $${(values.l).toFixed(2)}.
  The Open price for ${ticker} is $${(values.o).toFixed(2)}.
  The Trading Volume of ${ticker} is ${(values.v).toLocaleString()} shares`;
  
  document.querySelector('#results').innerText = results;
}

function printError(error, ticker) {
  if (error.queryCount === 0) {
    document.getElementById("results").innerText = `There was an error accessing the stock data for ${ticker}:
    ticker "${ticker}" does not exist`;
  } else
    document.getElementById("results").innerText = `There was an error acceessing the stock data for ${ticker}: 
    ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ticker = document.querySelector('#ticker-input').value.toUpperCase();
  document.querySelector('#ticker-input').value = null;
  showStock(ticker);
  getNews();
}

window.addEventListener("load", function() {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmission);
});

//set up error handling
//accepts user input of Stock ticker
//return information (high, low, close) to the user
//
