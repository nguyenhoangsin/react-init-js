import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { matchPath } from 'react-router-dom';
import store from '../redux/store';
import history from '../core/history';
import { LANGS } from '../core/config';
import messages from './messages';
import { changeLanguage } from '../redux/language/actions';


const mapState = state => ({
  lang: state.language.lang,
});

const I18n = connect(mapState)(({ lang, translations, children }) => (
  <IntlProvider locale={lang} messages={translations[lang]}>{children}</IntlProvider>
));

const withI18n = translations => WrappedComponent => connect(mapState)(({ lang }) => (
  <IntlProvider locale={lang} messages={translations[lang]}>
    <WrappedComponent locale={lang} />
  </IntlProvider>
));

const translate = (i, v) => <FormattedMessage id={i} values={v} />;

const translateMessages = (key) => {
  if (messages[store.getState().language.lang]
    && messages[store.getState().language.lang][key]) {
    return messages[store.getState().language.lang][key];
  }
  return key;
};

const mountLang = () => {
  const langUrl = matchPath(history.location.pathname, '/:lang?').params.lang;
  const langLocal = store.getState().language.lang;

  if (langUrl !== langLocal) {
    if (langUrl === undefined) {
      const urlUpdate = history.location.pathname.replace('/', `/${langLocal}`);
      history.push(urlUpdate);
    } else if (LANGS.includes(langUrl)) {
      store.dispatch(changeLanguage(langUrl));
    } else {
      const urlUpdate = `/${langLocal}${history.location.pathname}`;
      history.push(urlUpdate);
    }
  }
};

const updateLang = (langUpdate) => {
  const langUrl = matchPath(history.location.pathname, '/:lang?').params.lang;

  if (langUrl !== langUpdate) {
    store.dispatch(changeLanguage(langUpdate));
    if (langUrl === undefined) {
      const urlUpdate = history.location.pathname.replace('/', `/${langUpdate}`);
      history.push(urlUpdate);
    } else if (LANGS.includes(langUrl)) {
      const urlUpdate = history.location.pathname.replace(langUrl, langUpdate);
      history.push(urlUpdate);
    } else {
      const urlUpdate = `/${langUpdate}${history.location.pathname}`;
      history.push(urlUpdate);
    }
  }
};

export {
  I18n,
  withI18n,
  translate,
  translateMessages,
  mountLang,
  updateLang,
};
