import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import StockInfo from './stock-market.js';

//Business Logic

async function showStock(ticker) {
  const response = await StockInfo.getStock(ticker);
  if (!response.null) {
    printElements(response, ticker);
  } else {
    printError (response, ticker);
  }
}

// UI Logic 


function printElements(response, ticker) {
  document.querySelector('#results').innerText = `The close for ${ticker} is ${response.results[0].c}%.`;
}

function printError(error, ticker) {
  document.getElementById("results").innerText = `There was an error acceessing the stock data for ${ticker}: 
  ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ticker = document.querySelector('#ticker-input').value;
  document.querySelector('#ticker-input').value = null;
  showStock(ticker);
}

window.addEventListener("load", function() {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmission);
});

//set up error handling
//accepts user input of Stock ticker
//return information (high, low, close) to the user
//
