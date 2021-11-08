import QuotableAPI from '../../services/QuotableAPI';

const SET_QUOTE = 'encrypt-decrypt/quote/setQuote';
const SET_KEYMAP = 'encrypt-decrypt/quote/setKeyMap';

const initialState = {
  quote: '',
  keyMap: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUOTE:
      return { ...state, quote: action.payload };
    case SET_KEYMAP:
      return { ...state, keyMap: action.payload };
    default:
      return state;
  }
};

export const setQuote = (payload) => ({
  type: SET_QUOTE,
  payload,
});

export const setRandomQuoteAsync = () => (dispatch) => {
  QuotableAPI.getRandomQuote().then((data) => dispatch(setQuote(data.content.toLowerCase())));
};

export const setKeyMap = (payload) => ({
  type: SET_KEYMAP,
  payload,
});
