import React, { useState, useEffect } from "react";
import "./App.css";
import ColorArr from "./ColorArr";

let quoteData =
  "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";
function App() {
  const [quote, setQuote] = useState(
    "Life isn’t about getting and having, it’s about giving and being."
  );
  const [author, setAuthor] = useState("Kevin Kruse");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [themColor, setThemColor] = useState("#282c34");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON);
    console.log(parsedJSON);
  };

  useEffect(() => {
    fetchQuotes(quoteData);
  }, []);

  const getRandomQuote = () => {
    if (quotesArray && quotesArray.length > 0) {
      let randomInteger = Math.floor(quotesArray.length * Math.random());
      setRandomNumber(randomInteger);
      setThemColor(ColorArr[Math.floor(ColorArr.length * Math.random())]);
      setQuote(quotesArray[randomInteger].quote);
      setAuthor(quotesArray[randomInteger].author);
    }
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: themColor }}>
        <div id="quote-box" style={{ color: themColor }}>
          
          <p id="text">"{quote}"</p>
          <h4 id="author">- {author}</h4>
          <a
            style={{ backgroundColor: themColor }}
            id="tweet-quote"
            href={encodeURI(
              `http://www.twitter.com/intent/tweet?text=${quote} - ${author}`
            )}
          >
            Tweet
          </a>
          <button style={{backgroundColor: themColor}} id="new-quote" onClick={() => getRandomQuote()}>
            New Quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
