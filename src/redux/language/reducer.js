import { CHANGE_LANGUAGE } from './actions';
import { LANGS, KEY_LANG } from '../../core/config';

const localLang = localStorage.getItem(KEY_LANG);
if (!localLang || !LANGS.includes(localLang)) localStorage.setItem(KEY_LANG, LANGS[0]);

const initialState = {
  lang: localStorage.getItem(KEY_LANG) || LANGS[0],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      localStorage.setItem(KEY_LANG, action.lang);
      return { ...state, lang: action.lang };
    }

    default:
      return state;
  }
};
