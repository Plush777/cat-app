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

    const clipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('복사에 성공했어요.');

        }   catch (error) {
            alert('복사에 실패했어요.');
        }
    };

    return ( 
        <>
            <div className={'quotesArea ' + quoteFade}>
                <p className="quote">"&nbsp;{quoteStorage.quote}&nbsp;"</p>
                <p className="author">{quoteStorage.author}</p>
                <div className="toolTip quotes">
                    <button type="button" className="btnCopy" onClick={() => clipBoard(quoteStorage.quote)}>복사하기</button>
                </div>
            </div>
        </>
    );
}

export default Quotes;