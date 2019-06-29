import { CHANGE_LANGUAGE } from '../Actions';

const INITIAL_STATE = {
  language: 'en',
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload.language,
      };
    default:
      return state;
  }
};

export default reducer;
