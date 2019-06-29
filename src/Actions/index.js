const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  payload: { language },
});

export { CHANGE_LANGUAGE, changeLanguage };
