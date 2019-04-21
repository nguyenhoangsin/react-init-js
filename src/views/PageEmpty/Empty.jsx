import React from 'react';
import { Redirect } from 'react-router-dom';
import { KEY_LANG, URL_HOME } from '../../core/config';

function Empty() {
  console.log('Empty');
  return <Redirect push to={`/${localStorage.getItem(KEY_LANG)}${URL_HOME}`} />;
}

export default Empty;
