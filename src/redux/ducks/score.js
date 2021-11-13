const INCREMENT_SCORE = 'encrypt-decrypt/score/incrementScore';
const DECREMENT_HINT_PENALTY = 'encrypt-decrypt/score/decrementHintPenalty';

const initialState = {
  score: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 10 };
    case DECREMENT_HINT_PENALTY:
      return { ...state, score: state.score - 1 };
    default:
      return state;
  }
};

export const incrementScore = () => ({
  type: INCREMENT_SCORE,
});

export const decrementHintPenalty = () => ({
  type: DECREMENT_HINT_PENALTY,
});
