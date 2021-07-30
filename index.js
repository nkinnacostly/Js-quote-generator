const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  // quoteText.hidden = true;
  // authorText.hidden = true;
}

// Hide Loader
function showQuote() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get quote from API
async function getQUote() {
  loading();
  const apiUrl = "https://quotes15.p.rapidapi.com/quotes/random/";
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": "a60abbe797msh047bf60b5f815adp148541jsn2dbd23bd09bc",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
      },
    });
    const data = await response.json();
    console.log(data, " Hey there");
    // If author is blank, add "Unkown"
    if (data.originator.name === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.originator.name;
    }
    if (data.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerHTML = data.content;
    // Stop Loader Show quote
    showQuote();
  } catch (error) {
    getQUote();
    // console.log("Whoops No Quote", error);
  }
}
// Tweet Qoute
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener

newQuoteBtn.addEventListener("click", getQUote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQUote();
