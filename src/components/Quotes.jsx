import { useEffect } from "react";
import { useState } from "react";
import quotes from "../data/quotes";

function Quotes() {
    
    let [quoteData] = useState(quotes);
    let [quoteStorage, setQuoteStorage] = useState('');
    let [quoteFade,setQuoteFade] = useState('');

    useEffect(() => {
        let randomQuote = () => {
            let random = Math.floor(Math.random() * quoteData.length);
            let randomQuote = quoteData[random];
            setQuoteStorage(randomQuote);
        }

        randomQuote();
    },[quoteData]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setQuoteFade('active');
            return (() => {
                clearTimeout(timeout);
            })
        }, 500);
    },[quoteFade]);

    return ( 
        <>
            <div className={'quotesArea ' + quoteFade}>
                <p className="quote">"&nbsp;{quoteStorage.quote}&nbsp;"</p>
                <p className="author">{quoteStorage.author}</p>
            </div>
        </>
    );
}

export default Quotes;