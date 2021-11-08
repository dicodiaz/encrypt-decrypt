import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRandomQuoteAsync } from '../redux/ducks/quote';

const Encrypt = () => {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.quoteReducer.quote);
  const [encryptedQuote, setEncryptedQuote] = useState('');
  const [keyMap, setkeyMap] = useState({}); // eslint-disable-line
  console.log(keyMap);

  const buildRandomKeyMap = () => {
    const result = {};
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let remainingLetters = 'abcdefghijklmnopqrstuvwxyz';
    Object.values(alphabet).forEach((letter) => {
      let randomLetter = letter;
      while (randomLetter === letter) {
        randomLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
      }
      result[letter] = randomLetter;
      remainingLetters = remainingLetters.replace(randomLetter, '');
    });
    setkeyMap(result);
    return result;
  };

  const encrypt = useCallback((quote) => {
    const keyMap = buildRandomKeyMap();
    return quote.replace(/\w/g, (letter) => keyMap[letter]);
  }, []);

  useEffect(() => {
    setEncryptedQuote(encrypt(quote));
  }, [quote, encrypt]);

  return (
    <div>
      <p className="lead fs-2">{quote}</p>
      <p className="lead fs-2">{encryptedQuote}</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => dispatch(setRandomQuoteAsync())}
      >
        Get another one
      </button>
    </div>
  );
};

export default Encrypt;
