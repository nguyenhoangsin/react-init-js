import React, { PureComponent } from 'react';
import { I18n, translate as t } from '../../../i18n/i18n';
import trans from './translations';

class DemoLanguage extends PureComponent {
  render() {
    return (
      <I18n translations={trans}>
        <div>{t('greeting', { name: <b>JS</b> })}</div>
      </I18n>
    );
  }
}

export default DemoLanguage;
