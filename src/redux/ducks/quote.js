import encrypt, { buildRandomKeyMap } from '../../logic/encrypt';
import QuotableAPI from '../../services/QuotableAPI';

const SET_QUOTE = 'encrypt-decrypt/quote/setQuote';
const SET_AUTHOR = 'encrypt-decrypt/quote/setAuthor';
const SET_TAGS = 'encrypt-decrypt/quote/setTags';
const SET_KEY_MAP = 'encrypt-decrypt/quote/setKeyMap';
const SET_ENCRYPTED_QUOTE = 'encrypt-decrypt/quote/setEncryptedQuote';

const initialState = {
  quote: '',
  author: '',
  tags: [],
  keyMap: {},
  encryptedQuote: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUOTE:
      return { ...state, quote: action.payload };
    case SET_AUTHOR:
      return { ...state, author: action.payload };
    case SET_TAGS:
      return { ...state, tags: action.payload };
    case SET_KEY_MAP:
      return { ...state, keyMap: action.payload };
    case SET_ENCRYPTED_QUOTE:
      return { ...state, encryptedQuote: action.payload };
    default:
      return state;
  }
};

export const setQuote = (payload) => ({
  type: SET_QUOTE,
  payload,
});

export const setAuthor = (payload) => ({
  type: SET_AUTHOR,
  payload,
});

export const setTags = (payload) => ({
  type: SET_TAGS,
  payload,
});

export const setKeyMap = (payload) => ({
  type: SET_KEY_MAP,
  payload,
});

export const setEncryptedQuote = (payload) => ({
  type: SET_ENCRYPTED_QUOTE,
  payload,
});

export const setRandomQuoteFromAPI = () => (dispatch) => {
  QuotableAPI.getRandomQuote().then((data) => {
    const { content, author, tags } = data;
    const quote = content.toLowerCase();
    const keyMap = buildRandomKeyMap();
    Object.keys(keyMap).forEach((key) => {
      if (!quote.includes(key)) delete keyMap[key];
    });
    const encryptedQuote = encrypt(quote, keyMap);
    dispatch(setQuote(quote));
    dispatch(setAuthor(author));
    dispatch(setTags(tags));
    dispatch(setKeyMap(keyMap));
    dispatch(setEncryptedQuote(encryptedQuote));
  });
};
