const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



// Show Loader
function loading (){
    loader.hidden = false;
    quoteContainer.hidden = true;
    // quoteText.hidden = true;
    // authorText.hidden = true;
}

// Hide Loader
function showQuote () {
    if(!loader.hidden){
        quoteContainer.hidden = false;
         loader.hidden = true;
    }
    
}
// Get quote from API
async function getQUote(){
    loading ();
    const apiUrl = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/';
    try{
        const response = await fetch(apiUrl, {
  method: "GET",
  headers: {"x-rapidapi-key": "6f48443e08msh2406629a2e6f9eep11dc96jsn5126beaaaf69",
	"x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
	"useQueryString": true}
});
        const data = await response.json();
        // If author is blank, add "Unkown"
        if(data[0].author === ''){
            authorText.innerText = 'Unknown'
        } else{
            authorText.innerText =data[0].author;
        }
        if(data[0].quote.length > 120){
            quoteText.classList.add('long-quote');
        } else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerHTML = data[0].quote;
        // Stop Loader Show quote
        showQuote();
        
    }catch(error){
        getQUote()
        console.log('Whoops No Quote', error);
    }
}
// Tweet Qoute
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


// Event Listener

newQuoteBtn.addEventListener('click', getQUote);
twitterBtn.addEventListener('click', tweetQuote);



// On Load
getQUote(); 