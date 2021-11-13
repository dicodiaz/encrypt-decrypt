/* eslint-disable react/no-array-index-key */

import { useEffect, useState } from 'react';
import { Alert, Button, Collapse, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addHinted, setGuessKeyMap, setGuessKeyMapProperty, setHinted } from '../redux/ducks/guess';
import { setRandomQuoteFromAPI } from '../redux/ducks/quote';
import { decrementHintPenalty, incrementScore } from '../redux/ducks/score';

let isFirstRender = true;
let isFirstGame = true;
let isFirstCorrectSubmit = true;
const Encrypt = () => {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.quoteReducer.quote);
  const author = useSelector((state) => state.quoteReducer.author);
  const tags = useSelector((state) => state.quoteReducer.tags);
  const keyMap = useSelector((state) => state.quoteReducer.keyMap);
  const encryptedQuote = useSelector((state) => state.quoteReducer.encryptedQuote);
  const guessKeyMap = useSelector((state) => state.guessReducer.guessKeyMap);
  const hinted = useSelector((state) => state.guessReducer.hinted);
  const score = useSelector((state) => state.scoreReducer.score);
  const [quoteInput, setQuoteInput] = useState('');
  const [guessInputList, setGuessInputList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertText, setAlertText] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isFirstRender) {
      dispatch(setRandomQuoteFromAPI());
      isFirstRender = false;
    }
  }, [dispatch]);

  useEffect(() => {
    const newArray = encryptedQuote
      .split('')
      .map((char) => (char.match(/^\w$/) ? guessKeyMap[char] || '' : char));
    setGuessInputList(newArray);
    setQuoteInput(newArray.map((guessChar) => (guessChar === '' ? '_' : guessChar)).join(''));
  }, [guessKeyMap, encryptedQuote]);

  const handlePlayAgain = () => {
    dispatch(setRandomQuoteFromAPI());
    dispatch(setGuessKeyMap({}));
    dispatch(setHinted([]));
    setShowAlert(false);
    isFirstGame = false;
    isFirstCorrectSubmit = true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quoteInput === quote) {
      setAlertVariant('success');
      setAlertText('Correct! Click on "Get another one" to play again.');
      if (isFirstCorrectSubmit) {
        dispatch(incrementScore());
        isFirstCorrectSubmit = false;
      }
    } else {
      setAlertVariant('danger');
      setAlertText("Incorrect! Please try again. Make sure you're including punctuation.");
    }
    setShowAlert(true);
  };

  const handleChange = (char, e) => {
    if (e.target.value.match(/^\w?$/)) {
      dispatch(setGuessKeyMapProperty(char, e.target.value));
    }
  };

  const handleHint = () => {
    const tempKeyMap = { ...keyMap };
    Object.values(guessKeyMap).forEach((value) => {
      if (tempKeyMap[value]) delete tempKeyMap[value];
    });
    if (Object.keys(tempKeyMap).length > 0) {
      const tempKeyMapKeys = Object.keys(tempKeyMap);
      const randomKey = tempKeyMapKeys[Math.floor(Math.random() * tempKeyMapKeys.length)];
      dispatch(setGuessKeyMapProperty(tempKeyMap[randomKey], randomKey));
      dispatch(addHinted(randomKey));
      dispatch(decrementHintPenalty());
    }
  };

  const handleClear = () => {
    dispatch(setGuessKeyMap({}));
    dispatch(setHinted([]));
  };

  return (
    <div className="pt-5">
      <p className="pt-3 text-end">Score: {score}</p>
      {isFirstGame && (
        <div>
          <p className="lead fs-2">{encryptedQuote}</p>
          <p className="mb-1">decrypts to</p>
          <p className="mb-1 text-success">{quote}</p>
          <p>
            Please note that every letter is replaced by another letter, respecting the only rule
            that if this letter repeats in the sentence, it will be replaced by the same other
            letter. Now you&apos;re ready to start playing!
          </p>
        </div>
      )}
      {!isFirstGame && (
        <div>
          <p className="lead fs-2">{encryptedQuote}</p>
          <div className="d-flex flex-wrap">
            {encryptedQuote.split('').map((char, i) => (
              <div key={i} className="d-flex flex-column mb-2">
                {char.match(/^\w$/) ? (
                  <input
                    type="text"
                    className={`guessInput${hinted.includes(guessInputList[i]) ? ' hinted' : ''}`}
                    value={guessInputList[i]}
                    onChange={(e) => handleChange(char, e)}
                  />
                ) : (
                  <div style={{ width: '20px', height: '25px' }} />
                )}
                <span className="text-center">{char}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <Button className="mb-3" variant="primary" onClick={handlePlayAgain}>
        {isFirstGame ? 'Start playing' : 'Get another one'}
      </Button>
      {!isFirstGame && (
        <>
          <Form className="mb-3">
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter decrypted quote"
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
            />
            <Button className="mx-1" variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Button className="mx-1" variant="secondary" type="button" onClick={handleHint}>
              Hint
            </Button>
            <Button className="mx-1" variant="danger" type="button" onClick={handleClear}>
              Clear
            </Button>
          </Form>
          <Button
            className="mb-2"
            variant="outline-info"
            size="sm"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            Check quote info
          </Button>
          <Collapse in={open}>
            <div>
              <p className="mb-1">Author: {author}</p>
              <p className="mb-1">Tags: {tags.join(', ')}</p>
            </div>
          </Collapse>
        </>
      )}
      {showAlert && <Alert variant={alertVariant}>{alertText}</Alert>}
    </div>
  );
};

export default Encrypt;
