const SET_GUESS_KEY_MAP = 'encrypt-decrypt/guess/setGuessKeyMap';
const SET_GUESS_KEY_MAP_PROPERTY = 'encrypt-decrypt/guess/setGuessKeyMapProperty';
const SET_HINTED = 'encrypt-decrypt/guess/setHinted';
const ADD_HINTED = 'encrypt-decrypt/guess/addHinted';

const initialState = {
  guessKeyMap: {},
  hinted: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GUESS_KEY_MAP:
      return { ...state, guessKeyMap: action.payload };
    case SET_GUESS_KEY_MAP_PROPERTY: {
      const tempGuessKeyMap = { ...state.guessKeyMap };
      tempGuessKeyMap[action.key] = action.map;
      return { ...state, guessKeyMap: tempGuessKeyMap };
    }
    case SET_HINTED:
      return { ...state, hinted: action.payload };
    case ADD_HINTED:
      return { ...state, hinted: [...state.hinted, action.payload] };
    default:
      return state;
  }
};

export const setGuessKeyMap = (payload) => ({
  type: SET_GUESS_KEY_MAP,
  payload,
});

export const setGuessKeyMapProperty = (key, map) => ({
  type: SET_GUESS_KEY_MAP_PROPERTY,
  key,
  map,
});

export const setHinted = (payload) => ({
  type: SET_HINTED,
  payload,
});

export const addHinted = (payload) => ({
  type: ADD_HINTED,
  payload,
});
