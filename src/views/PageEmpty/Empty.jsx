import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { URL_HOME } from '../../core/config';

function Empty({ lang }) {
  console.log('Empty');
  return <Redirect push to={`/${lang}${URL_HOME}`} />;
}

Empty.propTypes = {
  lang: string,
};

const mapState = state => ({ lang: state.language.lang });

export default connect(mapState)(Empty);
